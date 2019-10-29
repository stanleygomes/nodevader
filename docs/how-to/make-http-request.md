## How to make a HTTP request

In this tutorial, we'll make a HTTP request to a URL from our backend.

First of all, let's install `axios`

```
npm install --save axios
```

Now, we'll import our util file

```javascript
const httpRequest = require('./utils/httpRequest')
```

Now, just go ahead

```javascript
const params = {
  url: 'http://other-server.com/api/v1/test'
}

httpRequest.post(params).then((response) => {
  console.log('OK')
}).catch((error) => {
  console.log('error')
})
```

You can find more in `axios` docs, [right here](https://www.npmjs.com/package/axios).

That's it for today!
