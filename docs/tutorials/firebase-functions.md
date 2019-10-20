## Deploy to firebase functions

### Install firebase CLI

First, install the Firebase CLI if you don't have it.

```
npm install -g firebase-tools
```

Then, run, login to your firebase account and init a project, right after choose option `functions` and connect it to your project

```
firebase login
firebase init
```

Now, you have a folder called functions. 

Yes, delete it.

```
rm -rf functions
```

Go to the `firebase.json` file and add the `source` property to functions, pointing to current directory:

```json
{
  "functions": {
    "source": ".",
    ...
  }
```

Now install dependencies for firebase

```
npm install --save firebase-admin
npm install --save firebase-functions
npm install --save-dev firebase-functions-test
```

and, add the required engine property to your `package.json` file

```json
  {
    ...
    "engines": {
      "node": "8"
    }
  }
```

We're almost there. Go to your `src/index.js` file, remove app.listen(...)

```javascript

// app.listen(...)

```

And the last step. Add functions dependency and export the function.

```javascript
const functions = require('firebase-functions')

// your code here ...

const api = functions.https.onRequest(app)

module.exports = {
  api
}

```

Now you can deploy your function to firebase

```
firebase deploy
```

Ps.: you may have to fix some lint problems before deploy actualy works. Don't give up.

You can always use the firebase.yml configuration (located in `.github/workflows` folder) to deploy your app to firebase, using github actions.

Thanks and Good luck.
