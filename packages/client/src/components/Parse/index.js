import React from 'react'
import {compose, withHandlers, withStateHandlers, withState} from 'recompose'
import styled from 'styled-jss'
import {NavLink} from 'react-router-dom'

import {CircularProgress} from 'material-ui/Progress'

import Word from '../Search/Word'
import {Context} from '../Search/Contexts'

const Container = styled('div')({
  maxWidth: 700,
  width: '100%',
  padding: 10,
})

const accent = '#01bcd5'
const Input = styled('input')({
  padding: [5, 0],
  border: 0,
  fontSize: 20,
  background: 'none',
  borderBottom: [1, 'solid', accent],
  width: '100%',
})

const Button = styled('button')({
  padding: [5, 10],
  backgroundColor: accent,
  color: 'whitesmoke',
  border: 0,
  borderRadius: 5,
  cursor: 'pointer',
  transition: 'background-color .3s',
  '&[disabled]': {opacity: 0.5},
  '&:hover': {backgroundColor: '#3c96a2'},
  '&:active': {backgroundColor: '#0e5963'},
})

const Controls = styled('div')({
  display: 'flex',
  [`& ${Button}`]: {marginLeft: 20},
})

const Pendable = styled(({children, pending, className}) => (
  <div className={className}>
    {pending ? <div style={{marginTop: 50, textAlign: 'center'}}><CircularProgress /></div> : children}
  </div>
))({opacity: ({pending}) => (pending ? 1 : 1)})

const Parse = ({
  parse,
  link,
  setLink,
  data,
}) => (
  <Container>
    <p>
      We can try to parse an article to find some new words there.
    </p>

    <Controls>
      <Input value={link} onChange={setLink} placeholder="Paste your link here" />

      <Button disabled={!link} onClick={parse}>parse</Button>
    </Controls>

    <Pendable pending={data === null}>
      {data && data.words.map(({word, data: rest}) => (
        <p>
          <Context
            link={link}
            val={word}
            data={{title: rest.length ? <NavLink target="_blank" to={`/search/${word}`}>{word}</NavLink> : word}}
            context={data.context.join('')}
          />
        </p>
      ))}
    </Pendable>
  </Container>
)

export default compose(
  withState('data', 'setData', undefined),
  withStateHandlers(
    {link: ''},
    {
      parse: ({link}, props) => () => {
        props.setData(null)

        fetch(`/api/parse/?link=${link}`)
          .then(res => res.json())
          .then((res) => {
            props.setData(res)
          })
      },
      setLink: () => ({target}) => ({link: target.value}),
    },
  ),
)(Parse)
