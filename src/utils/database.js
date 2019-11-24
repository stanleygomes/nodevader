/*
  How to use the knex lib
  Find more hints: https://devhints.io/knex
*/
const knex = require('knex')
const config = require('../config')
const mustacheUtils = require('./mustache')
const loggerUtils = require('./logger')
const i18nUtils = require('./i18n')

/*
  # Start query builder
  You can use this builder promise to build some queries like:
  - builder('user').whereNull('updated_at')
  - builder('user').groupBy('count')
  - builder('user').orderBy(['email', { column: 'age', order: 'desc' }])
  - builder('user').where('columnName', 'like', '%rowlikeme%').andWhere('id', '>', 30)
  - builder('user').whereNull('updated_at')
  - builder('user').whereNotNull('updated_at')
  - builder('user').whereBetween('updated_at')
*/
const builder = () => {
  return new Promise((resolve, reject) => {
    try {
      const k = knex(config.database)

      if (config.database.client === 'pg') {
        resolve(k.withSchema(config.database.connection.schema))
      } else if (config.database.client === 'mysql') {
        resolve(k)
      }
    } catch (err) {
      loggerUtils.error(err.stack)
      reject(err)
    }
  })
}

const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    builder().then(builder => {
      builder.raw(query, params)
        .then(rows => {
          const resp = rows && rows.length ? rows[0] : null
          resolve(resp)
        }).catch(err => {
          loggerUtils.error(err.stack)
          reject(err)
        })
    })
  })
}

/*
  Execute a query from a file
  SQL files folder defined in config/app.js
  Params: filename, params: {id: 2}
*/
const namedQuery = (name, params) => {
  return new Promise((resolve, reject) => {
    mustacheUtils.getTemplateSQL(name, params).then(query => {
      executeQuery(query.rendered).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    }).catch(error => reject(error))
  })
}

/*
  Execute a basic select in a table with conditions and returning count
  Params: tableName, conditions (optional), fields (optional)
  http://knexjs.org/#Builder-count
*/
const basicCount = (tableName, conditions = {}, fields = '*') => {
  return new Promise((resolve, reject) => {
    builder().then(builder => {
      builder(tableName)
        .count(fields)
        .where(conditions)
        .then(rows => {
          const resp = rows && rows.length ? rows[0] : null
          resolve(resp)
        }).catch(err => {
          loggerUtils.error(err.stack)
          reject(err)
        })
    }).catch(error => reject(error))
  })
}

/*
  Execute a basic select in a table with conditions and returning fields
  Params: tableName, conditions (optional), fields (optional)
  http://knexjs.org/#Builder-select
*/
const basicSelect = (tableName, conditions = {}, fields = '*') => {
  return new Promise((resolve, reject) => {
    builder().then(builder => {
      builder(tableName)
        .select(fields)
        .from(tableName)
        .where(conditions)
        .then(rows => {
          const resp = rows && rows.length ? rows : null
          resolve(resp)
        }).catch(err => {
          loggerUtils.error(err.stack)
          reject(err)
        })
    }).catch(error => reject(error))
  })
}

/*
  Execute a basic select in a table paginating results
  Params: tableName, limit, offset, conditions (optional), fields (optional)
  http://knexjs.org/#Builder-offset
*/
const basicPaginate = (tableName, conditions = {}, fields = '*', limit = 15, offset = 60) => {
  return new Promise((resolve, reject) => {
    basicCount(tableName, conditions, fields).then(count => {
      const countResults = count ? count['count(*)'] : 0
      const lastPage = (limit > 0 ? Math.floor(countResults / limit) : 0)
      const currentPage = limit > 0 && lastPage > 0 ? ((lastPage * (offset * 100)) / (limit * lastPage)) / 100 : 1
      const paginateResults = {
        from: offset,
        to: (offset + limit),
        per_page: limit,
        total_results: countResults,
        last_page: lastPage,
        current_page: currentPage === 0 ? 1 : currentPage,
        results: []
      }

      builder().then(builder => {
        builder(tableName)
          .select(fields)
          .from(tableName)
          .where(conditions)
          .limit(limit)
          .offset(offset)
          .then(rows => {
            paginateResults.results = (rows && rows.length ? rows : null)
            resolve(paginateResults)
          }).catch(err => {
            loggerUtils.error(err.stack)
            reject(err)
          })
      }).catch(error => reject(error))
    }).catch(error => reject(error))
  })
}

