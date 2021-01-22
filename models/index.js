const Sequelize = require('sequelize');
const slugify = require('sequelize-slugify');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const createSlug = new slugify();
createSlug;

const Page = db.define('page', {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, unique: true, allowNull: false },
  content: { type: Sequelize.STRING, allowNull: false },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

const User = db.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    validate: { isEmail: true },
    allowNull: false,
  },
});

module.exports = {
  db,
  Page,
  User,
};
