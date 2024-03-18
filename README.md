# App
A dashboard application 

## Contract
 - The index.html file will be the only html file (as it is a SPA) and it must
be SSR, SEO optimized and functional before the javascript loads.
 - The only javascript loaded on page load is the application core (as minimal
as possible). Everything else should be imported dynamically to keep the page
loading as quickly as possible.
 - Every core functionality should be defined as a component, accessible for
re usage when defining new routes.
 - The application's views are accessed by routing the page's hash, and any
change in the page's state must result in a different hash to be able to share
links with a well-defined state.
 - It must be possible, without touching the core of the application, to add
new routes and functionalities respecting the defined principles and without
having to use any type of build tools.

## Implementation
The objectives defined contractually are ambitious and it will be necessary to
evolve the technologies involved along with the development of the application.

To start development, it will be necessary to make non-optimal choices that may
eventually be replaced in the future.

 - [Bootstrap](https://github.com/twbs/bootstrap): Despite bringing extra
javascript and not being exactly minimal, it manages to preserve good
consistency between sites, and is extremely tested and has features that will
speed up development, in addition to being easily customized using projects
like [Bootswatch](https://github.com/thomaspark/bootswatch).
 - [Font-Awesome](https://github.com/FortAwesome/Font-Awesome): The most
popular icon library, essential for creating intuitive user interfaces.
 - [JSON Schema](https://github.com/json-schema-org/json-schema-spec): A level
of abstraction to bring user-defined tables and forms to the application with
minimum effort and maximum customization.

## TODO
 - documentation
 - find a way to pass checkbox to global links

## Contributing
It's a very simple project.
Any contribution, any feedback is greatly appreciated.
