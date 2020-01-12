# futch
Futch is a 0.4kb abstraction of [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) that makes RESTful requests more fun! 

## API

`futch.get(url[, options])` Sends an HTTP `GET` for all resources. Get a specific resource by setting the `id` option. Optionally attach query params by setting `query` in options.

`futch.save(url[, options])` Sends an HTTP `POST` if there is no id. If there is an id, then it'll `PUT`. If id has a different name configure it using the `altId` option.

`futch.delete(url, {id})` Sends an HTTP `DELETE`. You must include the id option.

`url` A string. Do not include the id of the resource; it will be taken from `options`. Ending with or without "/" is okay.

`options` Pass-through to fetch's [init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) arg with a few things to be aware of: 

- `body` is stringified for you.
- `method` is set based on the function used (see above).
- `query` (futch only) Key-value object added non-destructively to the url as a query string. Primarily for `get`, but works with all.
- `id` (futch only) A number or string. If present, will be appended to `url`. Required by `delete` and used by `get` to fetch a single resource rather than all. `save` ignores this and instead looks at `body` for the id (see `altId`). 
- `altId` (futch only) Specify an alternative name for the id property of `body`. Save uses this name or defaults to `body.id`.

**Notes**

Get, save, and delete ultimately call fetch and returns the Promise from `response.json()`. Internally `response.ok` is checked for you and if not ok the Promise is rejected. 

The default values used for [init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) can be seen here: [https://github.com/jfbrennan/futch/blob/master/index.js#L33](https://github.com/jfbrennan/futch/blob/master/futch-0.0.9.js#L33)


**Examples**
```javascript
let url = 'https://jsonplaceholder.typicode.com/todos';

// Fetching all todos
// GET https://jsonplaceholder.typicode.com/todos
futch.get(url)
    .then(data => console.log(data)) 

// Fetching a specific todo
// GET https://jsonplaceholder.typicode.com/todos/1
futch.get(url, {id: '1'})
    .then(data => console.log(data)) 

// Saving a new todo
// POST https://jsonplaceholder.typicode.com/todos
futch.save(url, {body: {title: 'Foo', body: 'Bar'}})
    .then(data => console.log(data)) 

// Saving changes to a todo
// PUT https://jsonplaceholder.typicode.com/todos/1
futch.save(url, {body: {id: '1', title: 'Foo', body: 'Baz'}})
    .then(data => console.log(data)) 

// Saving changes to todo when id is not named "id"
// PUT https://jsonplaceholder.typicode.com/todos/1
futch.save(url, {altId: 'todo_id', body: {todo_id: '1', title: 'Foo', body: 'Baz'}})
    .then(data => console.log(data)) 

// Deleting a todo
// DELETE https://jsonplaceholder.typicode.com/todos/1
futch.delete(url, {id: '1'})
    .then(data => console.log(data)) 

```

## Installation
**CDN**

`https://unpkg.com/futch@0.0.2-alpha/dist/min.js`

Note that futch makes use of [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL), and [URLSearchParams.append](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/append), so you may need to polyfill. 

**NPM** 

`npm install futch`

Note that futch makes use of fetch, which needs to be installed for Node. The [node-fetch](https://www.npmjs.com/package/node-fetch) module is recommended.

## Credits
Fetch is a low level API, so it gets ugly when used directly. I took some inspiration from [Backbone](http://backbonejs.org) which imo is one of the most developer-friendly libraries ever. It's still the best when working with lots of a RESTful APIs, so futch attempts to give you some of that goodness. 
