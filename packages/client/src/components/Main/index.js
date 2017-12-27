import React from 'react'
import styled from 'styled-jss'

import {Route, Switch} from 'react-router-dom'

import Index from '~/components/Index'
import Search from '~/components/Search'
import About from '~/components/About'
import Parse from '~/components/Parse'

const Container = styled('section')({
  display: 'flex',
  justifyContent: 'center',
  padding: 20,
  height: '100%',
})

export default () => (
  <Container>
    <Switch>
      <Route path="/search/:query?" component={Search} />
      <Route exact path="/about" component={About} />
      <Route exact path="/parse" component={Parse} />
      <Route path="/" component={Index} />
    </Switch>
  </Container>
)
