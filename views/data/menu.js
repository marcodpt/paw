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
          title: 'Settings',
          icon: 'cog',
          href: '#/settings'
        }, {
          icon: 'flask',
          title: 'Tests',
          href: location.href.split('#')[0]+'spec/index.html'
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
      icon: 'book',
      title: 'References',
      children: [
        {
          icon: 'icons',
          title: 'Icons',
          description: 'FontAwesome Solid Icons.',
          href: 'https://fontawesome.com/search?o=r&m=free&s=solid'
        }, {
          icon: 'copyright',
          title: 'Brands',
          description: 'FontAwesome Brands Icons.',
          href: 'https://fontawesome.com/search?o=r&m=free&f=brands'
        }, {
          icon: '@bootstrap',
          title: 'Bootstrap',
          description: 'Bootstrap 5.3 documentation.',
          href: 'https://getbootstrap.com/docs/5.3/getting-started/introduction/'
        }, {
          icon: 'palette',
          title: 'Bootswatch',
          description: 'Bootstrap themes available.',
          href: 'https://bootswatch.com/'
        }, {
          icon: 'circle-check',
          title: 'JSON Schema',
          description: 'JSON Schema 2020-12 reference.',
          href: 'https://www.learnjsonschema.com/2020-12/validation/'
        }, {
          icon: 'code',
          title: 'highlight.js',
          description: 'Syntax Highlight used in this docs.',
          href: 'https://highlightjs.org/'
        }, {
          icon: 'project-diagram',
          title: 'Cytoscape.js',
          description: 'Graph component dependency.',
          href: 'https://js.cytoscape.org/'
        }, {
          icon: 'chart-line',
          title: 'Chart.js',
          description: 'Chart component dependency.',
          href: 'https://www.chartjs.org/'
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
  }))
}
