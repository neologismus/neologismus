import React from 'react'
import styled from 'styled-jss'

import {NavLink} from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'

import light from '~/components/Logo/light.svg'

const Title = styled(({className, children}) => (
  <Typography className={className} type="title">
    {children}
  </Typography>
))({flex: 1, color: 'whitesmoke'})

const Link = styled(NavLink)({textDecoration: 'none', color: 'white'})

const Links = styled('div')({[`& ${Link} + ${Link}`]: {marginLeft: 10}})

const Logo = styled('a')({
  backgroundImage: `url(${light})`,
  width: 150,
  height: 60,
  display: 'block',
  backgroundSize: '100%',
  backgroundPosition: '0 25%',
})

const Container = styled('div')({
  justifyContent: 'space-between',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
})

export default () => (
  <AppBar position="static">
    <Toolbar>
      <Container>
        <Logo href="/" />

        <Links>
          <Link to="/search">Search</Link>
          <Link to="/parse">Parse</Link>
          <Link to="/about">About</Link>
        </Links>
      </Container>
    </Toolbar>
  </AppBar>
)
