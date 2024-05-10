import tag from './tag.js'

const links = [tag].map(({icon, title, description}) => ({
  icon,
  title,
  description,
  href: '#/docs/'+title
}))

export default links
