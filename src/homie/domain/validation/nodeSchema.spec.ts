import Property from '../Property';

import nodeSchema from './nodeSchema';

describe('homie/domain/validation/nodeSchema', () => {
  test('should validate the props', () => {
    expect(
      nodeSchema.validate(
        {
          deviceId: 'deviceid',
          nodeId: 'nodeid',

          name: 'My Node',
          type: 'test',
          properties: [],
        },
        { convert: false, abortEarly: false },
      ),
    ).not.toHaveProperty('error', expect.any(Error));

    expect(
      nodeSchema.validate(
        {
          deviceId: 'deviceid',
          nodeId: 'nodeid',

          name: 'My Node',
          type: 'test',
          // @ts-ignore
          properties: [new Property({}, 'id')],
        },
        { convert: false, abortEarly: false },
      ),
    ).not.toHaveProperty('error', expect.any(Error));
  });
});
