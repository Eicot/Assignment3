// Setting up the database connection
const knex = require('knex')({
    client: 'mysql',
    connection: {
      user: 'sqluser',
      password:'Password1@',
      database:'shop',
      host:'127.0.0.1'
    }
})
const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf;