# RETCHful
RETCHful is three simple functions that make doing RESTful calls more reliable and enjoyable than using `fetch` directly. It works on both client and server. 

## API

`retch.get(url[, options])` Sends an HTTP `GET` for all resources. Get a specific resource by setting the `id` option. Optionally attach query params by setting `query` in options.

`retch.save(url[, options])` Sends an HTTP `POST` if there is no id. If there is an id, then it'll `PUT`. If id has a different name configure it using the `altId` option.

`retch.delete(url, {id})` Sends an HTTP `DELETE`. You must include the id option.

`url` A string. Do not include the id of the resource; it will be taken from `options`. Ending with or without "/" is okay.

`options` Pass-through to fetch's [init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) arg with a few things to be aware of: 

- `body` is stringified for you.
- `method` is set based on the function used (see above).
- `query` (RETCHful only) Key-value object added non-destructively to `url` as a query string. Primarily for `get`, but works with all.
- `id` (RETCHful only) A number or string. If present, will be appended to `url`. Required by `delete` and used by `get` to fetch a single resource rather than all. `save` ignores this and instead looks at `body` for the id of the resource (see `altId` for more info). 
- `altId` (RETCHful only) Specify an alternative name for the id property of `body`. Save uses this name or defaults to `body.id`.

**Notes**

The get, save, and delete functions ultimately call fetch and return the Promise from `response.json()`. Internally `response.ok` is checked for you and if not ok the Promise is rejected. Also, the default values used for [init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) can be seen here: [https://github.com/jfbrennan/retch/blob/master/index.js#L34](https://github.com/jfbrennan/retch/blob/master/index.js#L34)


**Examples**
```javascript
// Require it server-side or use the `retch` global in the browser
const retch = require('retchful');

// Todos endpoint
const url = 'https://jsonplaceholder.typicode.com/todos';

// Fetch all todos
// GET https://jsonplaceholder.typicode.com/todos
retch.get(url)
    .then(data => console.log(data)) 

// Fetch todos with query params
// GET https://jsonplaceholder.typicode.com/todos?completed=false
retch.get(url, {query: {completed: false}})
    .then(data => console.log(data)) 

// Fetch a specific todo
// GET https://jsonplaceholder.typicode.com/todos/1
retch.get(url, {id: '1'})
    .then(data => console.log(data)) 

// Save a new todo
// POST https://jsonplaceholder.typicode.com/todos
retch.save(url, {body: {title: 'Foo', body: 'Bar'}})
    .then(data => console.log(data)) 

// Save changes to an existing todo
// PUT https://jsonplaceholder.typicode.com/todos/1
retch.save(url, {body: {id: '1', title: 'Foo', body: 'Baz'}})
    .then(data => console.log(data)) 

// Save changes to todo when id is not named "id"
// PUT https://jsonplaceholder.typicode.com/todos/1
retch.save(url, {altId: 'todo_id', body: {todo_id: '1', title: 'Foo', body: 'Baz'}})
    .then(data => console.log(data)) 

// Delete a todo
// DELETE https://jsonplaceholder.typicode.com/todos/1
retch.delete(url, {id: '1'})
    .then(data => console.log(data)) 

```

## Installation
**CDN**

`https://unpkg.com/retchful@1.0.0-beta/dist/min.js`

Then just use the global `retch.get|save|delete` functions. Too easy. 

Note that RETCHful makes use of [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL), and [URLSearchParams.append](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/append), so you may need to polyfill for older browsers. The excellent [polyfill.io](https://polyfill.io/v3/) service is a really smart way to go. 

**NPM** 

`npm install retchful`
`const retch = require('retchful')`

Note that retch makes use of fetch, which needs to be installed for Node. The [node-fetch](https://www.npmjs.com/package/node-fetch) module is recommended.

## Credits
Fetch is a low level API, so it gets ugly when used directly. I took some inspiration from [Backbone](http://backbonejs.org) which imo is one of the most developer-friendly libraries ever. It's still the best when working with lots of a RESTful APIs, so retch attempts to give you some of that goodness. 
