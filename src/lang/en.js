export default {
  close: 'Close',
  submit: 'Submit',
  loading: 'Loading...',
  noOption: 'Choose one option...',
  error: 'Error!',

  type: v => `Must be of the specified type.`,
  minLength: v => `Must be a minimum of ${v} character(s).`,
  maxLength: v => `Must be a maximum of ${v} character(s).`,
  pattern: v => `Must have the specified pattern.`,
  minimum: v => `Must be at least: ${v}`,
  maximum: v => `Must be at most: ${v}`,
  enum: v => `Must be one of the possible options.`,
  maxItems: v => `Must have at most ${v} item${v != 1 ? 's' : ''}`,
  minItems: v => `Must have at least ${v} item${v != 1 ? 's' : ''}`,
  uniqueItems: v => `Items must be unique.`,

  boolFalse: 'No',
  boolTrue: 'Yes'
}
