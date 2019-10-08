import Joi from '@hapi/joi';
import homieIdSchema from './homieIdSchema';
import deviceStateSchema from './deviceStateSchema';
import deviceNodeSchema from './deviceNodeSchema';

export default Joi.object({
  deviceId: homieIdSchema.required(),
  homie: Joi.string()
    .regex(/^[0-9]+\.[0-9]+\.[0-9]+$/)
    .required(),
  name: Joi.string()
    .allow('')
    .required(),
  state: deviceStateSchema.required(),
  nodes: Joi.array()
    .items(deviceNodeSchema)
    .required(),
  extensions: Joi.string()
    .allow('')
    .required(),
});
