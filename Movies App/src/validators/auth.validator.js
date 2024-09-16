const z = require("zod");

const registerValidator = z.object({
  username: z
    .string({ required_error: ["User name is required"] })
    .min(3, { message: ["User name must be at least 3 Characters"] }),
  email: z
    .string({ required_error: ["Email is required"] })
    .email({ message: ["Invalid Email"] }),
  password: z
    .string({ required_error: ["Password is required"] })
    .min(3, { message: ["Password must be at least 3 Characters"] }),
});
const loginValidator = z.object({
  email: z
    .string({ required_error: ["Email is required"] })
    .email({ message: ["Invalid Email"] }),
  password: z
    .string({ required_error: ["Password is required"] })
    .min(3, { message: ["Password must be at least 3 Characters"] }),
});
module.exports = { registerValidator, loginValidator };
