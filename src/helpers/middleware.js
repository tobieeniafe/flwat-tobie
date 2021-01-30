export const schemaValidation = (schema) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body);

    if (value && !error) {
      req.locals = value;
      next();
    } else {
      res.status(400).json({
        message: error.message,
        status: 'error',
        data: null,
      });
    }
  };
};
