const jwt = require("jsonwebtoken");

const verifytoken = token  =>{
    return jwt.verify(token, "anykey",(err,decoded) =>{
        if(err){
            return false;
        }
        else{
            return decoded;
        }
    });
};

module.exports = verifytoken;