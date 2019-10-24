import Joi from '@hapi/joi';

import Property from '../Property';

import homieIdSchema from './homieIdSchema';

export default Joi.object({
  deviceId: homieIdSchema.required(),
  nodeId: homieIdSchema.required(),
  name: Joi.string()
    .allow('')
    .required(),
  type: Joi.string()
    .allow('')
    .required(),
  properties: Joi.array()
    .items(
      Joi.object()
        // @ts-ignore
        .instance(Property),
    )
    .required(),
}).required();
