import React from 'react'
import { compose, renameProps } from 'recompose'
import styled from 'styled-jss'

import Suggest from '../Suggest'
import { withWords } from '../../hocs/data/words'

const WordsSuggest = compose(
  withWords,
  renameProps({ words: 'data', getWords: 'getData' })
)(Suggest)

const Container = styled('section')({
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
  paddingTop: 100,
})

export default () => (
  <Container>
    <WordsSuggest />
  </Container>
)
