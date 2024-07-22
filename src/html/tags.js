export default {
  a: {
    description: 'Defines a hyperlink',
    tags: ['body', 'links']
  },
  abbr: {
    description: 'Defines an abbreviation or an acronym',
    tags: ['body', 'typography']
  },
  address: {
    description: 'Defines contact information for the author/owner of a document',
    tags: ['body', 'typography']
  },
  area: {
    description: 'Defines an area inside an image map',
    tags: ['self-closing', 'body', 'images']
  },
  article: {
    description: 'Defines an article',
    tags: ['body', 'semantic']
  },
  aside: {
    description: 'Defines content aside from the page content',
    tags: ['body', 'semantic']
  },
  audio: {
    description: 'Defines embedded sound content',
    tags: ['body', 'media']
  },
  b: {
    description: 'Defines bold text',
    tags: ['body', 'typography']
  },
  base: {
    description: 'Specifies the base URL/target for all relative URLs in a document',
    tags: ['self-closing', 'head', 'links']
  },
  bdi: {
    description: 'Isolates a part of text that might be formatted in a different direction from other text outside it',
    tags: ['body', 'typography']
  },
  bdo: {
    description: 'Overrides the current text direction',
    tags: ['body', 'typography']
  },
  blockquote: {
    description: 'Defines a section that is quoted from another source',
    tags: ['body', 'typography']
  },
  body: {
    description: 'Defines the document\'s body',
    tags: ['unique']
  },
  br: {
    description: 'Defines a single line break',
    tags: ['self-closing', 'body', 'typography']
  },
  button: {
    description: 'Defines a clickable button',
    tags: ['body', 'io']
  },
  canvas: {
    description: 'Used to draw graphics, on the fly, via scripting (usually JavaScript)',
    tags: ['body', 'images']
  },
  caption: {
    description: 'Defines a table caption',
    tags: ['body', 'tables']
  },
  cite: {
    description: 'Defines the title of a work',
    tags: ['body', 'typography']
  },
  code: {
    description: 'Defines a piece of computer code',
    tags: ['body', 'typography']
  },
  col: {
    description: 'Specifies column properties for each column within a <colgroup> element',
    tags: ['self-closing', 'body', 'tables']
  },
  colgroup: {
    description: 'Specifies a group of one or more columns in a table for formatting',
    tags: ['body', 'tables']
  },
  data: {
    description: 'Adds a machine-readable translation of a given content',
    tags: ['body', 'io']
  },
  datalist: {
    description: 'Specifies a list of pre-defined options for input controls',
    tags: ['body', 'io']
  },
  dd: {
    description: 'Defines a description/value of a term in a description list',
    tags: ['body', 'lists']
  },
  del: {
    description: 'Defines text that has been deleted from a document',
    tags: ['body', 'typography']
  },
  details: {
    description: 'Defines additional details that the user can view or hide',
    tags: ['body', 'semantic']
  },
  dfn: {
    description: 'Specifies a term that is going to be defined within the content',
    tags: ['body', 'typography']
  },
  dialog: {
    description: 'Defines a dialog box or window',
    tags: ['body', 'semantic']
  },
  div: {
    description: 'Defines a section in a document',
    tags: ['body', 'semantic']
  },
  dl: {
    description: 'Defines a description list',
    tags: ['body', 'lists']
  },
  dt: {
    description: 'Defines a term/name in a description list',
    tags: ['body', 'lists']
  },
  em: {
    description: 'Defines emphasized text',
    tags: ['body', 'typography']
  },
  embed: {
    description: 'Defines a container for an external application',
    tags: ['self-closing', 'body', 'media', 'script']
  },
  fieldset: {
    description: 'Groups related elements in a form',
    tags: ['body', 'io']
  },
  figcaption: {
    description: 'Defines a caption for a <figure> element',
    tags: ['body', 'images']
  },
  figure: {
    description: 'Specifies self-contained content',
    tags: ['body', 'images']
  },
  footer: {
    description: 'Defines a footer for a document or section',
    tags: ['body', 'semantic']
  },
  form: {
    description: 'Defines an HTML form for user input',
    tags: ['body', 'io']
  },
  h1: {
    description: 'Defines HTML heading',
    tags: ['body', 'typography']
  },
  h2: {
    description: 'Defines HTML heading',
    tags: ['body', 'typography']
  },
  h3: {
    description: 'Defines HTML heading',
    tags: ['body', 'typography']
  },
  h4: {
    description: 'Defines HTML heading',
    tags: ['body', 'typography']
  },
  h5: {
    description: 'Defines HTML heading',
    tags: ['body', 'typography']
  },
  h6: {
    description: 'Defines HTML heading',
    tags: ['body', 'typography']
  },
  head: {
    description: 'Contains metadata/information for the document',
    tags: ['unique']
  },
  header: {
    description: 'Defines a header for a document or section',
    tags: ['body', 'semantic']
  },
  hgroup: {
    description: 'Defines a header and related content',
    tags: ['body', 'semantic']
  },
  hr: {
    description: 'Defines a thematic change in the content',
    tags: ['self-closing', 'body', 'semantic']
  },
  html: {
    description: 'Defines the root of an HTML document',
    tags: ['unique']
  },
  i: {
    description: 'Defines a part of text in an alternate voice or mood',
    tags: ['body', 'typography']
  },
  iframe: {
    description: 'Defines an inline frame',
    tags: ['body', 'script']
  },
  img: {
    description: 'Defines an image',
    tags: ['self-closing', 'body', 'images']
  },
  input: {
    description: 'Defines an input control',
    tags: ['self-closing', 'body', 'io']
  },
  ins: {
    description: 'Defines a text that has been inserted into a document',
    tags: ['body', 'typography']
  },
  kbd: {
    description: 'Defines keyboard input',
    tags: ['body', 'typography']
  },
  label: {
    description: 'Defines a label for an <input> element',
    tags: ['body', 'io']
  },
  legend: {
    description: 'Defines a caption for a <fieldset> element',
    tags: ['body', 'io']
  },
  li: {
    description: 'Defines a list item',
    tags: ['body', 'lists']
  },
  link: {
    description: 'Defines the relationship between a document and an external resource (most used to link to style sheets)',
    tags: ['self-closing', 'head', 'script']
  },
  main: {
    description: 'Specifies the main content of a document',
    tags: ['body', 'unique', 'semantic']
  },
  map: {
    description: 'Defines an image map',
    tags: ['body', 'images']
  },
  mark: {
    description: 'Defines marked/highlighted text',
    tags: ['body', 'typography']
  },
  menu: {
    description: 'Defines an unordered list',
    tags: ['body', 'lists']
  },
  meta: {
    description: 'Defines metadata about an HTML document',
    tags: ['self-closing', 'head', 'io']
  },
  meter: {
    description: 'Defines a scalar measurement within a known range (a gauge)',
    tags: ['body', 'io']
  },
  nav: {
    description: 'Defines navigation links',
    tags: ['body', 'semantic', 'links']
  },
  noscript: {
    description: 'Defines an alternate content for users that do not support client-side scripts',
    tags: ['body', 'script']
  },
  object: {
    description: 'Defines a container for an external application',
    tags: ['body', 'media', 'script']
  },
  ol: {
    description: 'Defines an ordered list',
    tags: ['body', 'lists']
  },
  optgroup: {
    description: 'Defines a group of related options in a drop-down list',
    tags: ['body', 'io']
  },
  option: {
    description: 'Defines an option in a drop-down list',
    tags: ['body', 'io']
  },
  output: {
    description: 'Defines the result of a calculation',
    tags: ['body', 'io']
  },
  p: {
    description: 'Defines a paragraph',
    tags: ['body', 'typography']
  },
  param: {
    description: 'Defines a parameter for an object',
    tags: ['self-closing', 'body', 'media', 'script']
  },
  picture: {
    description: 'Defines a container for multiple image resources',
    tags: ['body', 'images']
  },
  pre: {
    description: 'Defines preformatted text',
    tags: ['body', 'typography']
  },
  progress: {
    description: 'Represents the progress of a task',
    tags: ['body', 'io']
  },
  q: {
    description: 'Defines a short quotation',
    tags: ['body', 'typography']
  },
  rp: {
    description: 'Defines what to show in browsers that do not support ruby annotations',
    tags: ['body', 'typography']
  },
  rt: {
    description: 'Defines an explanation/pronunciation of characters (for East Asian typography)',
    tags: ['body', 'typography']
  },
  ruby: {
    description: 'Defines a ruby annotation (for East Asian typography)',
    tags: ['body', 'typography']
  },
  s: {
    description: 'Defines text that is no longer correct',
    tags: ['body', 'typography']
  },
  samp: {
    description: 'Defines sample output from a computer program',
    tags: ['body', 'typography']
  },
  script: {
    description: 'Defines a client-side script',
    tags: ['head', 'body', 'script']
  },
  search: {
    description: 'Defines a search section',
    tags: ['body', 'semantic']
  },
  section: {
    description: 'Defines a section in a document',
    tags: ['body', 'semantic']
  },
  select: {
    description: 'Defines a drop-down list',
    tags: ['body', 'io']
  },
  small: {
    description: 'Defines smaller text',
    tags: ['body', 'typography']
  },
  source: {
    description: 'Defines multiple media resources for media elements (<video> and <audio>)',
    tags: ['self-closing', 'body', 'media']
  },
  span: {
    description: 'Defines a section in a document',
    tags: ['body', 'semantic']
  },
  strong: {
    description: 'Defines important text',
    tags: ['body', 'typography']
  },
  style: {
    description: 'Defines style information for a document',
    tags: ['head', 'script']
  },
  sub: {
    description: 'Defines subscripted text',
    tags: ['body', 'typography']
  },
  summary: {
    description: 'Defines a visible heading for a <details> element',
    tags: ['body', 'semantic']
  },
  sup: {
    description: 'Defines superscripted text',
    tags: ['body', 'typography']
  },
  svg: {
    description: 'Defines a container for SVG graphics',
    tags: ['body', 'images']
  },
  table: {
    description: 'Defines a table',
    tags: ['body', 'tables']
  },
  tbody: {
    description: 'Groups the body content in a table',
    tags: ['body', 'tables']
  },
  td: {
    description: 'Defines a cell in a table',
    tags: ['body', 'tables']
  },
  template: {
    description: 'Defines a container for content that should be hidden when the page loads',
    tags: ['body']
  },
  textarea: {
    description: 'Defines a multiline input control (text area)',
    tags: ['body', 'io']
  },
  tfoot: {
    description: 'Groups the footer content in a table',
    tags: ['body', 'tables']
  },
  th: {
    description: 'Defines a header cell in a table',
    tags: ['body', 'tables']
  },
  thead: {
    description: 'Groups the header content in a table',
    tags: ['body', 'tables']
  },
  time: {
    description: 'Defines a specific time (or datetime)',
    tags: ['body', 'typography']
  },
  title: {
    description: 'Defines a title for the document',
    tags: ['head', 'unique']
  },
  tr: {
    description: 'Defines a row in a table',
    tags: ['body', 'tables']
  },
  track: {
    description: 'Defines text tracks for media elements (<video> and <audio>)',
    tags: ['self-closing', 'body', 'media']
  },
  u: {
    description: 'Defines some text that is unarticulated and styled differently from normal text',
    tags: ['body', 'typography']
  },
  ul: {
    description: 'Defines an unordered list',
    tags: ['body', 'lists']
  },
  var: {
    description: 'Defines a variable',
    tags: ['body', 'typography']
  },
  video: {
    description: 'Defines embedded video content',
    tags: ['body', 'media']
  },
  wbr: {
    description: 'Defines a possible line-break',
    tags: ['self-closing', 'body', 'typography']
  }
}
