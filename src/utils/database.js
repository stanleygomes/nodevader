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
  - builder('users').groupBy('count')
  - builder('users').orderBy('name', 'desc')
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
  Execute a basic select in a table with conditions and returning fields
  Params: tableName, conditions (optional), fields (optional)
*/
const basicSelect = (tableName, conditions, fields = '*') => {
  return new Promise((resolve, reject) => {
    builder().then(builder => {
      builder.select(fields)
        .from(tableName)
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
  Execute a basic select in a table paginating results
  Params: tableName, limit, offset, conditions (optional), fields (optional)
*/
const paginate = (tableName, limit = 15, offset = 0, conditions, fields = '*') => {
  return new Promise((resolve, reject) => {
    builder().then(builder => {
      builder.select(fields)
        .from(tableName)
        .where(conditions)
        .offset(limit)
        .offset(offset)
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

// knex.select('*').from('users')
// knex.select('*').from('users').limit(10).offset(30)


/*
  Execute a basic update in a table
  Params: tableName, conditions, fields, returning (only for Postgres)
  Returns: num of updated lines
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

module.exports = {
  basicSelect,
  basicUpdate,
  basicDelete,
  paginate,
  // batchInsert,
  builder,
  namedQuery
  // transation
}

// /*
//   Insert in batch
//   Params:
//     - rows: array
//     - tableName
//     - returning (fields): array
//     - chunkSize (maximum lines per execution): integer
// */
// const batchInsert = (rows, tableName, returning, chunkSize) => {
//   return new Promise((resolve, reject) => {
//     const defaultChunkSize = config.database.maxChunkSize

//     const a = (tr) => {
//       knex.transacting(tr)
//         .batchInsert(tableName, rows, chunkSize || defaultChunkSize)
//         .returning(returning)
//         .then(response => {
//           resolve(response)
//         })
//         .then(tr.commit)
//         .catch(tr.rollback)
//     }
//   })
// }

// /*
//   Run code inside transaction
//   Params:
//     - rows: array
//     - tableName
//     - returning (fields): array
//     - chunkSize (maximum lines per execution): integer
// */
// const transation = (fn) => {
//   return new Promise((resolve, reject) => {
//     knex.transaction(fn)
//       .then(response => resolve(response))
//       .catch(error => reject(error))
//   })
// }

// /* Some use cases */

// // select
// knex.select('title', 'author', 'year').from('books')
// knex.select().table('books')
// knex.select('*').from('users')

// // schema
// knex.withSchema('public').select('*').from('users')

// // conditions
// knex('users').where({
//   first_name: 'Test',
//   last_name: 'User'
// }).select('id')

// // where in and AND
// knex('users').where((builder) =>
//   builder.whereIn('id', [1, 11, 15]).whereNotIn('id', [17, 19])
// ).andWhere(function () {
//   this.where('id', '>', 10)
// })

// // like
// knex('users').where('columnName', 'like', '%rowlikeme%')

// // is null or not null
// knex('users').whereNull('updated_at')
// knex('users').whereNotNull('updated_at')
// knex('users').whereBetween('votes', [1, 100])
// knex('users').whereNotBetween('votes', [1, 100])

// // order and group by
// knex('users').orderBy('name', 'desc')
// knex('users').groupBy('count')
// knex('users').orderBy(['email', { column: 'age', order: 'desc' }])

// knex('users').orderBy('name', 'desc')
// knex('users').groupBy('count')
// knex.select('*').from('users').offset(10)
// knex.select('*').from('users').limit(10).offset(30)

// // retorno
// knex('books')
//   .returning(['id', 'title'])
//   .insert({ title: 'Slaughterhouse Five' })

// // print
// .toSQL()

// // primeiro registro
// knex.table('users').first('id', 'name').then(function (row) { console.log(row); });

// var Promise = require('bluebird');

// knex.transaction(function (trx) {
//   knex('books').transacting(trx).insert({ name: 'Old Books' })
//     .then(function (resp) {
//       var id = resp[0];
//       return someExternalMethod(id, trx);
//     })
//     .then(trx.commit)
//     .catch(trx.rollback);
// })
// .then(function (resp) {
//   console.log('Transaction complete.');
// })
// .catch(function (err) {
//   console.error(err);
// })

//   .insert({ name: 'Old Books' }, 'id')
//   .into('catalogues')
//   .then(function (ids) {
//     books.forEach((book) => book.catalogue_id = ids[0]);
//     return trx('books').insert(books);
//   })

// // Using trx as a transaction object:
// knex.transaction(function(trx) {

//   const books = [
//     {title: 'Canterbury Tales'},
//     {title: 'Moby Dick'},
//     {title: 'Hamlet'}
//   ];

//   knex.insert({name: 'Old Books'}, 'id')
//     .into('catalogues')
//     .transacting(trx)
//     .then(function(ids) {
//       books.forEach((book) => book.catalogue_id = ids[0]);
//       return knex('books').insert(books).transacting(trx);
//     })
//     .then(trx.commit)
//     .catch(trx.rollback);
// })
// .then(function(inserts) {
//   console.log(inserts.length + ' new books saved.');
// })
// .catch(function(error) {
//   // If we get here, that means that neither the 'Old Books' catalogues insert,
//   // nor any of the books inserts will have taken place.
//   console.error(error);
// });
