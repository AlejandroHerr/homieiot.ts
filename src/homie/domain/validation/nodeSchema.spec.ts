import Property from '../Property';

import nodeSchema from './nodeSchema';

describe('homie/domain/validation/nodeSchema', () => {
  test('should validate against empty props', () => {
    expect(nodeSchema.validate(undefined, { convert: false })).toHaveProperty('error', expect.any(Error));
  });
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

    const validateResult = nodeSchema.validate(
      {
        deviceId: 'deviceId',
        nodeId: 'nodeId',
        type: 5,
        properties: [{}],
      },
      { convert: false, abortEarly: false },
    );

    expect(validateResult).toHaveProperty('error', expect.any(Error));

    expect(validateResult.error.details.find(({ path }) => path.includes('deviceId'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('nodeId'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('name'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('type'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('properties'))).toBeTruthy();
  });
});
