import React from 'react'
import styled from 'styled-jss'

import dark from '~/components/Logo/dark.svg'

const Container = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
})

const Background = styled('div')({
  height: '100%',
  width: '100%',
  background: 'url(https://www.nerdshd.com/wp-content/uploads/2015/11/Tumblr-Wallpapers-22.jpg?x53666)',
  backgroundSize: 'cover',
  filter: 'grayscale(100%)',
  opacity: 0.4,
  position: 'absolute',
  margin: '-20px 0',
  zIndex: 0,
})

const Logo = styled('img')({
  width: '100%',
  height: 450,
  display: 'block',
})

const Button = styled('a')({
  display: 'block',
  padding: '.5em 1em',
  background: '#01bcd561',
  cursor: 'pointer',
  color: '#fff',
  border: '1px solid',
  borderRadius: '40px',
  fontSize: 25,
  textDecoration: 'none',
})

const Controls = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 1,
})

export default () => (
  <Container>
    <Background />

    <Controls>
      <Logo src={dark} />
      <Button href="/search">explore</Button>
    </Controls>
  </Container>
)
