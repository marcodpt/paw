import spec from '../../src/comp.js'
import inputs from '../../src/ctrl/inputs/spec.js'

const builder = ({icon, title, description, examples}) => ({
  icon,
  title,
  description,
  children: [
    {
      icon: 'book',
      title: 'Documentation',
      href: '#/docs/'+title
    }, {
      icon: 'box',
      title: 'Examples',
      children: examples.map((E, i) => ({
        title: E.title,
        href: '#/examples/'+title+'/'+i
      }))
    }
  ]
})

const rebuilder = ({icon, title, description, examples}) => ({
  icon,
  title,
  description,
  children: [
    {
      icon: 'book',
      title: 'Documentation',
      href: '#/info/'+title
    }, {
      icon: 'box',
      title: 'Examples',
      children: examples.map(({title, examples}) => ({
        title: title,
        children: [
          {
            icon: 'book',
            title: 'Documentation',
            href: '#/info/'+title
          }, {
            icon: 'box',
            title: 'Examples',
            children: examples.map((E, i) => ({
              title: E.title,
              href: '#/input/'+title+'/'+i
            }))
          }
        ]
      }))
    }
  ]
})

export default {
  links: spec.map(builder).concat(rebuilder(inputs)).concat([
    {
      icon: 'flask',
      title: 'Tests',
      href: location.href.split('#')[0]+'src/tests.html'
    },{
      icon: 'smile',
      title: 'Say Hi!',
      href: () => window.alert('Hi!')
    }, {
      title: 'Stop Router',
      icon: 'stop',
      href: 'javascript:stop()'
    }
  ])
}
