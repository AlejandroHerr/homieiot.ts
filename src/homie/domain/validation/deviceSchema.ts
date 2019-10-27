import Joi from '@hapi/joi';

import Node from '../Node';

import homieIdSchema from './homieIdSchema';
import deviceStateSchema from './deviceStateSchema';

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
    .items(Joi.object().instance(Node))
    .required(),
  extensions: Joi.string()
    .allow('')
    .required(),
}).required();
