# futch
Futch is a [fetch](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) client for RESTful services. Futch offers a more meaningful API, adds a couple goodies, handles all the gotchas and JSON stuff, sets sensible defaults, and is _less than_ half a kb.

## API

`futch.get(url[, options])` Sends an HTTP "GET" for all resources. Get a specific resource by setting the `id` option. Optionally attach query params by setting `params` in options.

`futch.save(url[, options])` Sends an HTTP "POST" if there is no id. If there is an id, then it'll "PUT". If id has a different name, configure that using the `idAttribute` option.

`futch.delete(url, {id})` Sends an HTTP "DELETE". You must include the id option.

`url` A string. Do not include the id of the resource; it will be taken from options. Ending with or without `/` is okay.

`options` Pass-through to fetch's [init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) with a few things to be aware of: 

- `body` is stringified for you.
- `method` is set based on what's documented above.
- `params` (futch only) Key-value object. Added non-destructively as a query string. Primarily for `get`, but works with all.
- `idAttribute` (futch only) A string. Used by save to get id from `body` in case it's not called "id".
- `id` (futch only) A number or string. If present, will be appended to the url. Required by delete and used by get to fetch a single resource rather than all. Save ignores this and instead looks in `options.body` for the id. 

**Notes**

Get, save, and delete ultimately call fetch and returns the Promise from `response.json()`. Internally `response.ok` is checked for you and if not ok the Promise is rejected. 

The default values used for [init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) can be seen here: [https://github.com/jfbrennan/futch/blob/master/futch-0.0.9.js#L33](https://github.com/jfbrennan/futch/blob/master/futch-0.0.9.js#L33)


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
futch.save(url, {idAttribute: 'todo_id', body: {todo_id: '1', title: 'Foo', body: 'Baz'}})
    .then(data => console.log(data)) 

// Deleting a todo
// DELETE https://jsonplaceholder.typicode.com/todos/1
futch.delete(url, {id: '1'})
    .then(data => console.log(data)) 

```

## Installation
**CDN**

[https://cdn.jsdelivr.net/gh/jfbrennan/futch@master/futch-0.0.9.js](https://cdn.jsdelivr.net/gh/jfbrennan/futch@master/futch-0.0.9.js)

Transpiled minified CDN version is coming. 

Note that source code is in ES6, so you'll probably want to transpile it. Also makes use of [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL), and [URLSearchParams.append](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/append), so you may want to polyfill. 

**NPM** 

Not interested, but contributions would be considered.

## Credits
Fetch is a low level API, so it gets ugly when used directly. I took some inspiration from [Backbone](http://backbonejs.org) which imo is one of the most developer-friendly libraries ever. It's still the best when working with a RESTful API, so futch attempts to give you some of that goodness. 
