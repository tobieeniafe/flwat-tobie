import Joi from '@hapi/joi';

const rule = Joi.object()
  .keys({
    field: Joi.string()
      .label('field')
      .messages({
        'string.base': 'field should be a string.',
        'string.empty': 'field cannot be empty.',
        'any.required': 'field is required.',
      })
      .required(),

    condition: Joi.string()
      .label('condition')
      .valid('eq', 'neq', 'gt', 'gte', 'contains')
      .messages({
        'string.base': 'condition should be a string.',
        'string.empty': 'condition cannot be empty.',
        'any.required': 'condition is required.',
      })
      .required(),

    condition_value: Joi.alternatives()
      .try(Joi.number(), Joi.string())
      .label('condition_value')
      .messages({
        'any.base': 'condition_value should be a number or string.',
        'any.empty': 'condition_value cannot be empty.',
        'any.required': 'condition_value is required.',
      })
      .required(),
  })
  .messages({
    'object.base': 'rule should be an object.',
    'object.empty': 'rule cannot be empty.',
    'any.required': 'rule is required.',
  })
  .required();

const data = Joi.alternatives()
  .try(Joi.object(), Joi.string(), Joi.array())
  .messages({
    'any.base': 'data should be an object.',
    'any.empty': 'data cannot be empty.',
    'any.required': 'data is required.',
  })
  .required();

export const postSchema = Joi.object({
  rule,
  data,
});
