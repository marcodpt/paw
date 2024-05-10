import spec from '../../spec/index.js'

export default {
  links: [
    {
      title: 'Tools',
      icon: 'tools',
      children: [
        {
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
          title: 'Stop Router',
          icon: 'stop',
          href: 'javascript:stop()'
        }
      ]
    }, {
      title: 'Settings',
      icon: 'cog',
      href: '#/settings'
    }, {
      title: 'Repository',
      icon: '@github',
      href: 'https://github.com/marcodpt/app'
    }
  ],
  sidebar: [
    {
      title: 'Users',
      icon: 'user',
      href: '#/users'
    }, {
      title: 'Render',
      icon: 'image',
      children: [
        {
          title: 'Lazy String',
          href: '#/render/lazy'
        }, {
          title: 'Error',
          href: '#/render/error'
        }
      ]
    }, {
      icon: 'box',
      title: 'Components',
      children: spec.map(({icon, title, description}) => ({
        icon,
        title,
        description,
        href: '#/docs/'+title
      }))
    }, {
      icon: 'flask',
      title: 'Tests',
      href: 'spec/index.html'
    }
  ]
}
