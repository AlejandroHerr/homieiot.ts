import Joi from '@hapi/joi';

import homieIdSchema from './homieIdSchema';
import Property from '../Property';

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
});
