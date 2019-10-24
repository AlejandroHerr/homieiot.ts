import Datatype from '../Datatype';

import propertySchema from './propertySchema';

describe('homie/domain/validation/propertySchema', () => {
  test('should validate against empty props', () => {
    expect(propertySchema.validate(undefined, { convert: false })).toHaveProperty('error', expect.any(Error));
  });
  test('should validate the props except value', () => {
    expect(
      propertySchema.validate(
        {
          deviceId: 'deviceid',
          nodeId: 'nodeid',
          propertyId: 'propertyid',
          datatype: new Datatype({ datatype: 'string' }),
          name: 'My Type',
          settable: false,
          retained: true,
        },
        { convert: false, abortEarly: false },
      ),
    ).not.toHaveProperty('error', expect.any(Error));

    const validateResult = propertySchema.validate(
      {
        deviceId: 'deviceId',
        nodeId: 'nodeId',
        propertyId: 'propertyId',
        datatype: { datatype: 'string' },
        name: 5,
        settable: 0,
        retained: 'true',
      },
      { convert: false, abortEarly: false },
    );

    expect(validateResult).toHaveProperty('error', expect.any(Error));

    expect(validateResult.error.details.find(({ path }) => path.includes('deviceId'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('nodeId'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('propertyId'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('datatype'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('name'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('settable'))).toBeTruthy();
    expect(validateResult.error.details.find(({ path }) => path.includes('retained'))).toBeTruthy();
  });
});
