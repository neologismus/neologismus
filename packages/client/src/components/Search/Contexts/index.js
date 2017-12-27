import React from 'react'
import styled from 'styled-jss'
import moment from 'moment'
import {compose, withHandlers, withStateHandlers, withState} from 'recompose'

const Selected = styled('b')({color: '#50c1d0'})

const Context = styled(withStateHandlers(
  {opened: false},
  {showContext: state => () => ({opened: !state.opened})}
)(({opened, showContext, className, val, ...props}) => (
  <a role="link" className={className} onClick={showContext}>
    <p>{props.data.title || props.context.slice(0, 25).join('...')}</p>

    {opened && (
      <div style={{color: 'black'}}>
        <a target="_blank" href={props.link}>Source</a>

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
                <p>
                  {`...${text.slice(-100)}`}
                  <Selected>{val}</Selected>
                  {`${orig[i + 1].slice(0, 100)}...`}
                </p>
              )

              return acc.concat(elem)
            }, [])}
        </p>
      </div>
    )}
  </a>
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
