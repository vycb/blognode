/**
 * Module dependencies.
 */

var express = require('express');

var mysql      = require('mysql'),
connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123'
});

var app = module.exports = express();
// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

// Optional since express defaults to CWD/views
app.set('views', __dirname + '/views');

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');

// Dummy users
var users = [
  { name: 'tobi', email: 'tobi@learnboost.com' },
  { name: 'loki', email: 'loki@learnboost.com' },
  { name: 'jane', email: 'jane@learnboost.com' }
];

app.get('/', function(req, res){
	connection.connect();
	connection.query('USE chatsql');
	connection.query('SELECT * FROM message', function(err, rows, fields){
		if(err) throw err;

		console.log('created: ', rows[0].created);

		res.render('users', {
			users: users,
			rows: rows,
			title: "EJS example",
			header: "Some users"
		});
	});

	connection.end();


});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
