# futch
`fetch`, but only for RESTful APIs serving JSON.

## API
It's really simple. Get the base url:
```
const url = 'https://jsonplaceholder.typicode.com/todos';
```
Now send requests:

`get` sends an HTTP "GET". Optionally attach query params by setting `params` in `options`.


`save` sends an HTTP "POST" if there is no id. If there is, then it'll send a "PUT". If the id has a different name, just say what it is by setting the `idAttribute` in `options`.

`delete` sends an HTTP "DELETE".

Examples:
```
futch.get(url).then(json => console.log(json)); => GET https://jsonplaceholder.typicode.com/todos
futch.get(url, {id: '1'}).then(json => console.log(json)); => GET https://jsonplaceholder.typicode.com/todos/1

futch.save(url, {body: {title: 'Foo', body: 'Bar'}}).then(json => console.log(json)); => POST https://jsonplaceholder.typicode.com/todos

futch.save(url, {body: {userId: 1, title: 'Foo', body: 'Baz'}, idAttribute: 'userId'}).then(json => console.log(json)); => PUT https://jsonplaceholder.typicode.com/todos/1

futch.delete(url, {id: '1'}).then(json => console.log(json)); => DELETE https://jsonplaceholder.typicode.com/todos/1

```

