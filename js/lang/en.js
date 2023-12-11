export default {
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
