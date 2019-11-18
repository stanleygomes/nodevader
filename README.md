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

- NPM or Yarn? npm
- Node version: v10.x
- Linter: eslint standard pattern
- Migrations: Run on a container described in docker-compose file
- Node Framework: Express
- SQL Files decoder: Mustache
- i18n: we have
- Node server: Nodemon and PM2
- Date and time: moment
- Test: Mocha & chai
- Dates: use Moment.js
- Logs: use Winston
- Http Request: use Axios
- Authentication: JWT
- Express: Cors enabled, cookie and body parser, helmet headers
- Docker compose and dockerfile attached running migrations e starting database and nodejs

## Project structure

Basic folder structure

- **src/api**: Endpoints and business logic
- **src/assets**: Images, styles, fonts and others
- **src/middlewares**: Middlewares in routes
- **src/routes**: Routes, :]
- **src/sql**: SQL files using mustache definitions
- **src/test**: Mocha and chai unity tests
- **src/utils**: Utilities, constants, assets, configurations, i18n and others
