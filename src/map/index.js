import node from '../hyperscript/node.js'

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
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
        link({
          rel: 'stylesheet',
          href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
          integrity: 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=',
          crossorigin: ''
        })
      )
      document.head.appendChild(stylesheet)
    }
    if (!script) {
      script = node(({script}) => 
        script({
          src: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
          integrity: 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=',
          crossorigin: ''
        })
      )
      document.head.appendChild(script)
    }
    script.addEventListener('load', build)
  } else {
    setTimeout(build, 100)
  }

  return target
}
