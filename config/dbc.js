const mysql = require('mysql');
const db = require('../config/db');
const dbc = mysql.createConnection(db);

module.exports = dbc;