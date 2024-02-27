const gettokenfromheader = req =>{

   // how to get token from user 
   const headerobj = req.headers;
   const token = headerobj["authorization"].split(" ")[1];

   if(token !== undefined){
    return token;
   }else{
    return{
     status: "failed",
     message: "there is no token arttached to the header",

    };
    
   }

};

module.exports=gettokenfromheader;