/*
  Execute a basic update in a table
  Params: tableName, conditions, fields, returning (only for Postgres)
  Returns: num of updated lines
  http://knexjs.org/#Builder-update
*/
const basicUpdate = (tableName, conditions, fields, returning) => {
  return new Promise((resolve, reject) => {
    let validationError = null

    if (!fields || Object.keys(fields).length === 0) {
      validationError = i18nUtils.translate('field_required %s', 'fields')
      reject(validationError)
    }

    if (!conditions || Object.keys(conditions).length === 0) {
      validationError = i18nUtils.translate('field_required %s', 'conditions')
      reject(validationError)
    }

    builder().then(builder => {
      builder(tableName)
        .where(conditions)
        .update(fields, returning)
        .then(rowsUpdated => {
          resolve(rowsUpdated)
        }).catch(err => {
          loggerUtils.error(err.stack)
          reject(err)
        })
    }).catch(error => reject(error))
  })
}

/*
  Execute a basic delete in a table
  Params: tableName, fields, conditions
  Returns: num of deleted lines
  http://knexjs.org/#Builder-del%20/%20delete
*/
const basicDelete = (tableName, conditions) => {
  return new Promise((resolve, reject) => {
    let validationError = null

    if (!conditions || Object.keys(conditions).length === 0) {
      validationError = i18nUtils.translate('field_required %s', 'conditions')
      reject(validationError)
    }

    builder().then(builder => {
      builder(tableName)
        .where(conditions)
        .del()
        .then(rowsUpdated => {
          resolve(rowsUpdated)
        }).catch(err => {
          loggerUtils.error(err.stack)
          reject(err)
        })
    }).catch(error => reject(error))
  })
}

/*
  Execute a basic insert in a table
  Params: tableName, fields, returning (optional, only for postgres, mysql return updated rows)
  http://knexjs.org/#Builder-insert
*/
const basicInsert = (tableName, fields, returning = []) => {
  return new Promise((resolve, reject) => {
    let validationError = null

    if (!fields || Object.keys(fields).length === 0) {
      validationError = i18nUtils.translate('field_required %s', 'fields')
      reject(validationError)
    }

    builder().then(builder => {
      builder(tableName)
        .returning(returning)
        .insert(fields)
        .then(rowsInserted => {
          resolve(rowsInserted)
        }).catch(err => {
          loggerUtils.error(err.stack)
          reject(err)
        })
    }).catch(error => reject(error))
  })
}

/*
  Insert in batch
  Params:
    - rows: array
    - tableName: string
    - returning (fields): array
    - chunkSize (maximum lines per execution): integer
  http://knexjs.org/#Utility-BatchInsert
*/
const basicBatchInsert = (tableName, rows, returning = [], chunkSize) => {
  return new Promise((resolve, reject) => {
    const defaultChunkSize = config.database.maxChunkSize
    builder().then(builder => {
      builder.transaction((tr) => {
        builder.batchInsert(tableName, rows, chunkSize || defaultChunkSize)
          .returning(returning)
          .then(response => {
            resolve(response)
          })
          .then(tr.commit)
          .catch(tr.rollback)
      })
        .then(response => resolve(response))
        .catch(error => reject(error))
    }).catch(error => reject(error))
  })
}

/*
  Run code inside transaction
  Params:
    - rows: array
    - tableName
    - returning (fields): array
    - chunkSize (maximum lines per execution): integer
*/
const basicTransation = () => {
  return new Promise((resolve, reject) => {
    builder().then(builder => {
      builder.transaction((tr) => {
        resolve(tr)
      }).catch(error => reject(error))
    }).catch(error => reject(error))
  })
}

module.exports = {
  basicCount,
  basicDelete,
  basicInsert,
  basicPaginate,
  basicSelect,
  basicUpdate,
  basicBatchInsert,
  builder,
  namedQuery,
  basicTransation
}
