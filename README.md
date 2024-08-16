# ![](favicon.ico) Paw
  A low-code, vdom-free hyperscript framework.

  [![bundlejs](https://deno.bundlejs.com/badge?q=https://raw.githubusercontent.com/marcodpt/paw/main/index.js&treeshake=[*]&text=%22export+default+paw%22)](https://bundlejs.com/?q=https://raw.githubusercontent.com/marcodpt/paw/main/index.js&treeshake=[*]&text=%22export+default+paw%22)

  [Demo](https://marcodpt.github.io/paw/#/users)

## ❤️ Features
 - Theme [builder](https://marcodpt.github.io/paw/#/settings)
 - Built-in router
 - SPA with SSR `index.html` optimized for SEO
 - No build steps
 - No vDom
 - Stop the nonsense of rewriting any JS library for a framework!
 - JSON Schema based [forms](https://marcodpt.github.io/paw/#/examples/form/4)
 - HTML to Hyperscript [converter](https://marcodpt.github.io/paw/#/converter)
 - [Table](https://marcodpt.github.io/paw/#/users) data with great flexibility
 - [Graph](https://marcodpt.github.io/paw/#/examples/graph/0)
 - [Chart](https://marcodpt.github.io/paw/#/examples/chart/0)
 - [Barcode](https://marcodpt.github.io/paw/#/examples/barcode/0)
 - [Maps](https://marcodpt.github.io/paw/#/examples/map/1)

## 🎯 Goals
 - Bring maximum customization via graphical interface.
 - Build a solid, well-tested library of hyperscript components.
 - Simplify the use of third-party libraries with components with sane defaults.
 - Document all code completely and at the same time concisely.
 - Many examples synchronized with the tests.

## 📢 Motivation

### Why are JS frameworks bad?
Frameworks like:

 - [react](https://github.com/facebook/react)
 - [vue](https://github.com/vuejs/core)
 - [angular](https://github.com/angular/angular)
 - [svelte](https://github.com/sveltejs/svelte)
 - [qwik](https://github.com/QwikDev/qwik)
 - [hyperapp](https://github.com/jorgebucaran/hyperapp)

suffer from the same problem.

We can argue that vDom is slow so [svelte](https://github.com/sveltejs/svelte)
solves the problem by compiling javascript in the build steps.

We can argue that the frameworks are heavy and
[svelte](https://github.com/sveltejs/svelte) solves the problem again,
[qwik](https://github.com/QwikDev/qwik) only loads js on demand,
and [hyperapp](https://github.com/jorgebucaran/hyperapp) is too minimalistic.

We can argue that build steps are unecessary complication and 
[hyperapp](https://github.com/jorgebucaran/hyperapp) is the clear winner here.

But this is getting away from the central problem with these approaches, which
they ALL suffer from.

The problem is that frameworks need to control JavaScript centrally in the
elements and/or components that are used.

This implies that the code of a library external to the framework must be
rewritten.

See for example the number of existing [Bootstrap](https://getbootstrap.com/)
javascript implementations:
 
 - [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)
 - [bootstrap-vue](https://github.com/bootstrap-vue/bootstrap-vue)
 - [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap)
 - [sveltestrap](https://github.com/bestguy/sveltestrap)

These projects exist for the reason that vDom and the implementation of a
component library conflict.

If you need a less popular external library and/or use a framework with a
smaller community, you will have to reimplement javascript or wait for someone
to do it with all the difficulties and bugs involved.

### Why web components are bad?

Libraries like [Shoelace](https://github.com/shoelace-style/shoelace) allow you
to use reactive components within these frameworks without having to be
reimplemented.

The problem is data exchange, two way data binding needs to be implemented
individually for each framework.

Components written in HTML do not have the good parts of these vDom frameworks
that allow you to easily pass `objects`, `arrays` and `functions` to them,
greatly limiting their capacity and making the API difficult.

### Why I build this project?

I wanted to have components with all the capabilities of javascript frameworks
(passing `objects`, `arrays` and `functions`).

And have a simplified interface to access work done in libraries like
[Bootstrap](https://getbootstrap.com/) without having to reimplement
javascript.

The fact that using hyperscript allows you to encapsulate the logic of the
components in small modules that make the weight of the vDom unnecessary.

I didn't want to have to deal with the complications of build steps.

And I wanted the libraries I used to only be loaded when called (using es6
modules or dynamically adding the script to the page).

And to achieve good
[SEO](https://en.wikipedia.org/wiki/Search_engine_optimization),
produce an [SSR home page](https://marcodpt.github.io/paw/#/settings)
with the customization options that exist in the open source world.

I didn't find anything on github or google that went this route,
so I created it.

## 🔧 TODO
 - put a hello world in the documentation and in the generated index.html
 - external links simbol and remove data-paw-path
 - dynamic title on route change
 - completely remove functions assign to DOM, table.read, table.setData,
fieldset.setProp, etc

 - dynamic tests implementation
 - highlightjs as a component
 - tests as a route and qunit as a component
 - docs as component
 - examples as component
 - formatter should be a component?
 - normalize schema component and used to apply all defaults everywhere.
 - `output` raw referenced in `input`, how to solve that?
 - allow icon with input to avoid unicode and translation
 - separate input and output options
 - allow to see other tests variants
 - dynamic validation with functions
 - input wrapper review
 - remove or minimize lang support
 - remove non bootstrap options support, minimize options and review settings
 - separate outputs
 - copy README features to home article and allow to edit it
 - better array ctrl support (minimize, up, down, remove, add)
 - deep router param is an array (?, +, \*) support at the end of var
 - finish documentation
 - finish static tests
 - finish dynamic tests

## 🤝 Contributing
It's a very simple project.
Any contribution, any feedback is greatly appreciated.

## ⭐ Support
If this project was useful to you, consider giving it a star on github, it's a
way to increase evidence and attract more contributors.

## 🙏 Acknowledgment
This work would not be possible if it were not for these related projects:
 - [FontAwesome](https://fontawesome.com/)
 - [Bootstrap](https://getbootstrap.com/)
 - [Bootswatch](https://bootswatch.com/)
 - [JSON Schema](https://json-schema.org/)
 - [HTML5 Boilerplate](https://html5boilerplate.com/)
 - [highlight.js](https://highlightjs.org/)
 - [Cytoscape.js](https://js.cytoscape.org/)
 - [Chart.js](https://www.chartjs.org/)
 - [JsBarcode](https://lindell.me/JsBarcode/)
 - [Leaflet](https://leafletjs.com/)
 - [QUnit](https://qunitjs.com/)
 - [FontIcon](https://gauger.io/fonticon/)
 - [bundlejs](https://bundlejs.com/)
 - [HTML5 Reference](https://www.w3schools.com/TAGS/default.asp)
 - [Unicode Party](https://unicode.party/)

A huge thank you to all the people who contributed to these projects.
