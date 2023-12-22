export default () => {
  const lang = document.documentElement.lang.split('-')[0]
  return lang == 'pt' ? {
    back: 'Voltar',
    submit: 'Enviar',
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
    boolTrue: 'Sim'
  } : {
    back: 'Back',
    submit: 'Submit',
    type: v => `Must be of the specified type.`,
    minLength: v => `Must be a minimum of ${v} character(s).`,
    maxLength: v => `Must be a maximum of ${v} character(s).`,
    pattern: v => `Must have the specified pattern.`,
    minimum: v => `Must be at least: ${v}`,
    maximum: v => `Must be at most: ${v}`,
    enum: v => `Must be one of the possible options.`,
    pagination: (page, pages) => `Page ${page} of ${pages}`,
    search: 'Search',
    filter: 'Filter',
    group: 'Group',
    exporter: 'Export',
    check: 'Select',
    sort: [
      'Sort by this field.',
      'Double-click to sort in descending order.'
    ].join('\n'),
    boolFalse: 'No',
    boolTrue: 'Yes'
  }
}
