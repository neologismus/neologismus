import React from 'react'
import {compose, withHandlers, withStateHandlers, withState} from 'recompose'
import styled from 'styled-jss'

import {withWords} from '~/hocs/data/words'

import Suggest from '~/components/Suggest'
import Checkbox from 'material-ui/Checkbox'

import {FormLabel, FormControl, FormGroup, FormControlLabel} from 'material-ui/Form'

import WordList from './WordList'
import Word from './Word'

const Settings = styled('div')({})
const Container = styled('div')({
  maxWidth: 700,
  width: '100%',
  padding: 10,
  [`& ${Settings}`]: {margin: [25, 0]},
})

const SuggestContainer = styled('div')({
  position: 'absolute',
  width: '100%',
  maxHeight: 300,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  boxShadow: '1px 1px 4px -3px #000',
  display: ({$active}) => ($active ? 'block' : 'none'),
  overflow: 'auto',
  '&:hover': {display: 'block'},
})

const Filter = styled('div')({[`&:hover ${SuggestContainer}`]: {display: 'block'}})

const Search = ({
  words,
  query,
  getWords,
  strict,
  select,
  names,
  toggle,
  word,
  setContext,
  contexts,
}) => (
  <Container>
    <Filter>
      <Settings>
        <FormControl component="fieldset">
          <FormLabel component="legend">Settings</FormLabel>

          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={strict} name="strict" onChange={toggle} />}
              label="Strict search"
            />
          </FormGroup>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={!names} name="names" onChange={toggle} />}
              label="Exclude abbreviations and proper names"
            />
          </FormGroup>
        </FormControl>
      </Settings>

      <Suggest value={query} onChange={getWords}>
        {({focused}) => (
          <SuggestContainer $active={focused}>
            <WordList select={select} words={words} names={names} query={query} strict={strict} />
          </SuggestContainer>
        )}
      </Suggest>
    </Filter>

    <Word word={word} setContext={setContext} contexts={contexts} />
  </Container>
)

export default compose(
  withWords,
  withState('query', 'updateQuery', ({match, getWords}) => {
    const {query} = match.params

    getWords(query)

    return query
  }),
  withState('word', 'setWord', {value: ''}),
  withStateHandlers(
    {strict: false, names: false, contexts: null},
    {
      toggle: props => ({target: {name}}) => ({[name]: !props[name]}),
      setContext: ({contexts}) => data => ({contexts: {...contexts, [data._id]: data}}),
      resetContext: () => () => ({contexts: null}),
    },
  ),
  withHandlers({
    getWords: props => (event) => {
      const query = event.target.value

      props.history.replace({pathname: `/search/${query}`})

      props.getWords(query)
      props.updateQuery(query)
    },
    select: props => ({ngram, value}) => {
      props.history.push({pathname: `/search/${value}`})

      props.setWord({ngram, value})
      props.updateQuery(value)
      props.resetContext()
    },
  }),
)(Search)
