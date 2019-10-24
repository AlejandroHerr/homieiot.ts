import Joi from '@hapi/joi';

export default Joi.string().regex(/(^[0-9a-z]{1,2}$)|(^[0-9a-z][0-9a-z-]+[0-9a-z]$)/);
