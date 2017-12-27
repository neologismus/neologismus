import React from 'react'
import styled from 'styled-jss'

const About = styled('section')({maxWidth: 600})

export default () => (
  <About>
    <h1>
      Neologismus
    </h1>
    <div>
      <blockquote>Неологи́зм (др.-греч. νέος — новый + λόγος — слово) — слово, значение слова или словосочетание, недавно появившееся в языке (новообразованное, отсутствовавшее ранее).</blockquote>
      <p>Новые слова появляются в языке постоянно - некоторые из них приживаются и остаются употребительными, а другие исчезают. Современные словари не успевают за изменениями в языке - требуется время, чтобы неологизм был добавлен в словарь. По этой причине большое количество новых слов - довольно быстро исчезнувших, но какое-то время бывших употребительными - остается незадокументированным. К сожалению, до сих пор не существовало ресурса в открытом доступе, который бы в онлайн-режиме собирал новые слова, появляющиеся в русском языке.</p>
      <p>Цель данного проекта - создание системы для автоматизации поиска новых слов на популярных интернет-ресурсах, а также словаря найденных новых слов.</p>
    </div>

    <ul>
      <li>Special thanks to <a target="_blank" href="web-corpora.net">http://web-corpora.net</a></li>
      <li>
        <a target="_blank" href="https://github.com/neologismus/neologismus">
          Source code
        </a>
      </li>
    </ul>

    <h3>Contacts</h3>
    <ul>
      <li>
        Danilova Veronika
        &nbsp;
        <a target="_blank" href="https://github.com/VeronikaDan">
          <i className="fa fa-github" aria-hidden="true" />
        </a>
        &nbsp;&nbsp;
        <a href="mailto:verniknet@list.ru?subject=Neologismus">
          <i className="fa fa-envelope-o" aria-hidden="true" />
        </a>
      </li>
      <li>
        Kenzhaev Artur
        &nbsp;
        <a target="_blank" href="https://github.com/lttb">
          <i className="fa fa-github" aria-hidden="true" />
        </a>
        &nbsp;&nbsp;
        <a href="mailto:kenzhaev.artur@gmail.com?subject=Neologismus">
          <i className="fa fa-envelope-o" aria-hidden="true" />
        </a>
      </li>
      <li>
        Prisyazhnaya Angelina
        &nbsp;
        <a target="_blank" href="https://github.com/yourwest">
          <i className="fa fa-github" aria-hidden="true" />
        </a>
        &nbsp;&nbsp;
        <a href="mailto:aprisyazhnaya94@gmail.com?subject=Neologismus">
          <i className="fa fa-envelope-o" aria-hidden="true" />
        </a>
      </li>
    </ul>
  </About>
)
