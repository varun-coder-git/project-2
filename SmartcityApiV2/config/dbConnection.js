const Cryptr = require('cryptr');
const cryptr = new Cryptr('#Screate1489d');
const Pool = require('pg').Pool
 const connection = new Pool({
    user:cryptr.decrypt(process.env.DB_USER),
    host:cryptr.decrypt(process.env.IP),
    port:parseInt(cryptr.decrypt(process.env.DB_PORT)),
    database:cryptr.decrypt(process.env.DATABASE_NAME),
    password:cryptr.decrypt(process.env.DB_PASSWORD),
 });
 
connection.connect(function(err){
     if(err){
         console.log(err.message);
     }else{
         console.log("connected to database")
     }
 })
 module.exports=connection;
