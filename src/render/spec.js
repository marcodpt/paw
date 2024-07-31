import render from './index.js'
import wait from '../../spec/wait.js'

export default ({
  icon: 'box-open',
  title: 'render',
  description: 'Asynchronous loader for components and views.',
  component: render,
  properties: {},
  examples: [
    {
      title: 'Simple String',
      data: [
        'Hello!'
      ]
    }, {
      title: 'HTML String',
      data: [
        '<p>Some text...</p>'
      ]
    }, {
      title: 'Lazy String',
      data: [
        () => wait(500).then(() => `<p>...Hello!</p>`)
      ]
    }, {
      title: 'Text node',
      data: [
        document.createTextNode('Hello!')
      ]
    }, {
      title: 'Lazy Text node',
      data: [
        () => wait(500).then(() => document.createTextNode('...Hello!'))
      ]
    }, {
      title: 'HTML node',
      data: [
        (() => {
          var p = document.createElement('p')
          p.textContent = 'Some text...'
          return p
        })()
      ]
    }, {
      title: 'Lazy HTML node',
      data: [
        () => wait(500).then(() => {
          var p = document.createElement('p')
          p.textContent = '...Hello!'
          return p
        })
      ]
    }, {
      title: 'Simple Error',
      data: [
        () => {
          throw 'This is an intentional error showcase!'
        }
      ]
    }, {
      title: 'Lazy Error',
      data: [
        () => wait(500).then(() => {
          throw 'This is an intentional error showcase!'
        })
      ]
    }
  ]
})
