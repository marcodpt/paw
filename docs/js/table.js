export default {
  template: document.getElementById('view-table'),
  set: (_, state) => state,
  init: ({data, ...route}, call) => {
    const {rows} = data
    call('set', {})
    Promise.resolve().then(() => rows(route)).then(data => {
      const columns = data instanceof Array ? data.reduce((C, row) => {
        if (row && typeof row == 'object') {
          Object.keys(row).forEach(key => {
            if (C.indexOf(key) < 0) {
              C.push(key)
            }
          })
        }
        return C
      }, []) : []
      call('set', {
        columns: columns.map(c => ({title: c})),
        rows: data.map(row => ({
          fields: !columns.length ? row : columns.map(key => row[key])
        }))
      })
    })
  }
}
