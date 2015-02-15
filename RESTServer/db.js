var config = {
   host: 'localhost',  // your host
   user: 'root', // your database user
   password: 'CfT5fLyL', // your database password
   database: 'dbUsers',
   charset: 'UTF8_GENERAL_CI'
};

var knex = require('knex')({
	client: 'mysql',
	connection: config
});

var Bookshelf = require('bookshelf')(knex);

module.exports.DB = Bookshelf;

