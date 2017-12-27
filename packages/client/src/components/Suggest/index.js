import React from 'react'
import {withStateHandlers} from 'recompose'
import styled from 'styled-jss'

const accent = '#01bcd5'

const Input = styled('input')({
  padding: [5, 0],
  border: 0,
  fontSize: 20,
  background: 'none',
  borderBottom: [1, 'solid', accent],
  width: '100%',
})

const Container = styled('div')({position: 'relative'})

const withInputState = withStateHandlers(
  {focused: false},
  {
    onFocus: (state, {onFocus}) => (event) => {
      if (onFocus) {
        onFocus(event)
      }

      return {focused: true}
    },
    onBlur: (state, {onBlur}) => (event) => {
      if (onBlur) {
        onBlur(event)
      }

      return {focused: false}
    },
  },
)

const Suggest = styled(withInputState(({children, onChange, ...props}) => (
  <Container>
    <Input onChange={onChange} placeholder="Search ..." {...props} />
    {children({onChange, ...props})}
  </Container>
)))({})

export default Suggest
