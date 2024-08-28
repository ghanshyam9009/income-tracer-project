const { AppErr } = require("../utilis/AppErr")
const gettokenfromheader = require("../utilis/gettokenfromheader")
const verifytoken = require("../utilis/verifytokens")


const islogin =(req, res,next) =>{
    // get token grom headers
    const token = gettokenfromheader(req);
    //verify
    const decodeduser = verifytoken(token);
    //save the user into req objext 
    req.user = decodeduser.id;
    if(!decodeduser){
        return next(new AppErr("invalid/expired token , please login again", 401));
    }
    next();
};
module.exports = islogin;
