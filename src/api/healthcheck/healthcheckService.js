const databaseDumpUtil = require('../../utils/databaseDump')
const smptUtil = require('../../utils/smtp')
const crudBasic = require('../crudBasic/crudBasicService')
const i18nUtil = require('../../utils/i18n')
const moment = require('moment')

const httpStatus = () => {
  return new Promise((resolve, reject) => {
    resolve('ok')
  })
}

const databaseStatus = (req, res) => {
  return new Promise((resolve, reject) => {
    crudBasic.get(req, res, 'getDatabaseStatus').then(response => {
      resolve('ok')
    }).catch(error => {
      reject(error)
    })
  })
}

const databaseDump = (req, res) => {
  return new Promise((resolve, reject) => {
    databaseDumpUtil.dump(req, res, 'getDatabaseStatus').then(response => {
      resolve('ok')
    }).catch(error => {
      console.log(error)

      const emailTo = process.env.APP_ADMIN_EMAIL
      const errorMessage = i18nUtil.translate('error_database_dump')
      const params = {
        date: moment().format('YYYY-MM-DD HH:mm:ss'),
        error: error
      }

      smptUtil.sendMail(emailTo, errorMessage, 'statusDatabaseDump', params).then(() => {
        reject(error)
      }).catch(error => reject(error))
    })
  })
}

module.exports = {
  httpStatus,
  databaseStatus,
  databaseDump
}
