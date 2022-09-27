const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('#Screate1489d');
secret_key = cryptr.decrypt(process.env.Secret_Key),
module.exports = auth = (req,res,next) =>{
    const nonSecurePaths = ['/BreakingNews','/GetNewsOCM'];
    if (nonSecurePaths.includes(req.path)){
        next();
    }else{
        const user_id= req.body.user_id;
        const token =req.body.token;
        jwt.verify(token,secret_key, function(err, decoded) {
            if (err) {
                res.status(401).send({
                    status: false,
                    message: "Failed to authenticate token",
                })
            }
            else{
                next();
            }
        });
    }     
}