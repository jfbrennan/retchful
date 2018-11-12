# futch
`fetch`, but only for RESTful APIs serving JSON.

## API
It's really simple.

**get** `get(url[, options])` sends an HTTP "GET". Optionally attach query params by setting `params` in `options`.


**save** `save(url[, options])` sends an HTTP "POST" if there is no id. If there is, then it'll send a "PUT". If the id has a different name, just say what it is by setting the `idAttribute` in `options`.

**delete** `delete(url[, options])` sends an HTTP "DELETE".

All functions ultimately call `fetch` and return a Promise with the result of `response.json()`. Internally `response.ok` is checked first, and if its not, then the Promise is rejected. 

Examples:
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

