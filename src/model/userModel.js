const User = {
  table: 'user',
  primaryKey: 'id',
  fields: ['name', 'email'],
  hidden: ['password'],
  dates: ['created_at', 'updated_at', 'deleted_at']
}

module.exports = User
