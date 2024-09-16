const z = require("zod");

const createValidator = z.object({
  title: z
    .string({ required_error: ["Title is required"] })
    .min(3, { message: ["Title must be at least 3 Characters"] }),
  description: z
    .string({ required_error: ["Description is required"] })
    .min(10, { message: ["Description be at least 10 Characters"] }),
  author: z
    .string({ required_error: ["Author is required"] })
    .min(3, { message: ["Author must be at least 3 Characters"] }),
  company: z
    .string({ required_error: ["Company is required"] })
    .min(3, { message: ["Company must be at least 3 Characters"] }),
});
module.exports = { createValidator };
