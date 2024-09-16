const { createAccessToken } = require("../libs/jwt");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password, roll } = req.body;

  try {
    const userFound = await userModel.findOne({ email });
    if (userFound) {
      return res.status(404).json({ msg: ["User already exist"] });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = userModel({
      username,
      email,
      password: hashPassword,
      roll,
    });
    //create token
    const savedUser = await newUser.save();
    const token = await createAccessToken({ id: savedUser._id });
    res.cookie("token", token);
    res.send({
      msg: "User added",
      name: savedUser.username,
      email: savedUser.email,
      roll: savedUser.roll,
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await userModel.findOne({ email });
    if (!userFound) {
      return res.status(404).json({ msg: ["User not exist"] });
    }
    const match = await bcrypt.compare(password, userFound.password);
    if (!match) {
      return res.status(404).json({ msg: ["Invalid credentials"] });
    }
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.send({
      msg: "User loged",
      name: userFound.username,
      email: userFound.email,
      roll: userFound.roll,
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};
const profile = async (req, res) => {
  const { id } = req.user;

  try {
    const userFound = await userModel.findById(id);
    if (!userFound) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.send(userFound);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({ msg: ["Invalid Token"] });
  }
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ msg: [err] });
    }
    const userFound = await userModel.findById(decoded.id);
    if (!userFound) {
      return res.status(401).json({ msg: ["User not found"] });
    }
    return res.json({
      id: userFound._id,
      name: userFound.username,
      email: userFound.email,
      roll: userFound.roll,
    });
  });
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    if (!users) {
      return res.status(404).json({ msg: "No users" });
    }
    console.log(users);
    res.send(users);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

//para eliminar usuarios pero teniendo en cuenta el tiempo q lleva cada usuario administrador en caso q se desee
//eliminar un admin para otro admin

const deleteUsers = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ msg: "Id not found" });
    }
    const loggedUser = await userModel.findById(req.user.id);
    const userToDelete = await userModel.findById(id);
    if (!loggedUser || !userToDelete) {
      return res.status(404).json({ msg: "User not found" });
    }
    if (loggedUser.roll !== "Admin") {
      return res
        .status(403)
        .json({ msg: "Only Admin users can delete other users" });
    }
    const loggedUserCreatedAt = new Date(loggedUser.createdAt);
    const userToDeleteCreatedAt = new Date(userToDelete.createdAt);
    if (loggedUserCreatedAt > userToDeleteCreatedAt) {
      return res
        .status(403)
        .json({ msg: "Don't Have permissions to delete this user" });
    }
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(400)
        .json({ msg: "something went wrong when we are deleting this user" });
    }
    return res.status(200).json({ msg: "User deleted " });
  } catch (error) {
    console.error(
      "something went wrong when we are deleting this user:",
      error
    );
    return res.status(500).json({ msg: "Internal Server error" });
  }
};


module.exports = {
  register,
  login,
  logout,
  profile,
  verifyToken,
  getUsers,
  deleteUsers,
};
