## How to log to a file

In this tutorial, i'll show you how to log your app, using npm `winston` package.

First, go to where you want log and add logger utility file

```javascript
const logger = require('./utils/logger')
```

Then all you have to do now is... log

```javascript
// logging an error
logger.error('Erro!!')

// logging an info
logger.info('Info!!')
```

You can find more in `winston` docs, [right here](https://www.npmjs.com/package/winston).

And... that's all.
