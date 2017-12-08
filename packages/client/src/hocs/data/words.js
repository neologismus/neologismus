import { Observable } from 'rxjs'
import { mapPropsStream, createEventHandler } from 'recompose'

const searchWords = (word = '') => Observable
  .ajax(`/api/search/${word}`)
  .map(({ response }) => response)
  .catch(() => [])

export const withWords = mapPropsStream((props$) => {
  const { handler: getWords, stream: words$ } = createEventHandler()

  return props$.combineLatest(
    words$.flatMap(searchWords).startWith([]),
    (props, words) => ({ ...props, words, getWords })
  )
})

export default withWords
