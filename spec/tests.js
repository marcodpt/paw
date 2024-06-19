import spec from './index.js'

const text = str => str.trim()
    .replace(/\\n/g, () => ' ')
    .replace(/>\s+</g, () => '><')
    .replace(/"\s+>/g, () => '">')
    .replace(/\s+/g, () => ' ')

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
