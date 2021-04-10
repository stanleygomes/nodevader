const path = require('path')
const Postgrator = require('postgrator')
const dotenv = require('dotenv')
dotenv.config()

const postgrator = new Postgrator({
  migrationDirectory: path.join(__dirname, 'migrations/'),
  // Driver: must be pg, mysql, mysql2 or mssql
  driver: process.env.DB_CLIENT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  schemaTable: 'schema_version'
})

postgrator
  .migrate()
  .then((appliedMigrations) => {
    console.log('@ Migrations applied successfully.')

    if (appliedMigrations.length > 0) {
      console.log(appliedMigrations)
    }
  })
  .catch((error) => console.log(error))
