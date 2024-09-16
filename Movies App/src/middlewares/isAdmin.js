const userModel = require("../models/user.model");

const isAdmin = async (req, res, next) => {
  try {
    const {id}=req.user
 
    const userFound = await userModel.findById(id);
    if (!userFound) {
      return res.status(400).json({ msg: "User not found" });
    }
    if (userFound.roll === "Admin") {
      console.log("Access ok");
      next();
      return;
    }
    return res.status(400).json({ msg: "Access Unauthorized" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};
module.exports = { isAdmin };
