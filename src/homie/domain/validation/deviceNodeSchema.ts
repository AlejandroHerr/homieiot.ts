import Joi from '@hapi/joi';

import Node from '../Node';

export default Joi.object()
  .instance(Node)
  .required();
