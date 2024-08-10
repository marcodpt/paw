import {map} from '../components.js'

export default ({
  icon: 'earth-americas',
  title: 'map',
  description: 'Generate maps with img tag',
  component: map,
  args: [
    {
      type: 'object',
      properties: {
        latitude: {
          type: 'number',
          description: 'Latitude of the center point of the map.',
          default: 0,
          minimum: -90,
          maximum: 90
        },
        longitude: {
          type: 'number',
          description: 'Longitude of the center point of the map.',
          default: 0,
          minimum: -180,
          maximum: 180
        },
        zoom: {
          type: 'number',
          description: 'Map zoom.',
          default: 13,
          minimum: 0,
          maximum: 18
        },
        height: {
          type: 'integer',
          description: 'The height in pixels of the map.',
          default: 400,
          minimum: 1
        },
        width: {
          type: 'integer',
          description: 'The width in pixels of the map.',
          default: 600,
          minimum: 1
        },
        markers: {
          type: 'array',
          description: 'A list of markers on the map.',
          default: [],
          items: {
            type: 'object',
            properties: {
              latitude: {
                type: 'number',
                description: 'Latitude of the center point of the map.',
                default: 0,
                minimum: -90,
                maximum: 90
              },
              longitude: {
                type: 'number',
                description: 'Longitude of the center point of the map.',
                default: 0,
                minimum: -180,
                maximum: 180
              },
              title: {
                type: 'string',
                description: 'Text for alt attribute of the marker.'
              },
              description: {
                type: 'string',
                description: 'Text for tooltip of the marker.'
              }
            }
          }
        }
      }
    }
  ],
  returns: {
    type: 'node'
  },
  examples: [
    {
      title: 'A map centered on New York.',
      data: [
        {
          latitude: 40.730610,
          longitude: -73.935242
        }
      ]
    }, {
      title: 'Map centered on Zurich with markers on some cities.',
      data: [
        {
          latitude: 47.373878,
          longitude: 8.545094,
          zoom: 5,
          markers: [
            {
              latitude: 48.864716,
              longitude: 2.349014,
              description: 'Paris'
            }, {
              latitude: 41.390205,
              longitude: 2.154007,
              description: 'Barcelona'
            }, {
              latitude: 51.509865,
              longitude: -0.118092,
              description: 'London'
            }, {
              latitude: 45.464664,
              longitude: 9.188540,
              description: 'Milan'
            }, {
              latitude: 53.551086,
              longitude: 9.993682,
              description: 'Hamburg'
            }
          ]
        }
      ]
    }
  ]
})
