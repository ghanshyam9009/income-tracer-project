const globalerrorhandler =(err,req,res,next)=>{
    //message
    //status
    //statuscode
    //stack

    const statuscode = err.statuscode = err.statuscode||500;
    const status = err.status = err.status || 'error';
    const message = err.message
    const stack = err.stack
     res.status(statuscode).json({
        status,
        message,
        stack
     })
}
module.exports = globalerrorhandler;