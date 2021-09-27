import Joi from '@hapi/joi';

// Schema fields config value
const TITLE_FIELD = Joi.string().required();
const DESCRIPTION_FIELD = Joi.string().required();
const STATUS_FIELD = Joi.string().required();
const RESPONSIBLE_FIELD = Joi.string().required();

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

export const taskForm = (task: Object) => {
  const schema = Joi.object({
    title: TITLE_FIELD,
    description: DESCRIPTION_FIELD,
    status: STATUS_FIELD,
    responsible: RESPONSIBLE_FIELD,
  });
  return validate(schema, task);
};
