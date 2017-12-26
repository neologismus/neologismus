/* @flow */

import React, { type Element } from 'react'
import { render } from 'react-dom'

/* eslint-disable import/no-extraneous-dependencies */
import { AppContainer } from 'react-hot-loader'
/* eslint-enable import/no-extraneous-dependencies */

export default process.env.NODE_ENV === 'development'
// избегаем FOUC во время разработки
  ? (app: Element<any>, ...args: *) => setTimeout(() => render(
    /**
         * для горячих патчей реакт-компонентов
         *
         * отключаем ворнинги, так как HOC не поддерживаются
         * @see https://github.com/gaearon/react-hot-loader/issues/666
         */
    <AppContainer warnings={false}>
      {app}
    </AppContainer>,
    ...args,
  ), 0)
  : render
