const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

const connectDb = () => {
  try {
    console.log(`Data base conected >>> ${uri}`);
    mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { connectDb };
