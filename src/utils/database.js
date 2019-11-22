const knex = require('knex')
const config = require('../config')
knex(config.database)

/* Install postgres connector */
// npm install --save pg

/* Install mysql connector */
// npm install --save mysql2

// select
knex.select('title', 'author', 'year').from('books')
knex.select().table('books')
knex.select('*').from('users')

// schema
knex.withSchema('public').select('*').from('users')

// conditions
knex('users').where({
  first_name: 'Test',
  last_name: 'User'
}).select('id')

// where in and AND
knex('users').where((builder) =>
  builder.whereIn('id', [1, 11, 15]).whereNotIn('id', [17, 19])
).andWhere(function () {
  this.where('id', '>', 10)
})

// like
knex('users').where('columnName', 'like', '%rowlikeme%')

// is null or not null
knex('users').whereNull('updated_at')
knex('users').whereNotNull('updated_at')
knex('users').whereBetween('votes', [1, 100])
knex('users').whereNotBetween('votes', [1, 100])

// order and group by
knex('users').orderBy('name', 'desc')
knex('users').groupBy('count')
knex('users').orderBy(['email', { column: 'age', order: 'desc' }])

knex.select('*').from('users').offset(10)
knex.select('*').from('users').limit(10).offset(30)

// retorno
knex('books')
  .returning(['id', 'title'])
  .insert({ title: 'Slaughterhouse Five' })

// print
.toSQL()

// update
knex('books')
  .where('published_date', '<', 2000)
  .update({
    status: 'archived',
    thisKeyIsSkipped: undefined
  })

// delete
knex('accounts')
  .where('activated', false)
  .del()


// primeiro registro
knex.table('users').first('id', 'name').then(function (row) { console.log(row); });



var Promise = require('bluebird');

knex.transaction(function (trx) {
  knex('books').transacting(trx).insert({ name: 'Old Books' })
    .then(function (resp) {
      var id = resp[0];
      return someExternalMethod(id, trx);
    })
    .then(trx.commit)
    .catch(trx.rollback);
})
.then(function (resp) {
  console.log('Transaction complete.');
})
.catch(function (err) {
  console.error(err);
})




  .insert({ name: 'Old Books' }, 'id')
  .into('catalogues')
  .then(function (ids) {
    books.forEach((book) => book.catalogue_id = ids[0]);
    return trx('books').insert(books);
  })

// Using trx as a transaction object:
knex.transaction(function(trx) {

  const books = [
    {title: 'Canterbury Tales'},
    {title: 'Moby Dick'},
    {title: 'Hamlet'}
  ];

  knex.insert({name: 'Old Books'}, 'id')
    .into('catalogues')
    .transacting(trx)
    .then(function(ids) {
      books.forEach((book) => book.catalogue_id = ids[0]);
      return knex('books').insert(books).transacting(trx);
    })
    .then(trx.commit)
    .catch(trx.rollback);
})
.then(function(inserts) {
  console.log(inserts.length + ' new books saved.');
})
.catch(function(error) {
  // If we get here, that means that neither the 'Old Books' catalogues insert,
  // nor any of the books inserts will have taken place.
  console.error(error);
});
