# App 🚀
  Vanilla js SPA without vDom, build steps and all framework complications.

  [Demo](https://marcodpt.github.io/app/#/users)

## Features ❤️
 - SPA without vDom
 - Built-in router
 - `index.html` [builder](https://marcodpt.github.io/app/#/settings) with themes
 - JSON Schema based [forms](https://marcodpt.github.io/app/#/examples/form/4),
inputs and outputs
 - HTML to Hyperscript [converter]()
 - [Table](https://marcodpt.github.io/app/#/users) data with great flexibility
 - [Graph](https://marcodpt.github.io/app/#/examples/graph/0)
 - [Chart](https://marcodpt.github.io/app/#/examples/chart/0)
 - [Barcode](https://marcodpt.github.io/app/#/examples/barcode/0)
 - [Maps](https://marcodpt.github.io/app/#/examples/map/1)

## Motivation

### Why are vDom frameworks bad?
Frameworks like:

 - [react](https://github.com/facebook/react)
 - [vue](https://github.com/vuejs/core)
 - [angular](https://github.com/angular/angular)
 - [svelte](https://github.com/sveltejs/svelte)
 - [qwik](https://github.com/QwikDev/qwik)
 - [hyperapp](https://github.com/jorgebucaran/hyperapp)

suffer from the same problem.

We can argue that vDom is slow and that the performance of frameworks like [svelte](https://github.com/sveltejs/svelte) or [qwik](https://github.com/QwikDev/qwik) is superior.

In the case of [svelte](https://github.com/sveltejs/svelte) for avoiding vDom.

In the case of [qwik](https://github.com/QwikDev/qwik) for bringing javascript on demand.

Or we can argue that build steps make the frontend workflow too complicated and frameworks like [hyperapp](https://github.com/jorgebucaran/hyperapp) are the solution.

But this is getting away from the central problem with these approaches, which they ALL suffer from.

The problem is that frameworks need to control JavaScript centrally in the elements and/or components that are used.

This implies that the code of a library external to the framework must be rewritten.

See for example the number of existing [Bootstrap](https://getbootstrap.com/) javascript implementations:
 
 - [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)
 - [bootstrap-vue](https://github.com/bootstrap-vue/bootstrap-vue)
 - [ng-bootstrap](https://github.com/ng-bootstrap/ng-bootstrap)
 - [sveltestrap](https://github.com/bestguy/sveltestrap)

These projects exist for the reason that vDom and the implementation of a component library conflict.

If you need a less popular external library and/or use a framework with a smaller community, you will have to reimplement javascript or wait for someone to do it with all the difficulties and bugs involved.

### Why web components are bad?

Libraries like [Shoelace](https://github.com/shoelace-style/shoelace) allow you to use reactive components within these frameworks without having to be reimplemented.

The problem is data exchange, two way data binding needs to be implemented individually for each framework.

Components written in HTML do not have the good parts of these vDom frameworks that allow you to easily pass objects, arrays and functions to them, greatly limiting their capacity and making the API difficult.

### Why I build this project?

I wanted to have components with all the capabilities of javascript frameworks
(passing objects, arrays and functions).

And have a simplified interface to access work done in libraries like [Bootstrap](https://getbootstrap.com/) without having to reimplement javascript.

The fact that using hyperscript allows you to encapsulate the logic of the components in small modules that make the weight of the vDom unnecessary.

I didn't want to have to deal with the complications of build steps.

And I wanted the libraries I used to only be loaded when called (using es6 modules or dynamically adding the script to the page).

And to achieve good SEO, produce an SSR home page with the customization options that exist in the open source world.

I didn't find anything on github or google that went this route, so I created it.

## TODO 🔧

### Bugs 🐞
 - datalist do not work on firefox mobile

### Next release 📋
 - merge tag and alert inside ctrl
 - allow children in docs and examples (ctrl case)
 - code component (html/js) and remove highlight.js from page source
 - footer variants on settings

### Improvements 💡
 - semantic html tests, no string cmp
 - formatter should be a component?
 - allow icon with input to avoid unicode and translation
 - separate input and output options
 - allow to see other tests variants
 - dynamic validation with functions
 - input wrapper review
 - remove or minimize lang support
 - remove non bootstrap options support, minimize options and review settings
 - separate router and data-app as a plugin

### Tests and docs 🧪
 - chart
 - graph
 - render
 - link
 - input
 - form
 - modal
 - table
 - sidebar
 - core router

## Contributing 🤝
It's a very simple project.
Any contribution, any feedback is greatly appreciated.

## Support ⭐
If this project was useful to you, consider giving it a star on github, it's a
way to increase evidence and attract more contributors.

## Acknowledgment 🙏
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

A huge thank you to all the people who contributed to these projects.
