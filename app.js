const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const { db, Page, User } = require('./models/index');
const port = 1337;

const routesWiki = require('./routes/wiki');
const routesUsers = require('./routes/users');

app.use(express.urlencoded({ extended: false }));

app.use('/wiki', routesWiki);
app.use('/users', routesUsers);

app.use(morgan('dev'));
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

const create = async () => {
  // await Page.sync({ force: true });
  // await User.sync({ force: true });
  await db.sync({ force: true });

  app.listen(port, () => {
    console.log('listening to port', port);
  });
};

create();

app.get('/', (req, res) => {
  res.send(layout(''));
});
