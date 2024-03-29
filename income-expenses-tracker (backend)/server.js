const express = require("express");
const cors = require("cors");
const accountRoute = require("./routes/accounts/accountRoute");
const transactionsRoute = require("./routes/transactions/transactionsRoute");
const usersRoute = require("./routes/users/usersRoute");
const globalerrorhandler = require("./middlewares/globalerrorhandler");
require("./config/dbConnect");



const app = express();

//middlewares

app.use(express.json());  // pass incoming data

// corse middleware
app.use(cors());
//users route
app.use("/api/v1/users", usersRoute);
//account routes
app.use("/api/v1/accounts", accountRoute);

//transactions route
app.use("/api/v1/transactions", transactionsRoute);


//Error handlers
app.use(globalerrorhandler);

//listen to server
const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server is up and runing on port ${PORT}`));
