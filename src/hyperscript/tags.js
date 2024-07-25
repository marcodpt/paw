export default {
  a: {
    description: 'Defines a hyperlink',
    usages: ['body', 'links']
  },
  abbr: {
    description: 'Defines an abbreviation or an acronym',
    usages: ['body', 'typography']
  },
  address: {
    description: 'Defines contact information for the author/owner of a document',
    usages: ['body', 'typography']
  },
  area: {
    description: 'Defines an area inside an image map',
    usages: ['self-closing', 'body', 'images']
  },
  article: {
    description: 'Defines an article',
    usages: ['body', 'semantic']
  },
  aside: {
    description: 'Defines content aside from the page content',
    usages: ['body', 'semantic']
  },
  audio: {
    description: 'Defines embedded sound content',
    usages: ['body', 'media']
  },
  b: {
    description: 'Defines bold text',
    usages: ['body', 'typography']
  },
  base: {
    description: 'Specifies the base URL/target for all relative URLs in a document',
    usages: ['self-closing', 'head', 'links']
  },
  bdi: {
    description: 'Isolates a part of text that might be formatted in a different direction from other text outside it',
    usages: ['body', 'typography']
  },
  bdo: {
    description: 'Overrides the current text direction',
    usages: ['body', 'typography']
  },
  blockquote: {
    description: 'Defines a section that is quoted from another source',
    usages: ['body', 'typography']
  },
  body: {
    description: 'Defines the document\'s body',
    usages: ['unique']
  },
  br: {
    description: 'Defines a single line break',
    usages: ['self-closing', 'body', 'typography']
  },
  button: {
    description: 'Defines a clickable button',
    usages: ['body', 'io']
  },
  canvas: {
    description: 'Used to draw graphics, on the fly, via scripting (usually JavaScript)',
    usages: ['body', 'images']
  },
  caption: {
    description: 'Defines a table caption',
    usages: ['body', 'tables']
  },
  cite: {
    description: 'Defines the title of a work',
    usages: ['body', 'typography']
  },
  code: {
    description: 'Defines a piece of computer code',
    usages: ['body', 'typography']
  },
  col: {
    description: 'Specifies column properties for each column within a <colgroup> element',
    usages: ['self-closing', 'body', 'tables']
  },
  colgroup: {
    description: 'Specifies a group of one or more columns in a table for formatting',
    usages: ['body', 'tables']
  },
  data: {
    description: 'Adds a machine-readable translation of a given content',
    usages: ['body', 'io']
  },
  datalist: {
    description: 'Specifies a list of pre-defined options for input controls',
    usages: ['body', 'io']
  },
  dd: {
    description: 'Defines a description/value of a term in a description list',
    usages: ['body', 'lists']
  },
  del: {
    description: 'Defines text that has been deleted from a document',
    usages: ['body', 'typography']
  },
  details: {
    description: 'Defines additional details that the user can view or hide',
    usages: ['body', 'semantic']
  },
  dfn: {
    description: 'Specifies a term that is going to be defined within the content',
    usages: ['body', 'typography']
  },
  dialog: {
    description: 'Defines a dialog box or window',
    usages: ['body', 'semantic']
  },
  div: {
    description: 'Defines a section in a document',
    usages: ['body', 'semantic']
  },
  dl: {
    description: 'Defines a description list',
    usages: ['body', 'lists']
  },
  dt: {
    description: 'Defines a term/name in a description list',
    usages: ['body', 'lists']
  },
  em: {
    description: 'Defines emphasized text',
    usages: ['body', 'typography']
  },
  embed: {
    description: 'Defines a container for an external application',
    usages: ['self-closing', 'body', 'media', 'script']
  },
  fieldset: {
    description: 'Groups related elements in a form',
    usages: ['body', 'io']
  },
  figcaption: {
    description: 'Defines a caption for a <figure> element',
    usages: ['body', 'images']
  },
  figure: {
    description: 'Specifies self-contained content',
    usages: ['body', 'images']
  },
  footer: {
    description: 'Defines a footer for a document or section',
    usages: ['body', 'semantic']
  },
  form: {
    description: 'Defines an HTML form for user input',
    usages: ['body', 'io']
  },
  h1: {
    description: 'Defines HTML heading',
    usages: ['body', 'typography']
  },
  h2: {
    description: 'Defines HTML heading',
    usages: ['body', 'typography']
  },
  h3: {
    description: 'Defines HTML heading',
    usages: ['body', 'typography']
  },
  h4: {
    description: 'Defines HTML heading',
    usages: ['body', 'typography']
  },
  h5: {
    description: 'Defines HTML heading',
    usages: ['body', 'typography']
  },
  h6: {
    description: 'Defines HTML heading',
    usages: ['body', 'typography']
  },
  head: {
    description: 'Contains metadata/information for the document',
    usages: ['unique']
  },
  header: {
    description: 'Defines a header for a document or section',
    usages: ['body', 'semantic']
  },
  hgroup: {
    description: 'Defines a header and related content',
    usages: ['body', 'semantic']
  },
  hr: {
    description: 'Defines a thematic change in the content',
    usages: ['self-closing', 'body', 'semantic']
  },
  html: {
    description: 'Defines the root of an HTML document',
    usages: ['unique']
  },
  i: {
    description: 'Defines a part of text in an alternate voice or mood',
    usages: ['body', 'typography']
  },
  iframe: {
    description: 'Defines an inline frame',
    usages: ['body', 'script']
  },
  img: {
    description: 'Defines an image',
    usages: ['self-closing', 'body', 'images']
  },
  input: {
    description: 'Defines an input control',
    usages: ['self-closing', 'body', 'io']
  },
  ins: {
    description: 'Defines a text that has been inserted into a document',
    usages: ['body', 'typography']
  },
  kbd: {
    description: 'Defines keyboard input',
    usages: ['body', 'typography']
  },
  label: {
    description: 'Defines a label for an <input> element',
    usages: ['body', 'io']
  },
  legend: {
    description: 'Defines a caption for a <fieldset> element',
    usages: ['body', 'io']
  },
  li: {
    description: 'Defines a list item',
    usages: ['body', 'lists']
  },
  link: {
    description: 'Defines the relationship between a document and an external resource (most used to link to style sheets)',
    usages: ['self-closing', 'head', 'script']
  },
  main: {
    description: 'Specifies the main content of a document',
    usages: ['body', 'unique', 'semantic']
  },
  map: {
    description: 'Defines an image map',
    usages: ['body', 'images']
  },
  mark: {
    description: 'Defines marked/highlighted text',
    usages: ['body', 'typography']
  },
  menu: {
    description: 'Defines an unordered list',
    usages: ['body', 'lists']
  },
  meta: {
    description: 'Defines metadata about an HTML document',
    usages: ['self-closing', 'head', 'io']
  },
  meter: {
    description: 'Defines a scalar measurement within a known range (a gauge)',
    usages: ['body', 'io']
  },
  nav: {
    description: 'Defines navigation links',
    usages: ['body', 'semantic', 'links']
  },
  noscript: {
    description: 'Defines an alternate content for users that do not support client-side scripts',
    usages: ['body', 'script']
  },
  object: {
    description: 'Defines a container for an external application',
    usages: ['body', 'media', 'script']
  },
  ol: {
    description: 'Defines an ordered list',
    usages: ['body', 'lists']
  },
  optgroup: {
    description: 'Defines a group of related options in a drop-down list',
    usages: ['body', 'io']
  },
  option: {
    description: 'Defines an option in a drop-down list',
    usages: ['body', 'io']
  },
  output: {
    description: 'Defines the result of a calculation',
    usages: ['body', 'io']
  },
  p: {
    description: 'Defines a paragraph',
    usages: ['body', 'typography']
  },
  param: {
    description: 'Defines a parameter for an object',
    usages: ['self-closing', 'body', 'media', 'script']
  },
  picture: {
    description: 'Defines a container for multiple image resources',
    usages: ['body', 'images']
  },
  pre: {
    description: 'Defines preformatted text',
    usages: ['body', 'typography']
  },
  progress: {
    description: 'Represents the progress of a task',
    usages: ['body', 'io']
  },
  q: {
    description: 'Defines a short quotation',
    usages: ['body', 'typography']
  },
  rp: {
    description: 'Defines what to show in browsers that do not support ruby annotations',
    usages: ['body', 'typography']
  },
  rt: {
    description: 'Defines an explanation/pronunciation of characters (for East Asian typography)',
    usages: ['body', 'typography']
  },
  ruby: {
    description: 'Defines a ruby annotation (for East Asian typography)',
    usages: ['body', 'typography']
  },
  s: {
    description: 'Defines text that is no longer correct',
    usages: ['body', 'typography']
  },
  samp: {
    description: 'Defines sample output from a computer program',
    usages: ['body', 'typography']
  },
  script: {
    description: 'Defines a client-side script',
    usages: ['head', 'body', 'script']
  },
  search: {
    description: 'Defines a search section',
    usages: ['body', 'semantic']
  },
  section: {
    description: 'Defines a section in a document',
    usages: ['body', 'semantic']
  },
  select: {
    description: 'Defines a drop-down list',
    usages: ['body', 'io']
  },
  small: {
    description: 'Defines smaller text',
    usages: ['body', 'typography']
  },
  source: {
    description: 'Defines multiple media resources for media elements (<video> and <audio>)',
    usages: ['self-closing', 'body', 'media']
  },
  span: {
    description: 'Defines a section in a document',
    usages: ['body', 'semantic']
  },
  strong: {
    description: 'Defines important text',
    usages: ['body', 'typography']
  },
  style: {
    description: 'Defines style information for a document',
    usages: ['head', 'script']
  },
  sub: {
    description: 'Defines subscripted text',
    usages: ['body', 'typography']
  },
  summary: {
    description: 'Defines a visible heading for a <details> element',
    usages: ['body', 'semantic']
  },
  sup: {
    description: 'Defines superscripted text',
    usages: ['body', 'typography']
  },
  svg: {
    description: 'Defines a container for SVG graphics',
    usages: ['body', 'images']
  },
  table: {
    description: 'Defines a table',
    usages: ['body', 'tables']
  },
  tbody: {
    description: 'Groups the body content in a table',
    usages: ['body', 'tables']
  },
  td: {
    description: 'Defines a cell in a table',
    usages: ['body', 'tables']
  },
  template: {
    description: 'Defines a container for content that should be hidden when the page loads',
    usages: ['body']
  },
  textarea: {
    description: 'Defines a multiline input control (text area)',
    usages: ['body', 'io']
  },
  tfoot: {
    description: 'Groups the footer content in a table',
    usages: ['body', 'tables']
  },
  th: {
    description: 'Defines a header cell in a table',
    usages: ['body', 'tables']
  },
  thead: {
    description: 'Groups the header content in a table',
    usages: ['body', 'tables']
  },
  time: {
    description: 'Defines a specific time (or datetime)',
    usages: ['body', 'typography']
  },
  title: {
    description: 'Defines a title for the document',
    usages: ['head', 'unique']
  },
  tr: {
    description: 'Defines a row in a table',
    usages: ['body', 'tables']
  },
  track: {
    description: 'Defines text tracks for media elements (<video> and <audio>)',
    usages: ['self-closing', 'body', 'media']
  },
  u: {
    description: 'Defines some text that is unarticulated and styled differently from normal text',
    usages: ['body', 'typography']
  },
  ul: {
    description: 'Defines an unordered list',
    usages: ['body', 'lists']
  },
  var: {
    description: 'Defines a variable',
    usages: ['body', 'typography']
  },
  video: {
    description: 'Defines embedded video content',
    usages: ['body', 'media']
  },
  wbr: {
    description: 'Defines a possible line-break',
    usages: ['self-closing', 'body', 'typography']
  }
}
