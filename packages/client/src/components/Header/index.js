import React from 'react'
import styled from 'styled-jss'

import {NavLink} from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

const Title = styled(({className, children}) => (
  <Typography className={className} type="title">
    {children}
  </Typography>
))({flex: 1, color: 'whitesmoke'})

const Link = styled(NavLink)({textDecoration: 'none', color: 'white'})

const Links = styled('div')({[`& ${Link} + ${Link}`]: {marginLeft: 10}})

export default () => (
  <AppBar position="static">
    <Toolbar>
      <Title>neologismus</Title>

      <Links>
        <Link to="/search">Search</Link>
        <Link to="/parse">Parse</Link>
        <Link to="/about">About</Link>
      </Links>
    </Toolbar>
  </AppBar>
)
