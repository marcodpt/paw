# ![](favicon.ico) Paw
  A low-code, vdom-free hyperscript framework.

  [![bundlejs](https://deno.bundlejs.com/badge?q=https://raw.githubusercontent.com/marcodpt/paw/main/index.js&treeshake=[{default}])](https://bundlejs.com/?q=https://raw.githubusercontent.com/marcodpt/paw/main/index.js&treeshake=[{default}])
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  [Demo](https://marcodpt.github.io/paw/)

## ❤️ Features
 - Theme [builder](https://marcodpt.github.io/paw/#/settings) optimized for SEO
 - Built-in [SPA router](https://github.com/marcodpt/wand).
 - No build steps, no vDom, no need to rewrite any JS library!
 - JSON Schema based [forms](https://marcodpt.github.io/paw/#/example/form/4)
 - HTML to Hyperscript [converter](https://marcodpt.github.io/paw/#/converter)
 - [Table](https://marcodpt.github.io/paw/#/users) data with great flexibility
 - [Graph](https://marcodpt.github.io/paw/#/example/graph/0)
 - [Chart](https://marcodpt.github.io/paw/#/example/chart/0)
 - [Barcode](https://marcodpt.github.io/paw/#/example/barcode/0)
 - [Maps](https://marcodpt.github.io/paw/#/example/map/1)

## 💻 Usage
Copy the [boilerplate](https://github.com/marcodpt/paw/tree/main/boilerplate)
folder to your machine and run the command inside it.

```
python3 -m http.server
```

[This is what you will get!](https://marcodpt.github.io/paw/boilerplate/)


The folder contains 3 files
 - [favicon.ico](https://raw.githubusercontent.com/marcodpt/paw/main/boilerplate/favicon.ico):
Replace with your app icon.
 - [app.js](https://github.com/marcodpt/paw/blob/main/boilerplate/app.js):
These are your app's routes, modify as you like.
 - [index.html](https://github.com/marcodpt/paw/blob/main/boilerplate/index.html):
All navigation was automatically generated using
[this page](https://marcodpt.github.io/paw/#/settings).
You must import the file and edit it using the graphical interface and
then modify the `main` tag manually which will be the home page of your app.

The [demo app](https://marcodpt.github.io/paw/) uses
[index.html](https://github.com/marcodpt/paw/blob/main/index.html) as the
home page and [app.js](https://github.com/marcodpt/paw/blob/main/app.js)
as the router.

All routes were distributed across several modules within the
[views](https://github.com/marcodpt/paw/tree/main/views) folder.

It can be an excellent practical reference on how to use `Paw` and
how to organize the code.

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
 - completely remove functions assign to DOM, fieldset.setProp
 - dynamic tests implementation
 - highlightjs as a component (js/html)
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
 - better array ctrl support (minimize, up, down, remove, add)
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
 - [Wand](https://github.com/marcodpt/wand)
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
