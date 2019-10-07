import Datatype from '../Datatype';

import nodeSchema from './nodeSchema';
import Property from '../Property';

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

    // const validateResult = nodeSchema.validate(
    //   {
    //     deviceId: 'deviceId',
    //     nodeId: 'nodeId',
    //     propertyId: 'propertyId',
    //     datatype: { datatype: 'string' },
    //     name: 5,
    //     settable: 0,
    //     retained: 'true',
    //   },
    //   { convert: false, abortEarly: false },
    // );

    // expect(validateResult).toHaveProperty('error', expect.any(Error));

    // expect(validateResult.error.details.find(({ path }) => path.includes('deviceId'))).toBeTruthy();
    // expect(validateResult.error.details.find(({ path }) => path.includes('nodeId'))).toBeTruthy();
    // expect(validateResult.error.details.find(({ path }) => path.includes('propertyId'))).toBeTruthy();
    // expect(validateResult.error.details.find(({ path }) => path.includes('datatype'))).toBeTruthy();
    // expect(validateResult.error.details.find(({ path }) => path.includes('name'))).toBeTruthy();
    // expect(validateResult.error.details.find(({ path }) => path.includes('settable'))).toBeTruthy();
    // expect(validateResult.error.details.find(({ path }) => path.includes('retained'))).toBeTruthy();
  });
});
