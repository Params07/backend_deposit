const Pool = require("pg").Pool;
const pool = new Pool({
    user:"postgres",
    password:"parama",
    host : "localhost",
    port:5433,
    database:"project1"
});
module.exports = pool;