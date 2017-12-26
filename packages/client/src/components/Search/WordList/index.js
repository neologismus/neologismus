import React from 'react'
import styled, {injectStyled, Styled} from 'styled-jss'

const NgramContainer = injectStyled(Styled({
  root: {margin: 0, '& $words': {paddingLeft: 10}},
  ngram: {color: '#bdc8ca', margin: [5, 0], fontSize: '.8em'},
  words: {},
  word: {
    padding: [5, 10],
    transition: 'color .3s',
    cursor: 'pointer',
    '&:hover': {color: '#50c1d0'},
  },
}))(({classes, query, strict, names, data, select}) => {
  let result = data.list
  const GRADE = 0.8

  if (!names) {
    const abbrs = result.reduce((acc, val) => (/^[А-Я]/.test(val) ? acc + 1 : acc), 0)

    if (abbrs / result.length > GRADE) return null
  }

  if (strict) {
    result = result.filter(l => l.startsWith(query))
  }

  if (!result.length) return null

  return (
    <div className={classes.root}>
      <p className={classes.ngram}>{data.ngram}</p>
      <div className={classes.words}>
        {result.map(val => (
          <div onClick={() => select({ngram: data, value: val})} className={classes.word} key={val}>
            {val}
            <sup>{data.contexts.filter(({words}) => words.includes(val)).length}</sup>
          </div>
        ))}
      </div>
    </div>
  )
})

const WordList = styled(({words, className, names, select, query, strict}) => {
  if (!query) return null
  if (!words.length) return <div className={className}>Nothing found</div>

  return (
    <div className={className}>
      {words.map(ngram => (
        <NgramContainer
          key={ngram._id}
          select={select}
          data={ngram}
          query={query}
          names={names}
          strict={strict}
        />
      ))}
    </div>
  )
})({
  margin: 0,
  padding: [5, 10],
})

export default WordList
