const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({

    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,		//database name
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,			//default PostgreSQL port

});

module.exports = pool;