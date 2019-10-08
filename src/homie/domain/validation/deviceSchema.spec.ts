import Node from '../Node';

import deviceSchema from './deviceSchema';

describe('homie/domain/validation/deviceSchema', () => {
  test('should validate the props', () => {
    expect(
      deviceSchema.validate(
        {
          deviceId: 'deviceid',
          homie: '4.0.0',
          name: 'My Node',
          state: 'ready',
          nodes: [],
          extensions: '',
        },
        { convert: false, abortEarly: false },
      ),
    ).not.toHaveProperty('error', expect.any(Error));

    expect(
      deviceSchema.validate(
        {
          deviceId: 'deviceid',
          homie: '4.0.0',
          name: 'My Node',
          state: 'ready',
          // @ts-ignore
          nodes: [new Node({}, 'id')],
          extensions: '',
        },
        { convert: false, abortEarly: false },
      ),
    ).not.toHaveProperty('error', expect.any(Error));

    const validateResult = deviceSchema.validate(
      {
        deviceId: 'deviceId',
        homie: '4.0',
        state: 'error',
        nodes: [{}],
      },
      { convert: false, abortEarly: false },
    );

    expect(validateResult).toHaveProperty('error', expect.any(Error));

    expect(validateResult.error.details.find(({ path }) => path.includes('deviceId'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('homie'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('name'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('state'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('nodes'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('extensions'))).toBeTruthy();
  });
});
