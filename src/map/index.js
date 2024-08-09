import deps from '../../dependencies.js' 
import {node} from '../components.js'

var script = null
var stylesheet = null

export default ({
  latitude,
  longitude,
  zoom,
  height,
  width,
  markers
}) => {
  const target = node(({div}) => 
    div({
      style: {
        height: (height || 400)+'px',
        width: (width || 600)+'px'
      }
    })
  )

  const build = () => {
    const map = L.map(target)
      .setView([latitude || 0, longitude || 0], zoom || 13)
    L.tileLayer(deps.map.tile, {
        maxZoom: 19,
        attribution: `&copy; <a href="${deps.map.copyright}">OpenStreetMap</a>`
    }).addTo(map)
    markers?.forEach(({
      latitude,
      longitude,
      title,
      description
    }) => {
      L.marker([latitude || 0, longitude || 0], {
        alt: title,
        title: description
      }).addTo(map)
    })
  }
  if (!window.L) {
    if (!stylesheet) {
      stylesheet = node(({link}) => 
        link(deps.map.css)
      )
      document.head.appendChild(stylesheet)
    }
    if (!script) {
      script = node(({script}) => 
        script(deps.map.js)
      )
      document.head.appendChild(script)
    }
    script.addEventListener('load', build)
  } else {
    setTimeout(build, 100)
  }

  return target
}
