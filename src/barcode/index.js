import deps from '../../dependencies.js' 
var script = null
export default ({
  height,
  barcode
}) => {
  const target = document.createElement("img")
  const build = () => {
    JsBarcode(target, barcode, {
      displayValue: true
    })
    target.height = height || 100
  }
  if (!window.JsBarcode) {
    if (!script) {
      script = document.createElement('script')
      script.src = deps.barcode
      document.head.appendChild(script)
    }
    script.addEventListener('load', build)
  } else {
    build()
  }

  return target
}
