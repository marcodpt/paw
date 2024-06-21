import T from '../lang/index.js'

const UI = {
  bool: [
    {value: 0, label: T('boolFalse')},
    {value: 1, label: T('boolTrue')}
  ],
  types: [
    'string',
    'number',
    'integer',
    'object',
    'array',
    'boolean',
    'null'
  ],
  link: [
    'link',
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
  ],
  ui: [
    '',
    'date',
    'bool',
    'text',
    'info',
    'num.1',
    'num.2',
    'num.3',
    'len:2',
    'len:3',
    'len:4',
    'len:5',
    'len:6',
    'len:7',
    'len:8',
    'len:9',
    'password',
    'file',
    'color',
    'progress',
    'link',
    'icon',
    'ui'
  ]
}

const toOpt = V => !(V instanceof Array) ? null :
  V.map(v => typeof v == 'object' ? v : ({
    value: v,
    label: v != null && String(v) ? String(v) : '_'
  }))

export default (K, raw) => raw ? UI[K] :
  toOpt(K) || toOpt(UI[K])
