const jwt = require("jsonwebtoken");

const generatetoken = id =>{
    return jwt.sign({id}, "anykey",{ expiresIn:"10d"});
};

module.exports = generatetoken;