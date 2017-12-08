import React from 'react'
import { compose, withHandlers, withStateHandlers, withState } from 'recompose'
import styled from 'styled-jss'

const Input = styled('input')({
  padding: [5, 10],
  borderRadius: 5,
  border: 0,
  fontSize: 19,
  width: '100%',
})

const Container = styled('section')({
  maxWidth: 600,
  width: '100%',
})

const Suggested = styled('ul')({
  backgroundColor: 'white',
  padding: 10,
  boxShadow: [0, 0, 10, -20],
  width: '100%',
  marginTop: 20,
  listStyle: 'none',
})

const Item = styled('li')({
  padding: [5, 10],
})

const Link = styled('a')({
  textDecoration: 'none',
  cursor: 'pointer',
  color: '#009688',
  '&:hover': {
    color: '#da9817',
  },
})

const Checkbox = styled('input')({})

const Label = styled('label')({
  '& span': {
    marginLeft: 10,
  },
  marginBottom: 20,
  display: 'flex',
  alignItems: 'center',
})

const Contexts = styled('div')({
  marginTop: 20,
})

const enhance = compose(
  withState('context', 'setContext', ''),
  withStateHandlers(
    { opened: false },
    {
      showContext: (state, props) => () => {
        fetch(`/api/contexts/${props.id}`)
          .then(res => res.json())
          .then((res) => {
            props.setContext(res.context)
          })

        return { opened: !state.opened }
      },
    }
  )
)

const Selected = styled('b')({
  color: '#da9817',
})

const Context = styled(enhance(({ context, val, opened, className, showContext, id }) => (
  <a role="link" className={className} onClick={showContext}>
    {id}

    <p style={{ color: 'black' }}>
      {opened && context.replace(/([а-яА-Я-ё]+)/g, (_, word) => {
        if (word === val) {
          return `_____${word}_____`
        }

        return word
      }).split('_____').map(text => (text === val ? <Selected>{text}</Selected> : text))}
    </p>
  </a>
)))({
  cursor: 'pointer',
  color: '#839ed2',
  '&:hover': {
    opacity: 0.5,
  },
})

const SuggestItem = withStateHandlers(
  { opened: false },
  {
    showContext: props => () => ({ opened: !props.opened }),
  }
)(({ val, data, showContext, opened }) => (
  <Item>
    <Link onClick={showContext}>{val}</Link>

    {opened
      ? (
        <Contexts>
          {data.contexts
            .filter(({ words }) => words.includes(val))
            .map(({ _id }) => <Context val={val} key={_id} id={_id} />)}
        </Contexts>
      ) : null
    }
  </Item>
))

const NgramContainer = styled(({ className, query, strict, names, data }) => {
  let result = data.list

  if (!names) {
    const abbrs = result.reduce((acc, val) => (/^[А-Я]/.test(val) ? acc + 1 : acc), 0)

    if (abbrs / result.length > 0.8) return null
  }

  if (strict) {
    result = result.filter(l => l.startsWith(query))
  }

  return (
    <div className={className}>
      {result.map(val => <SuggestItem data={data} key={val} val={val} />)}
    </div>
  )
})({
  border: '1px solid #d5e4d3',
  margin: [15, 0],
})

const Items = ({ strict, names, data, query }) => {
  if (!data.length) return 'Ничего не найдено'

  return data.map(ngram => (
    <NgramContainer
      key={ngram._id}
      data={ngram}
      query={query}
      names={names}
      strict={strict}
    />
  ))
}

const SuggestContainer = withStateHandlers(
  { strict: false, names: true },
  {
    toggleStrict: ({ strict }) => () => ({ strict: !strict }),
    toggleNames: ({ names }) => () => ({ names: !names }),
  }
)(({ data, strict, toggleStrict, toggleNames, names, query }) => (
  <Suggested>
    <Label>
      <Checkbox value={strict} onChange={toggleStrict} type="checkbox" />

      <span>Точный поиск</span>
    </Label>

    <Label>
      <Checkbox value={names} onChange={toggleNames} type="checkbox" />

      <span>Исключить аббревиатуры и имена собственные</span>
    </Label>

    <Items query={query} names={names} strict={strict} data={data} />
  </Suggested>
))

const Suggest = ({ data, query, getData }) => (
  <Container>
    <Input value={query} placeholder="Поиск слова" onChange={getData} />

    <SuggestContainer data={data} query={query} />
  </Container>
)

export default compose(
  withStateHandlers(
    { query: '' },
    {
      updateQuery: () => query => ({ query }),
    }
  ),
  withHandlers({
    getData: props => (event) => {
      const query = event.target.value

      props.getData(query)
      props.updateQuery(query)
    },
  }),
)(Suggest)
