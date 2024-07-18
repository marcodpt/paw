import spec from '../../spec/index.js'

export default {
  links: spec.map(({icon, title, description, examples}) => ({
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
  })).concat([
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
