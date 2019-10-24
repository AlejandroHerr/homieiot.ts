import Joi from '@hapi/joi';

import Node from '../Node';

export default Joi.object()
  // @ts-ignore
  .instance(Node)
  .required();
