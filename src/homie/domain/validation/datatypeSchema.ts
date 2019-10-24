import Joi from '@hapi/joi';

const integerOrFloatFormatSchema: Joi.WhenOptions = {
  is: Joi.valid('integer', 'float'),
  then: Joi.array()
    .items(Joi.number().required())
    .length(2),
};

const colorFormatSchema: Joi.WhenOptions = {
  is: Joi.valid('color'),
  then: Joi.string().valid('rgb', 'hsv'),
};

const enumFormatSchema: Joi.WhenOptions = {
  is: Joi.valid('enum'),
  then: Joi.array()
    .items(Joi.string().required())
    .required(),
};

const booleanOrStringFormatSchema: Joi.WhenOptions = {
  is: Joi.valid('boolean', 'string'),
  then: Joi.any().forbidden(),
};

export default Joi.object({
  datatype: Joi.string()
    .valid('integer', 'float', 'boolean', 'string', 'enum', 'color')
    .required(),
  // @ts-ignore
  format: Joi.when('datatype', {
    switch: [integerOrFloatFormatSchema, colorFormatSchema, enumFormatSchema, booleanOrStringFormatSchema],
  }),
}).required();
