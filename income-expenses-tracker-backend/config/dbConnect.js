const mongoose = require("mongoose");

//connect

const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(
      "mongodb+srv://ghanshyamchoudhary9009:oIB7qk2SFsW4AJFm@cluster0.xzp4ejc.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Db connected Successfully");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

dbConnect();
