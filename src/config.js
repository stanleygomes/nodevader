const config = {
  development: {
    database: {
      host: 'localhost',
      port: 3306,
      database: 'nodetello',
      user: 'nodetello',
      password: 'nodetello',
      max: 15
    }
  },
  production: {
    database: {
      host: localhost,
      port: 41890,
      database: 'nodetello',
      user: 'nodetello',
      password: 'nodetello',
      max: 15
    }
  },
  server: {
    port: 3000
  },
  showQuery: true,
  sqlDir: './src/sql/',
  baseEndpoint: '/',
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  },
  i18n: {
    locales: [
      'pt-BR',
      'en'
    ],
    defaultLocale: 'pt-BR',
    directory: './src/utils/locales',
    autoReload: true
  }
}

module.exports = {
  config
}
