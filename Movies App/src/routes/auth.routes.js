const { Router } = require("express");
const {
  register,
  login,
  logout,
  profile,
  verifyToken,
  getUsers,
  deleteUsers,
} = require("../controllers/user.controller");
const { validateToken } = require("../middlewares/validateToken");
const { validateSchema } = require("../middlewares/validate.schema");
const {
  registerValidator,
  loginValidator,
} = require("../validators/auth.validator");
const { isAdmin } = require("../middlewares/isAdmin");
const authRouter = Router();

authRouter.post("/register", validateSchema(registerValidator), register);
authRouter.post("/login", validateSchema(loginValidator), login);
authRouter.get("/logout", logout);
authRouter.get("/profile", validateToken, profile);
authRouter.get("/verify", verifyToken);
authRouter.get("/users", validateToken, isAdmin, getUsers);
authRouter.delete("/users/:id", validateToken, isAdmin, deleteUsers);

module.exports = authRouter;
