import Joi from '@hapi/joi';
import Datatype from '../Datatype';
import homieIdSchema from './homieIdSchema';

export default Joi.object({
  deviceId: homieIdSchema.required(),
  nodeId: homieIdSchema.required(),
  propertyId: homieIdSchema.required(),
  name: Joi.string()
    .allow('')
    .required(),
  datatype: Joi.object()
    .instance(Datatype)
    .required(),
  settable: Joi.boolean().required(),
  retained: Joi.boolean().required(),
  unit: Joi.string(),
  value: Joi.any(),
}).required();
