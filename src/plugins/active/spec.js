export default ({
  icon: 'highlighter',
  title: 'active',
  description: `
    A plugin to activate links and display the current path with each route change.

    data-paw-path="Path text"
    Attribute used to mark an element as a navigation path.

    data-paw-active="class"
    Class to be added when the element is active.

    data-paw-inactive="class"
    Class to remove when element is inactive.

    data-paw-text="current"
    Marks the element to display the breadcrumb on each route change.
    Constructed with the text of each [data-paw-path] attribute found in the parents.
  `,
  args: [
    {
      title: 'state',
      type: 'object'
    }
  ],
  examples: [],
  modules: []
})
