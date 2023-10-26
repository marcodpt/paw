# App
A dashboard application 

## Contract
 - The index.html file will be the only html file (as it is a SPA) and it must
be SSR, SEO optimized and functional before the javascript loads.
 - The only javascript loaded on page load is the application core (as minimal
as possible). Everything else should be imported dynamically to keep the page
loading as quickly as possible.
 - All application views must be written in HTML (to be easy to understand and
modify without messing with JavaScript) and be located in template tags in the
index.html file.
 - It is not allowed to use inline style in the index.html file (nor in
templates). All styling must come from a set of classes (as minimal as
possible) defined for the application, thus maintaining consistency in the
layout.
 - The application's views are accessed by routing the page's hash, and any
change in the page's state must result in a different hash to be able to share
links with a well-defined state.
 - It must be possible, without touching the core of the application, to add
new routes and functionalities respecting the defined principles and without
having to use any type of build tools.
