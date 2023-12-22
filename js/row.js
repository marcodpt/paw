import {interpolate} from './lib.js'
import config from './config.js'
import {output} from './ui.js'
const {tools, text, icon, link} = config

export default {
  template: document.getElementById('view-row'),
  set: (_, state) => state,
  init: ({api, ...route}, call) => {
    const {schema, row} = api
    const state = {
      schema: null,
      row: null,
      fields: null,
      back: {
        label: text.back,
        icon: tools.icon(icon.back),
        link: tools.link(link.back)
      }
    }

    call('set', state)
    Promise.resolve().then(() => {
      return typeof schema == 'function' ? schema(route) : null
    }).then(schema => {
      state.schema = schema
      return typeof row == 'function' ? row(route) : null
    }).then(row => {
      row = row && typeof row == 'object' ? row : {}
      state.schema = state.schema || {
        type: 'object',
        properties: Object.keys(row).forEach(k => ({
          type: typeof row[k],
          title: k,
          name: k
        }))
      }

      const P = state.schema.properties || {}
      state.fields = Object.keys(P).map(k => output({
        ...P[k],
        href: interpolate(P[k].href, row)
      }, {name: k, model: row}))
      state.links = state.schema.links.map(({href, link, icon, ...l}) => ({
        ...l,
        href: interpolate(href, row),
        link: tools.link(link),
        icon: tools.icon(icon)
      }))
      call('set', state)
    })
  }
}
