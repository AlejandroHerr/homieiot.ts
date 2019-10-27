import Joi from '@hapi/joi';

import Datatype from '../Datatype';

const floatSchema = Joi.number().required();
const integerSchema = floatSchema.integer();
const colorSchema = Joi.string()
  .regex(/^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/)
  .required();
const stringSchema = Joi.string()
  .allow('')
  .required();
const booleanSchema = Joi.boolean().required();

const getSchemaForDatatype = (datatype: Datatype): Joi.Schema => {
  if (datatype.datatype === 'integer') {
    return datatype.format
      ? integerSchema.min(datatype.format[0] as number).max(datatype.format[1] as number)
      : integerSchema;
  }

  if (datatype.datatype === 'float') {
    return datatype.format
      ? floatSchema.min(datatype.format[0] as number).max(datatype.format[1] as number)
      : floatSchema;
  }

  if (datatype.datatype === 'enum') {
    return (
      Joi.any()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .valid(...(datatype.format as any[]))
        .required()
    );
  }

  if (datatype.datatype === 'color') {
    return colorSchema;
  }

  if (datatype.datatype === 'boolean') {
    return booleanSchema;
  }

  if (datatype.datatype === 'string') {
    return stringSchema;
  }

  return Joi.any().required();
};

export default (datatype: Datatype): Joi.Schema => getSchemaForDatatype(datatype);
