# futch
`fetch`, but only for RESTful APIs serving JSON.

## API

`get(url[, options])` sends an HTTP "GET". Optionally attach query params by setting `params` in `options`.

`save(url[, options])` sends an HTTP "POST" if there is no id. If there is, then it'll send a "PUT". If the id has a different name, just say what it is by setting the `idAttribute` in `options`.

`delete(url, {id})` sends an HTTP "DELETE".

All functions ultimately call fetch and return a Promise with the value of `response.json()`. Internally `response.ok` is checked and if it's not, then the Promise is rejected. 

`options` is a pass-through to fetch's [init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) with a few things to be aware of: 

- `body` will be stringified for you
- `method` will be overridden based on what's documented above
- `params` is part of futch. This will be turned into a query string for you.
- `idAttribute` is also part of futch. This is used to find the id of the object you're saving.
- `id` if present, will be appended to the url. It's required by `delete`, used by `get` to fetch a single resource rather than all, and will turn a "POST" to a "PUT" when saving. 

**Examples**
```
let url = 'https://jsonplaceholder.typicode.com/todos';

// Fetching
futch.get(url).then(json => console.log(json)); => GET https://jsonplaceholder.typicode.com/todos
futch.get(url, {id: '1'}).then(json => console.log(json)); => GET https://jsonplaceholder.typicode.com/todos/1

// Saving
futch.save(url, {body: {title: 'Foo', body: 'Bar'}}).then(json => console.log(json)); => POST https://jsonplaceholder.typicode.com/todos

futch.save(url, {body: {userId: 1, title: 'Foo', body: 'Baz'}, idAttribute: 'userId'}).then(json => console.log(json)); => PUT https://jsonplaceholder.typicode.com/todos/1

// Deleting
futch.delete(url, {id: '1'}).then(json => console.log(json)); => DELETE https://jsonplaceholder.typicode.com/todos/1

```

## Installation
Just copy the 28 lines of source code and do whatever you need to do. It is ES6, so you'll probably want to transpile and it makes use of `fetch`, `Promise`, `URL`, and `URL#searchParams`, so you may want to polyfill.
