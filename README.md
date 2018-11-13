# futch
Futch is `fetch` for talking to RESTful services. Futch has a more meaninful API, handles all the JSON stuff, sets sensible defaults, and just makes ajax great again. It's only 0.4kb when min+gzipped. 

## API

`get(url[, options])` - sends an HTTP "GET". Optionally attach query params by setting `params` in options.

`save(url[, options])` - sends an HTTP "POST" if there is no id. If there is, then it'll send a "PUT". If the id has a different name, just say what it is by setting the `idAttribute` in options.

`delete(url, {id})` - sends an HTTP "DELETE". You must specify an id in options.

`url` - a string. Do not include the id of the resource in the url; it will be taken from options.

`options` - pass-through to fetch's [init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) with a few things to be aware of: 

- `body` will be stringified for you
- `method` will be set based on what's documented above
- `params` (unique to futch) an object. Will be added as a query string. Primarily for `get`, but works with all.
- `idAttribute` (unique to futch) a string. Used by save to get the id of the object you're saving in case it's not called "id".
- `id` (unique to futch) a number or string. If present, will be appended to the url. It's required by delete and used by get to fetch a single resource rather than all. Save ignores this and instead looks in `options.body` for an id. 

**Notes**

Get, save, and delete ultimately call fetch and return a Promise with the value of `response.json()`. Internally `response.ok` is checked and if it's not ok, then the Promise is rejected. 

The default values used for [init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#Parameters) can be seen here: https://github.com/jfbrennan/futch/blob/master/futch.js#L30


**Examples**
```javascript
let url = 'https://jsonplaceholder.typicode.com/todos';

// Fetching all todos
futch.get(url)
    .then(json => console.log(json)) // GET https://jsonplaceholder.typicode.com/todos

// Fetching a todo
futch.get(url, {id: '1'})
    .then(json => console.log(json)) // GET https://jsonplaceholder.typicode.com/todos/1

// Saving a new todo
futch.save(url, {body: {title: 'Foo', body: 'Bar'}})
    .then(json => console.log(json)) // POST https://jsonplaceholder.typicode.com/todos

// Saving changes to a todo
futch.save(url, {body: {id: '1', title: 'Foo', body: 'Baz'}})
    .then(json => console.log(json)) // PUT https://jsonplaceholder.typicode.com/todos/1

// Deleting a todo
futch.delete(url, {id: '1'})
    .then(json => console.log(json)) // DELETE https://jsonplaceholder.typicode.com/todos/1

```

## Installation
In the spirit of the web, just [copy futch.js](https://raw.githubusercontent.com/jfbrennan/futch/master/futch.js) and do whatever you need to do. Source code is in ES6, so you'll probably want to transpile it. Also makes use of [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL), and [URLSearchParams.append](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/append), so you may want to polyfill. 

Minified CDN version is coming. NPM version is meh. 

## Credits
Fetch is a low level API, so it's an ugly experience if used directly. I took some inspiration from [Backbone](http://backbonejs.org) which imo is one of the most developer-friendly libraries ever. It's still the best when working with a RESTful API, so futch attempts to give you some of that goodness. 
