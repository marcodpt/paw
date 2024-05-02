import offcanvas from '../nav/offcanvas.js'
import menu from '../nav/menu.js'
import toggler from '../nav/toggler.js'
import link from '../nav/link.js'
import list from '../nav/list.js'
import {rm} from '../lib.js'

export default ({links, sidebar}) => {
  const nav = document.body.querySelector('nav > .container-fluid')

  rm(document.getElementById('sidebar'))
  nav.querySelectorAll('[data-app="nav"]').forEach(e => rm(e))

  if (links && links instanceof Array) {
    nav.appendChild(toggler())
    nav.appendChild(link({children: links}))
  }
  if (sidebar && sidebar instanceof Array) {
    nav.prepend(menu({target: '#sidebar'}))

    document.body.appendChild(
      offcanvas({
        id: 'sidebar'
      }, [
        list({children: sidebar})
      ])
    )
  }
}
