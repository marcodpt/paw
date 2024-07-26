import spec from './index.js'

const text = str => str.trim()
    .replace(/\\n/g, () => ' ')
    .replace(/\s+</g, () => '<')
    .replace(/"\s+>/g, () => '">')
    .replace(/\s+/g, () => ' ')
    .replace(/"app_([a-z]+?)_[0-9]{6}"/g, 'app_$1_000000')

const htmlRead = el => {
  if (el.nodeType === 3 && el.textContent.trim()) {
    return el.textContent
  } else if (el.nodeType !== 1) {
    return null
  }

  const tag = element.tagName.toLowerCase()
  const attributes = Array.from(element.attributes)
    .filter(nodeName != 'class')
    .map(({
      nodeName,
      nodeValue
    }) => ({
      name: nodeName,
      value: nodeValue
    }))
  attributes.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)

  const css = element.getAttribute('class').split(' ')
    .map(c => c.trim()).filter(c => c)
  css.sort()

  const child = Array.from(
    (tag == 'template' ? element.content : element).childNodes
  ).map(child => htmlRead(child)).filter(el => el)

  return {tag, attributes, child, css}
}

const htmlCmp = (expected, result, path) => {
  const isObj = x => x && typeof x == 'object'

  if (isObj(expected) && isObj(result)) {
    if (expected.tag != result.tag) {
      return `ERROR: ${path}`+
        `\n\nEXPECTED TAG:\n${expected.tag}`+
        `\n\nRESULT:\n${result.tag}`
    }
    path += ' '+expected.tag
    const a = expected.attributes
    const b = result.attributes
    for (var i = 0; i < a.length || i < b.length; i++) {
      if (a[i] == null || b[i] == null || a[i].name != b[i].name) {
        if (a[i] == null || (b[i] != null && a[i].name > b[i].name)) {
          return `ERROR: ${path}`+
            `\n\nUNEXPECTED ATTRIBUTE:\n${b[i].name}="${b[i].value}"`
        } else {
          return `ERROR: ${path}`+
            `\n\nMISSING ATTRIBUTE:\n${a[i].name}="${a[i].value}"`
        }
      } else if (a[i].value != b[i].value) {
        return `ERROR: ${path}`+
          `\n\nEXPECTED:\n${a[i].name}="${a[i].value}`+
          `\n\nRESULT:\n${b[i].name}="${b[i].value}`
      }
    }
    const x = expected.css
    const y = result.css
    for (var i = 0; i < x.length || i < y.length; i++) {
      if (x[i] !== y[i]) {
        if (x[i] == null || (y[i] != null && x[i] > y[i]))  {
          return `ERROR: ${path}`+
            `\n\nUNEXPECTED CLASS:\n${y[i]}"`
        } else {
          return `ERROR: ${path}`+
            `\n\nMISSING CLASS:\n${x[i]}`
        }
      }
    }

    const j = expected.child
    const k = result.child
    for (var i = 0; i < j.length || i < k.length; i++) {
      const r = htmlCmp(j[i], k[i], path)
      if (r) {
        return r
      }
    }
  } else if (typeof expected == 'string' && typeof result == 'string') {
    if (expected !== result) {
      return `ERROR: ${path}`+
        `\n\nEXPECTED TEXT:\n${expected}`+
        `\n\nRESULT:\n${result}`
    }
  } else {
    const label = x => isObj(x) ? `<${x.tag}>` : x == null ? 'EMPTY' : x
    return `ERROR: ${path}`+
      `\n\nEXPECTED:\n${label(expected)}`+
      `\n\nRESULT:\n${label(result)}`
  }
}

spec.forEach(({title, examples, component}) => {
  QUnit.module(title, () => {
    const aggregate = {
      max: 0,
      props: []
    }
    examples.forEach(({title, data, html, test}) => {
      aggregate.max += data.length
      data.forEach(X => {
        if (typeof X === 'object') {
          Object.keys(X).forEach(k => {
            if (aggregate.props.indexOf(k) < 0) {
              aggregate.props.push(k)
            }
          })
        }
      })
      if (html == null) {
        return
      }
      QUnit.test(title, assert => {
        data.forEach(X => {
          const res = component(X)
          assert.equal(
            text(res.nodeType === 3 ? res.textContent : res.outerHTML),
            text(html)
          )
          if (typeof test === 'function') {
            test(res, assert)
          }
        })
      })
    })
    console.log('\n\n****** '+title+' *******')
    console.log(aggregate)
  })
})
