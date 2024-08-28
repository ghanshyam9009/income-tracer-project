class AppErr extends Error{
    constructor(message, statuscode){
        super(message);
        this.statuscode = statuscode;
        this.status = "failed";
    }
}

const AppError =  (message, statuscode) =>{
    let error = new Error(message);
    error.statuscode = statuscode;
    return error;
};

module.exports ={
    AppErr,
    AppError,

}