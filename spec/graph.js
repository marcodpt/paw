import graph from '../src/graph.js'
import wait from './wait.js'

export default ({
  icon: 'project-diagram',
  title: 'graph',
  description: 'Interactive flowchart for data visualization.',
  component: graph,
  properties: {},
  examples: [
    {
      title: 'Friends',
      data: [
        {
          data: [
            {
              id: 'v1',
              label: 'John',
              color: 'black',
              info: () => wait(500).then(() => 'I am john!\nI am very   nice!')
            }, {
              id: 'v2',
              label: 'Paul',
              color: 'black',
              info: 'I am Paul!'
            }, {
              id: 'v3',
              label: 'Jimmy',
              color: 'black',
              info: () => wait(500).then(() => 'I am Jimmy!')
            }, {
              id: 'v4',
              label: 'David',
              color: 'black',
              info: 'I am David!'
            }, {
              id: 'e1',
              label: 'John -> Paul',
              color: 'blue',
              info: 'Cold!',
              source: 'v1',
              target: 'v2'
            }, {
              id: 'e2',
              label: 'Paul -> Jimmy',
              color: 'yellow',
              info: () => wait(500).then(() => 'Warm!'),
              source: 'v2',
              target: 'v3'
            }, {
              id: 'e3',
              label: 'Paul -> David',
              color: 'red',
              info: 'Very close!',
              source: 'v2',
              target: 'v4'
            }, {
              id: 'e4',
              label: 'Wrong Edge',
              color: 'red',
              info: 'It must be excluded!',
              source: 'v2',
              target: 'v5'
            }
          ]
        }
      ]
    }
  ]
})
