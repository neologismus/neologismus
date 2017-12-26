import React from 'react'
import moment from 'moment'
import styled from 'styled-jss'

import {Line} from 'react-chartjs-2'

import Contexts from '../Contexts'

const GraphContainer = styled('div')({boxShadow: 'inset 0px 0px 10px -4px', padding: 10})

const Word = ({word, contexts, setContext}) => {
  if (!word.ngram) return null

  if (!contexts) {
    word.ngram.contexts
      .filter(({words}) => words.includes(word.value))
      .forEach(({_id}) =>
        fetch(`/api/contexts/${_id}`)
          .then(res => res.json())
          .then((res) => {
            setContext(res)
          }))
  }

  const contextsByDate = Object.values(contexts || {}).reduce((acc, val) => {
    const date = moment(val.data.date || val.createdAt).format('YYYY-MM-DD')

    return {...acc, [date]: (acc[date] || []).concat(val)}
  }, {})

  const data = Object
    .entries(contextsByDate)
    .sort(([date1], [date2]) => (date2 <= date1 ? 1 : -1))

  return (
    <div>
      <GraphContainer>
        <Line data={{
          labels: data.map(([date]) => date),
          datasets: [{label: word.value, data: data.map(([, val]) => val.length)}],
        }}
        />
      </GraphContainer>

      <Contexts val={word.value} data={data} />
    </div>
  )
}

export default Word
