const Pool = require("pg").Pool;
const pool = new Pool({
    user:"lbcyvarmnremig",
    password:"92fb031c3b406a7c20ec4413cae52f6833b72cfc4ffa659840222bf3fd7ded57",
    host : "ec2-3-228-78-248.compute-1.amazonaws.com",
    port:5432,
    database:"dca0b44mm0co30",
    URI:"postgres://lbcyvarmnremig:92fb031c3b406a7c20ec4413cae52f6833b72cfc4ffa659840222bf3fd7ded57@ec2-3-228-78-248.compute-1.amazonaws.com:5432/dca0b44mm0co30
"
});
module.exports = pool;
