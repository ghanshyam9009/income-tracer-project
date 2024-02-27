const express = require("express");

const {
  registerUserCtrl,
  userLoginCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
} = require("../../controllers/users/usersCtrl");
const islogin = require("../../middlewares/islogin");

const usersRoute = express.Router();

//POST/api/v1/users/register

usersRoute.post("/register", registerUserCtrl);
//POST/api/v1/users/login
usersRoute.post("/login", userLoginCtrl);

//GET/api/v1/users/profile
usersRoute.get("/profile", islogin, userProfileCtrl);

//DELETE/api/v1/users/:id
usersRoute.delete("/", islogin, deleteUserCtrl);

//PUT/api/v1/users/
usersRoute.put("/",islogin, updateUserCtrl);
module.exports = usersRoute;
