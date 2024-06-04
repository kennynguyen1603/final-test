function validateFields(fields) {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) throw new Error(`${key} is required!`);
  }
}

const validateRegister = (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    validateFields({
      username,
      password,
      email,
    });
    next();
  } catch (validationError) {
    res.status(400).send({ message: validationError.message });
  }
};

const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  try {
    validateFields({
      username,
      password,
    });
    next();
  } catch (validationError) {
    res.status(400).send({ message: validationError.message });
  }
};

const validateFilm = (req, res, next) => {
  const { ID, name, time, year, introduce } = req.body;
  try {
    validateFields({
      ID,
      name,
      time,
      year,
      introduce,
    });
    next();
  } catch (validationError) {
    res.status(400).send({ message: validationError.message });
  }
};

export { validateRegister, validateLogin, validateFilm };
