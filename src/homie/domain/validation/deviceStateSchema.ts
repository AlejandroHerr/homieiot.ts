import Joi from '@hapi/joi';

export default Joi.string().valid('init', 'ready', 'disconnected', 'sleeping', 'lost', 'alert');
