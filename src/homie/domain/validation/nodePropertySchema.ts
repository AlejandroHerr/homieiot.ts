import Joi from '@hapi/joi';

import Property from '../Property';

export default Joi.object()
  // @ts-ignore
  .instance(Property)
  .required();
