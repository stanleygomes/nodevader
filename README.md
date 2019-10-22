# Nodetello

A Teenage Mutant Node Boilerplate

The main goal of **Nodetello** is to set patterns to be easily implemented on Nodejs projects. *It was inspired by [Juggernaut](https://github.com/SoftboxLab/juggernaut)*.

<p align="center">
	<img src="src/assets/images/nodetello.gif" width="400px" />
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

## Patterns

These are some of patterns definitions to help us to keep a default arquitecture.

- NPM or Yarn? `npm`
- Node version: v10.x
- Linter: If You don't use [Gandalf Lint Node](https://github.com/SoftboxLab/gandalf-lint-node), you shall not pass
- Persistence module: mysql, *for a while*
- Migrations: Run on a container described in docker-compose file
- Node Framework: Express
- SQL Files decoder: Mustache
- i18n: we have
- Node servers: Nodemon (dev), PM2 (prd)
- Test: Mocha & chai
- Dates: use Moment.js
- Docker compose and dockerfile attached running migrations e starting database and nodejs

### Project structure

- **src/api**: Endpoints and business logic
- **src/assets**: Images, styles, fonts and others
- **src/middlewares**: Middlewares in routes
- **src/routes**: Routes, :]
- **src/sql**: SQL files using mustache definitions
- **src/test**: Mocha and chai unity tests
- **src/utils**: Utilities, constants, assets, configurations, i18n and others
