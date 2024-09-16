const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(500).json({ msg: error.errors.map((item) => item.message) });
  }
};
module.exports = { validateSchema };
