import spec from '../../spec/index.js'
import inputs from '../../src/ctrl/inputs/spec.js'

const builder = v2 => ({icon, title, description, examples}) => ({
  icon,
  title,
  description,
  children: [
    {
      icon: 'book',
      title: 'Documentation',
      href: '#/'+(v2 ? 'info' : 'docs')+'/'+title
    }, {
      icon: 'box',
      title: 'Examples',
      children: examples.map((E, i) => ({
        title: E.title,
        href: '#/'+(v2 ? 'input' : 'examples')+'/'+title+'/'+i
      }))
    }
  ]
})

export default {
  links: spec.map(builder()).concat(inputs.map(builder(true))).concat([
    {
      icon: 'flask',
      title: 'Tests',
      href: location.href.split('#')[0]+'spec/index.html'
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
