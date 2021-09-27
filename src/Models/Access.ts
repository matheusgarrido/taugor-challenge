import Joi from '@hapi/joi';

// Schema fields config value
const FULLNAME_FIELD = Joi.string().min(3).required();
const USERNAME_FIELD = Joi.string().min(3).required();
const EMAIL_FIELD = Joi.string().email().lowercase().required();
const PASSWORD_FIELD = Joi.string().min(6).required();

function validate(schema: any, data: Object) {
  const validation = schema.validate(data);
  if (validation.error) {
    return {
      ...validation,
      message: validation.error.details[0].message,
    };
  }
  return validation;
}

export const userRegister = (user: Object) => {
  const schema = Joi.object({
    name: FULLNAME_FIELD,
    username: USERNAME_FIELD,
    email: EMAIL_FIELD,
    password: PASSWORD_FIELD,
  });
  return validate(schema, user);
};

export const userLogin = (user: Object) => {
  const schema = Joi.object({
    email: EMAIL_FIELD,
    password: PASSWORD_FIELD,
  });
  return validate(schema, user);
};
