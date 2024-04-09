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
    }
  ]
}
