import React from 'react'
import styled from 'styled-jss'

const Footer = styled('footer')({
  display: 'flex',
  justifyContent: 'center',
})

const List = styled('ul')({listStyle: 'none', textAlign: 'center'})

export default () => (
  <Footer>
    <List className="copyright">
      <li>&copy; Neologismus 2017. All rights reserved.</li>
      <li>By students of <a href="https://www.hse.ru/ma/ling/">CompLing HSE</a></li>
    </List>
  </Footer>
)
