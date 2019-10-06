import Datatype from '../Datatype';

import propertyValueSchema from './propertyValueSchema';

describe('homie/domain/validation/propertyValueSchema', () => {
  test('should validate the a value against integer Datatype', () => {
    expect(
      propertyValueSchema(new Datatype({ datatype: 'integer' })).validate(7, { convert: false }),
    ).not.toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'integer', format: [6, 8] })).validate(7, { convert: false }),
    ).not.toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'integer' })).validate(undefined, {
        convert: false,
      }),
    ).toHaveProperty('error', expect.any(Error));
    expect(propertyValueSchema(new Datatype({ datatype: 'integer' })).validate(7.1, { convert: false })).toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(
      propertyValueSchema(new Datatype({ datatype: 'integer', format: [0, 5] })).validate(7, { convert: false }),
    ).toHaveProperty('error', expect.any(Error));
  });
  test('should validate the a value against float Datatype', () => {
    expect(propertyValueSchema(new Datatype({ datatype: 'float' })).validate(7, { convert: false })).not.toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(
      propertyValueSchema(new Datatype({ datatype: 'float' })).validate(7.1, { convert: false }),
    ).not.toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'float', format: [6, 8] })).validate(7, { convert: false }),
    ).not.toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'float' })).validate(undefined, { convert: false }),
    ).toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'float', format: [0, 5] })).validate(7, { convert: false }),
    ).toHaveProperty('error', expect.any(Error));
  });
  test('should validate the a value against color Datatype', () => {
    expect(
      propertyValueSchema(new Datatype({ datatype: 'color', format: 'hsv' })).validate('123,121,0', { convert: false }),
    ).not.toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'color', format: 'hsv' })).validate('123', { convert: false }),
    ).toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'color', format: 'hsv' })).validate(undefined, { convert: false }),
    ).toHaveProperty('error', expect.any(Error));
  });
  test('should validate the a value against enum Datatype', () => {
    expect(
      propertyValueSchema(new Datatype({ datatype: 'enum', format: ['value0', 'value1'] })).validate('value0', {
        convert: false,
      }),
    ).not.toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'enum', format: [0, 1, 2] })).validate(1, { convert: false }),
    ).not.toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'enum', format: ['value0', 'value2'] })).validate('value1', {
        convert: false,
      }),
    ).toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'enum', format: [1, 3] })).validate(undefined, { convert: false }),
    ).toHaveProperty('error', expect.any(Error));
  });
  test('should validate the a value against string Datatype', () => {
    expect(
      propertyValueSchema(new Datatype({ datatype: 'string' })).validate('test', { convert: false }),
    ).not.toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'string' })).validate('', { convert: false }),
    ).not.toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'string' })).validate(undefined, { convert: false }),
    ).toHaveProperty('error', expect.any(Error));
  });
  test('should validate the a value against boolean Datatype', () => {
    expect(
      propertyValueSchema(new Datatype({ datatype: 'boolean' })).validate(false, { convert: false }),
    ).not.toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'boolean' })).validate('false', { convert: false }),
    ).toHaveProperty('error', expect.any(Error));
    expect(
      propertyValueSchema(new Datatype({ datatype: 'boolean' })).validate(undefined, { convert: false }),
    ).toHaveProperty('error', expect.any(Error));
  });
});
