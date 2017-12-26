import React from 'react'
import styled from 'styled-jss'
import moment from 'moment'
import {compose, withHandlers, withStateHandlers, withState} from 'recompose'

const Selected = styled('b')({color: '#50c1d0'})
const Link = styled('a')({color: 'black'})

const Text = styled('p')({borderLeft: [2, 'solid', '#50c1d0'], paddingLeft: 10})

const Container = styled('div')({
  color: '#2b3333',
  padding: [5, 10],
  transition: 'background-color .3s',
  '&:hover': {backgroundColor: '#fefefe'},
})

export const Context = styled(withStateHandlers(
  {opened: false},
  {showContext: state => () => ({opened: !state.opened})}
)(({opened, showContext, className, val, ...props}) => (
  <div>
    <p className={className} onClick={showContext}>
      {(props.data && props.data.title) || props.context.slice(0, 25).concat('...')}
    </p>

    {opened && (
      <Container>
        <Link target="_blank" href={props.link}>source</Link>

        <p>
          {props.context.replace(/([а-яА-Я-ё]+)/g, (_, word) => {
            if (word === val) {
              return `_____${word}_____`
            }

            return word
          })
            .split(`_____${val}_____`)
            .reduce((acc, text, i, orig) => {
              if (!orig[i + 1]) return acc

              const elem = (
                <Text>
                  {`...${text.slice(-200)}`}
                  <Selected>{val}</Selected>
                  {`${orig[i + 1].slice(0, 200)}...`}
                </Text>
              )

              return acc.concat(elem)
            }, [])}
        </p>
      </Container>
    )}
  </div>
)))({
  cursor: 'pointer',
  color: '#50c1d0',
  '&:hover': {opacity: 0.5},
})

const ContextDate = styled('p')({color: 'grey', fontSize: 11})

const Contexts = styled(({data, val, className}) => data.map(([date, res]) => (
  <div>
    <ContextDate>{date}</ContextDate>

    <div className={className}>
      {res.map(props => <Context val={val} {...props} />)}
    </div>
  </div>
)))({
  margin: [10, 0],
  background: '#fff',
  padding: 10,
  borderRadius: 10,
  boxShadow: '1px 1px 10px -5px',
})

export default Contexts
