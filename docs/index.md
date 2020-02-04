---
title: Our first official release is out!!
date: '2019-11-30'
spoiler: Today I’m thrilled to announce the first official release of nodevader
tags: nodevader, nodejs, boilerplate
---

Today I’m thrilled to announce the first official release of [nodevader](https://github.com/stanleygomes/nodevader/releases/tag/v1.0.0), a nodeJS boilerplate to get your backend API started in few minutes.

If you’re already a user of express framework, will be at home.

![nodevader](https://i.imgur.com/z9qKPnW.png)
Icon by [Filipe Carvalho](https://dribbble.com/creativeflip)

# Why nodevader

Nodevader boilerplate helps developers to increase productivity and reduce time to get things done thanks to it's minimalist concept.
The main goal here is to define patterns for basic concepts for an uncoupled backend API and good practices for development.

# Reasons to use it

It's based on [express framework](https://expressjs.com) 4.x, witch is the most nodejs framework used in this galaxy. It works on node version v10.x.

Now take a look at the main features we have for now:

- NPM as the package manager. Take a look [here](https://medium.com/@vincentnewkirk/npm-vs-yarn-2019-e88757b17038)
- [Express framework](https://expressjs.com) as the core
- Serving with [Nodemon](https://www.npmjs.com/package/nodemon) or [PM2](https://pm2.keymetrics.io)
- Eslint [Standard JS](https://standardjs.com) pattern for code standards
- [Knex](http://knexjs.org) query builder and some utils methods on utils/database.js (mysql and postgres support)
- Run migrations using docker-compose using [boxfuse/flyway](https://hub.docker.com/r/boxfuse/flyway) image
- [Mustache](https://mustache.github.io) template transpiler
- [i18n](https://www.npmjs.com/package/i18n) take a look
- [Moment](https://momentjs.com) for date and time
- [Mocha](https://mochajs.org) & [Chai](https://www.chaijs.com) for testing
- [Winston](https://www.npmjs.com/package/winston) for logs
- [Axios](https://github.com/axios/axios) Http Request
- [JWT](https://www.npmjs.com/package/jwt) standard for Authentication
- Firebase [Storage](https://www.npmjs.com/package/@google-cloud/storage) bucket and [Firestore](https://www.npmjs.com/package/firebase-admin) database
- Send emails using SMTP lib [Nodemailer](https://www.npmjs.com/package/nodemailer) and html templates with mustache
- Express config with [Cors](https://www.npmjs.com/package/cors) enabled, [cookie](https://www.npmjs.com/package/cookie-parser) and [body](https://www.npmjs.com/package/body-parser) parser, [helmet](https://www.npmjs.com/package/helmet) headers
- Docker-compose and dockerfile attached running migrations e starting database and nodejs

# Deeper look at some features

Let's get deep into some examples of use.

## Serving the app

You may serve for

```bash
# development (Nodemon)
npm run dev
```

or

```bash
# production (PM2)
npm run prd
```

## Config and enviroment

Main configurations of the app are defined on `src/config/index.js` file. Some config are using [dotenv](https://www.npmjs.com/package/dotenv) package witch get config from .env file on app's root.

There's a .env.example in app's root with config samples. You can rename it to .env to get started.

Good practice: Keep app's config (used in any ambient) centered in this file and enviroment variables in `.env` file.

```javascript
const appConfig = {
  server: {
    port: process.env.HTTP_PORT || 3000
  },
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  },
  template: {
    showCompiled: true,

  ...
```

## Style guide

JavaScript style guide, linter, and formatter from [Standard JS](https://standardjs.com). Consistent code. Catch style issues & programmer errors early.

ES lint config is defined in `/.eslintrc.json` file.

## Express config

There's some pre-defined config for express to make it more complete. We have cors enabled, cookie and body parser and helmet headers.

## Template transpiler

If you need a template transpiler, use [Mustache](https://mustache.github.io).
We have some utilities to make it easier to deal with templates. Take a look:

```javascript
const mustacheUtils = require('./utils/mustache')
const params = {
  id: 1
}

mustacheUtils.getTemplateSQL(dir + filename, params).then(query => {
  console.log(query)
}).catch(error => reject(error))
```

And a template sample:

```sql
select
  id,
  name
from
  user
where
  1 = 1
  {{#id}}
  and id = :id
  {{/id}}
```

## Internacionalization

Use this [i18n](https://www.npmjs.com/package/i18n) package to deal with internacionalization.
Take a look at the use case with the utility we build on top of i18n:

```javascript
const i18nUtils = require('./utils/i18n')

console.log(i18nUtils.translate('Hello'))
```

You can find the json definitions in `src/config/i18n-locales/` folder. There you have files for each language.

```json
{
  "Hello": "Hello World!",
  "system_error": "Hillston, we have a problem.",
  ...
}
```

## Logs

For better logging, use [Winston](https://www.npmjs.com/package/winston) package. And... here you have a sample from our utility.

```javascript
const loggerUtils = require('./utils/logger')

loggerUtils.error('Error!!')
loggerUtils.info('Error!!')
```

Logs will be written in `/logs` on root folder of repository.

## Http requests

For better support and performance, we recommend to use [Axios](https://github.com/axios/axios) package for Http Request.

```javascript
const loggerUtils = require('./utils/httpRequest')

const params = {
  url: 'https://i.imgur.com/lljnHdR.mp4'
}

// do a request
httpRequestUtils.get(params).then((response) => {
  console.log(response)
}).catch((error) => console.log(error))
```

## Authentication and Authorization

We choose [JWT](https://www.npmjs.com/package/jwt) package to secure our application by default.

To get started, you'll need to add a privateKey to your `/src/config/index.js` file. Then you 

To manage authenticated routes, go to `/src/routes/index.js` file witch contains authMiddleware file.

JWT methods are implemented at `/src/utils/jwt.js` file.

Before using it, you have to create a method to login your user so you can finally use generate token.

```javascript
const jwtUtil = require('./utils/jwt')

// create your custom `login` method
login().then(userData => {
  // return user data you want to store inside token
  jwtUtil.generateAuthToken(userData).then(responseToken => {
    // here you get user token
    console.log(responseToken)
  }).catch(error => console.log(error))
})
```

## Database

We're using [Knex](http://knexjs.org) package to manage database connectors and be our database persistence layer. It has query builder built in and we wrote some utilities on `utils/database.js`.

These utilities have support for `mysql` and `postgres` at this time. You can extend support via knex to oracle, sqlite and other.

Here some methods implemented over the builder.

```javascript
const databaseUtils = require('./utils/database')
const params = {
  id: 2
}

// executing a query
// from a file located in [src/templates/sql]
// transpiled by mustache
databaseUtils.namedQuery('getUser', params).then(response => {
  console.log(response)
}).catch(err => console.log(err))

const fields = {
  name: 'Fulano de tal',
  email: 'fulano@detal.com'
}

const fields = [
  'name',
  'email'
]

// insert data into a table
databaseUtils.basicInsert('user', data, fields).then(response => {
  console.log(response)
}).catch(err => console.log(res, err))
```

## Database migrations runner

You can run migrations using docker-compose. We have [boxfuse/flyway](https://hub.docker.com/r/boxfuse/flyway) image configured.

Once you start the containers, flyway container will look for migrations folder and run migrations.

```bash
# get containers up
docker-compose up
```

Migrations file are stored at `/docker/migrations` folder.

## Firebase utils

In addiction to demonstrate a sample of good practices implementing a utilities module and deal with a NoSQL database and CDN file storage, we built this firebase module based in firebase [Storage](https://www.npmjs.com/package/@google-cloud/storage) bucket and [Firestore](https://www.npmjs.com/package/firebase-admin) database packages.

Take a look at these two use cases bellow:

```javascript
const firebaseUtils = require('./utils/firebase')
const fileUtils = require('./utils/file')

const collection = 'myFirstCollection'
const data = {
  message: 'Hello World!!'
}
const document = 'myDocument'

// create or update a document from a collection
firebaseUtils.createOrUpdateDocument(collection, data, document).then((response) => {
  console.log(response)
}).catch((error) => console.log(error))

// upload a file
sampleRest.get('/upload', fileUtils.multer.single('file'), (req, res) => {
  const file = req.file
  if (file) {
    firebaseUtils.uploadFile(file).then((urlFile) => {
      console.log(urlFile)
    }).catch((error) => console.log(error))
  }
})
```

## Email

Send emails easily using SMTP package [Nodemailer](https://www.npmjs.com/package/nodemailer) and html templates with mustache.

Take a look at this sample using our utility.

```javascript
const smtpUtils = require('./utils/smtp')
const emailData = {
  to: ['friend1@nodevader.com', 'friend2@nodevader.com'],
  subject: 'Hello ✔✔✔',
  template: 'helloWorld', // this file is located on [src/templates/smtp] folder
  templateContainer: 'container',
  params: {
    name: 'Fulano'
  }
}

smtpUtils.sendMail(emailData).then((response) => {
  console.log(response)
}).catch((error) => {
  console.log(error)
})
```

## Utity tests

It's a good practice to have unity tests of your app. We choose [Mocha](https://mochajs.org) & [Chai](https://www.chaijs.com) for our testing universe.

We need to have some sample cases described in repository. Theres an [issue](https://github.com/stanleygomes/nodevader/issues/42) open with a list of good samples to do. Feel free to contribute.

Take a look how is that easy to implement a unity test using chai:

```javascript
const chai = require('chai')
const someService = require('../api/someService/service')

const expect = chai.expect

describe('Some service tests', () => {
  it('Should return a list of one single item', () => {
    expect(someService.getData).to.have.lengthOf(1)
  })
})
```

## There's one more thing

Feel free to [fork](https://github.com/stanleygomes/nodevader) or [contribute](https://github.com/stanleygomes/nodevader) to nodevader!! You're very welcome! There's some [issues](https://github.com/stanleygomes/nodevader/issues) to run in backlog and you can always [open](https://github.com/stanleygomes/nodevader/issues/new/choose) new ones.

We'll keep you updated of new releases.

Thanks for reading!

Nodevader team.
