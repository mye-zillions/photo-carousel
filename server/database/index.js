const Sequelize = require('sequelize');
const { mysqlUser, mysqlPass, mysqlHost, mysqlPort } = require('../../config');

const sequelize = new Sequelize('xillow', mysqlUser, mysqlPass, {
  host: mysqlHost,
  port: mysqlPort,
  dialect: 'mysql',
});

const Photo = sequelize.define('photo', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  property_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Property = sequelize.define('property', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  bed_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  bath_count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sq_ft: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const getDetails = id => Property.findAll({
  where: { id },
});

const getPhotos = id => Photo.findAll({
  attributes: ['url'],
  where: {
    property_id: id,
  },
});

module.exports = { getDetails, getPhotos };
