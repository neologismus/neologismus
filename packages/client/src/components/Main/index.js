import React from 'react'
import styled from 'styled-jss'

import {Route} from 'react-router-dom'

import Search from '~/components/Search'
import About from '~/components/About'

const Container = styled('section')({
  display: 'flex',
  justifyContent: 'center',
  padding: 20,
})

export default () => (
  <Container>
    <Route path="/search/:query?" component={Search} />
    <Route exact path="/about" component={About} />
  </Container>
)
