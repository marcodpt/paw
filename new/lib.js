const interpolate = (str, X) => {
  if (typeof str != 'string') {
    return str
  }
  str = str.replace(/{([^{}]*)}/g, (a, b) => X &&
    (typeof X[b] == 'string' || typeof X[b] == 'number') ? X[b] : '{}'
  )

  if (str.indexOf('{}') >= 0) {
    str = ''
  }

  return str
}

const iconify = x => x ? `fa-solid fa-${x}` : ''

const linkify = (x, isRow) => x ? `btn${isRow ? ' btn-sm' : ''} btn-${x}` : ''

export {interpolate, iconify, linkify}
