const databaseUtil = require('../../utils/database')
const validatorUtil = require('../../utils/validator')
const i18nUtil = require('../../utils/i18n')
const dateFns = require('date-fns')

const get = (req, res, sqlQuery) => {
  return new Promise((resolve, reject) => {
    const params = Object.assign({}, req.body)

    databaseUtil.namedQuery(sqlQuery, params).then(response => {
      if (response == null) {
        resolve({
          status: 'error',
          message: i18nUtil.translate('record_not_found')
        })
      }

      resolve(response)
    }).catch(error => reject(error))
  })
}

const create = (req, res, model) => {
  return new Promise((resolve, reject) => {
    const userLogged = req.user
    const schema = model.validations.createUpdate
    const validate = validatorUtil.validate(schema, req.body)

    if (validate.error === true) {
      resolve({
        status: 'error',
        message: validate.messages != null && validate.messages.length > 0 ? validate.messages[0] : null
      })
    } else {
      const fields = req.body
      fields.created_by = userLogged && userLogged.id

      databaseUtil.basicInsert(model.table, fields).then(res => {
        resolve({
          status: 'ok',
          message: i18nUtil.translate('record_created'),
          id: res
        })
      }).catch(error => reject(error))
    }
  })
}

const update = (req, res, model) => {
  return new Promise((resolve, reject) => {
    const schema = model.validations.createUpdate
    const validate = validatorUtil.validate(schema, req.body)
    const schemaCondition = model.validations.deleteUpdateKey
    const validateCondition = validatorUtil.validate(schemaCondition, req.params)

    if (validate.error === true) {
      resolve({
        status: 'error',
        message: validate.messages != null && validate.messages.length > 0 ? validate.messages[0] : null
      })
    } else if (validateCondition.error === true) {
      resolve({
        status: 'error',
        message: validateCondition.messages != null && validateCondition.messages.length > 0 ? validateCondition.messages[0] : null
      })
    } else {
      const fields = req.body

      databaseUtil.basicUpdate(model.table, req.params, fields).then(res => {
        resolve({
          status: 'ok',
          message: i18nUtil.translate('record_updated')
        })
      }).catch(error => reject(error))
    }
  })
}

const destroy = (req, res, model) => {
  return new Promise((resolve, reject) => {
    const schema = model.validations.deleteUpdateKey
    const validate = validatorUtil.validate(schema, req.params)

    if (validate.error === true) {
      resolve({
        status: 'error',
        message: validate.messages != null && validate.messages.length > 0 ? validate.messages[0] : null
      })
    } else {
      const fields = req.body
      fields.deleted_at = dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss')

      databaseUtil.basicUpdate(model.table, req.params, fields).then(res => {
        resolve({
          status: 'ok',
          message: i18nUtil.translate('record_deleted')
        })
      }).catch(error => reject(error))
    }
  })
}

module.exports = {
  create,
  update,
  destroy,
  get
}
