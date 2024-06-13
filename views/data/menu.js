import spec from '../../spec/index.js'

export default {
  links: [
    {
      title: 'Tools',
      icon: 'tools',
      children: [
        {
          title: 'Users',
          icon: 'user',
          href: '#/users'
        }, {
          title: 'Flowchart',
          icon: 'project-diagram',
          href: '#/graph'
        }, {
          title: 'Chart',
          icon: 'chart-line',
          href: '#/chart'
        }, {
          title: 'Controls',
          icon: 'gamepad',
          href: '#/ctrl'
        }, {
          title: 'Settings',
          icon: 'cog',
          href: '#/settings'
        }, {
          icon: 'smile',
          title: 'Say Hi!',
          href: () => window.alert('Hi!')
        }, {
          title: 'Stop Router',
          icon: 'stop',
          href: 'javascript:stop()'
        }
      ]
    }, {
      title: 'Repository',
      icon: '@github',
      href: 'https://github.com/marcodpt/app'
    }
  ],
  sidebar: spec.map(({icon, title, description, examples}) => ({
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
    }
  ])
}
