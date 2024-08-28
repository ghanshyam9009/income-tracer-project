const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const { AppErr, AppError } = require("../../utilis/AppErr");
const generatetoken = require("../../utilis/generatetoken");
const verifytoken = require("../../utilis/verifytokens");
const { rawListeners } = require("../../model/Account");


//Register
const registerUserCtrl = async (req, res,next) => {
  const { fullname, password, email } = req.body;
  try {
    //check if email exist
    const userFound = await User.findOne({ email });
    if (userFound){
     return next( AppError("user already exist",400));
    } 

    //check if fields are empty
    // if (!email || !password || !fullname) {
    //   return res.json({ message: "Please provide all field" });
    // }


    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.json({
      status: "success",
      fullname: user.fullname,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};


//login
const userLoginCtrl = async (req, res,next) => {
  const { email, password}=req.body;
  try {
    // check if email is exist/
    const userFound = await User.findOne({ email});
    if(!userFound){
      return next(new AppErr("invalid login credential",400));
    } 

    //check for login credentiality
    const ispasswordmatch = await bcrypt.compare(password,userFound.password);
    if(!ispasswordmatch)
    return next(new AppErr("invalid login credential",400));

    res.json({
      status: "success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generatetoken(userFound._id),
    });
  }
   catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//profile
const userProfileCtrl = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      }
    });
    res.json({ user });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//delete
const deleteUserCtrl = async (req, res,next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "success",
      data: null
    })
    res.json({ msg: "delete route" });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//update
const updateUserCtrl = async (req, res,next) => {
  try {
    // check if email exist 
    if( req.body.email){
      const userFound = await User.findOne({ email: req.body.email});
      if(userFound)
      return next(
          new AppErr("Email is taken or you already have this email",400)
          );
    }

    // check if user is updating password
    if(req.body.password){
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password,salt);

      //update the user
      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators:true,
        }
      );
      //send the response
    return res.status(200).json({
      status: "success",
      data: user,
    });
  }

  const user = await User.findByIdAndUpdate(req.user, req.body,{
    new: true,
    runValidators: true,
  });
  //send the rresponse
     res.status(200).json({
    status: "success",
    data: user,
  });

    res.json({ msg: "update route" });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

module.exports = {
  registerUserCtrl,
  userLoginCtrl,
  userLoginCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
};
