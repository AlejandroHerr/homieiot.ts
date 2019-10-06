import Joi from '@hapi/joi';
import Datatype from '../Datatype';
import homieIdSchema from './homieIdSchema';

export default Joi.object({
  deviceId: homieIdSchema,
  nodeId: homieIdSchema,
  propertyId: homieIdSchema,
  name: Joi.string()
    .allow('')
    .required(),
  datatype: Joi.object()
    // @ts-ignore
    .instance(Datatype)
    .required(),
  settable: Joi.boolean().required(),
  retained: Joi.boolean().required(),
  unit: Joi.string(),
  value: Joi.any(),
});
