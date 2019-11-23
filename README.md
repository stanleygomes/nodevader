# Nodetello

A Teenage Mutant Node Boilerplate

The main goal of **Nodetello** is to set patterns to be easily implemented on Nodejs projects. We want to make easy to quick start a Nodejs ambient with the basic resources every project could have. Check out the patterns we defined this document bellow.

*It was inspired by [Juggernaut](https://github.com/SoftboxLab/juggernaut)*.

<p  align="center" style="background:#fbd38b;padding:15px 0;color:#333">
	<img src="https://i.imgur.com/hATGQ6Q.gif" width="400px" />
  <br />
  Gif by <a href="https://dribbble.com/Reuno" target="_blank">Reuno</a>
</p>

## Startup

Step by step to get this up and running

### Clone repo and go to project folder

```
git clone https://github.com/stanleygomes/nodetello.git && cd nodetello
```

### Install dependencies

```bash
npm install
```

### Start server

Via express server

```bash
npm run dev
```

Via docker-compose (start database, run migrations and start server)

```bash
docker-compose up
```

To test it on the browser, simply go to: `http://localhost:3000/helloWorld`

## Git flow

To file a new a feature

- create a branch from `master` branch. Use the pattern: `feature/description`
- file a pull request on `master` branch
- since your PR is aproved, it will be merged to `master` branch
- in a moment in time we'll create a release, using the pattern: `release/vX.X.X`

## Patterns

These are some of patterns definitions to help us to keep a default arquitecture.

- Package manager: [npm](https://medium.com/@vincentnewkirk/npm-vs-yarn-2019-e88757b17038), sure
- Node version: [v10.x](https://nodejs.org/ca/blog/release/v10.16.3)
- Node Framework: [Express](https://expressjs.com) framework
- Node server: [Nodemon](https://www.npmjs.com/package/nodemon) and [PM2](https://pm2.keymetrics.io/)
- Linter: eslint [standard](https://standardjs.com) pattern
- Migrations: Run on a container described in docker-compose file: [boxfuse/flyway](https://hub.docker.com/r/boxfuse/flyway/dockerfile) image
- Template transpiler: [Mustache](https://mustache.github.io) templates
- i18n: take a look [here](https://www.npmjs.com/package/i18n)
- Date and time: [moment](https://momentjs.com)
- Test: [Mocha](https://mochajs.org) & [Chai](https://www.chaijs.com)
- Logs: use [Winston](https://www.npmjs.com/package/winston)
- Http Request: use [Axios](https://github.com/axios/axios)
- Authentication: [JWT](https://www.npmjs.com/package/jwt)
- Firebase: [Storage](https://www.npmjs.com/package/@google-cloud/storage) bucket and [Firestore](https://www.npmjs.com/package/firebase-admin) database
- Express: [Cors](https://www.npmjs.com/package/cors) enabled, [cookie](https://www.npmjs.com/package/cookie-parser) and [body](https://www.npmjs.com/package/body-parser) parser, [helmet](https://www.npmjs.com/package/helmet) headers
- Docker compose and dockerfile attached running migrations e starting database and nodejs

## Project structure

Basic folder structure

- **src/config**: App config (some of these are inherited from .env file), constants, configuration and i18n
- **src/api**: Endpoints and business logic
- **src/static**: Images, styles, fonts and other files that can be served
- **src/middlewares**: Middlewares for routes
- **src/routes**: Routes, :]
- **src/templates**: mustache interpreted files
- **src/test**: Mocha and chai unity tests
- **src/utils**: Utilities and modules superior layer implementations
