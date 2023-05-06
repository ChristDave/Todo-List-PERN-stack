const Pool = require("pg").Pool;  //allows us to configure how to connect the database

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    database: "pernstack",
    port: 5432
});

module.exports = pool;