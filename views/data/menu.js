import comp from '../../src/comp.js'

const treeBuilder = (path, {icon, title, description, modules, examples}) => {
  const P = path.concat(title)
  modules = modules || []
  examples = examples || []

  return {
    icon,
    title,
    description,
    children: [
      {
        icon: 'book',
        title: 'Documentation',
        href: '#/doc/'+P.join('.')
      }
    ]
    .concat(examples.map(({title, description, icon}, i) => ({
      title,
      description,
      icon,
      href: '#/example/'+P.join('.')+'/'+i
    })))
    .concat(modules.map(link => treeBuilder(P, link)))
  }
}

export default {
  icon: 'book',
  title: 'Documentation',
  description: 'Complete reference and examples.',
  links: comp.map(c => treeBuilder([], c)).concat([
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
