export default {
  close: 'Fechar',
  submit: 'Enviar',
  loading: 'Carregando...',
  noOption: 'Escolha uma opção...',
  error: 'Erro!',

  type: v => `Deve ser do tipo específicado.`,
  minLength: v => `Deve ter no mínimo ${v} caractere(s).`,
  maxLength: v => `Deve ter no máximo ${v} caractere(s).`,
  pattern: v => `Deve possuir o padrão específicado.`,
  minimum: v => `Deve ser no mínimo: ${v}`,
  maximum: v => `Deve ser no máximo: ${v}`,
  enum: v => `Deve ser uma das opções possíveis.`,

  pagination: (page, pages) => `Página ${page} de ${pages}`,
  search: 'Buscar',
  filter: 'Filtrar',
  group: 'Agrupar',
  exporter: 'Exportar',
  check: 'Selecionar',
  sort: [
    'Ordenar por este campo.',
    'Clique duas vezes para ordenar descendente.'
  ].join('\n'),
  boolFalse: 'Não',
  boolTrue: 'Sim',

  field: 'Campo',
  operator: 'Operador',
  value: 'Valor',
  operators: {
    ct: 'Contém',
    nc: 'Não contém',
    eq: 'É igual a',
    ne: 'Não é igual a',
    gt: 'Maior que',
    ge: 'Maior ou igual a',
    lt: 'Menor que',
    le: 'Menor ou igual a'
  }
}
