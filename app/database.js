const {Pool} = require("pg");

const pool = new Pool({
   connectionString: process.env.DATABASE_URL,
   ssl: {
       rejectUnauthorized:false //we accept all no SSL connections.
   }
});

module.exports = pool;