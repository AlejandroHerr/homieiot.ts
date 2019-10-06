import datatypeSchema from './datatypeSchema';

describe('homie/domain/validation/datatypeSchema', () => {
  test('should validate integer Datatype according to homie spec', () => {
    expect(datatypeSchema.validate({ datatype: 'integer' }, { convert: false })).not.toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(datatypeSchema.validate({ datatype: 'integer', format: [-13, 20] }, { convert: false })).not.toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(datatypeSchema.validate({ datatype: 'integer', format: ['-13', '20'] }, { convert: false })).toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(datatypeSchema.validate({ datatype: 'integer', format: [-13] }, { convert: false })).toHaveProperty(
      'error',
      expect.any(Error),
    );
  });
  test('should validate float Datatype according to homie spec', () => {
    expect(datatypeSchema.validate({ datatype: 'float' }, { convert: false })).not.toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(datatypeSchema.validate({ datatype: 'float', format: [-13, 20] }, { convert: false })).not.toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(datatypeSchema.validate({ datatype: 'float', format: ['-13', '20'] }, { convert: false })).toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(datatypeSchema.validate({ datatype: 'float', format: [-13] }, { convert: false })).toHaveProperty(
      'error',
      expect.any(Error),
    );
  });
  test('should validate color Datatype according to homie spec', () => {
    expect(datatypeSchema.validate({ datatype: 'color' }, { convert: false })).not.toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(datatypeSchema.validate({ datatype: 'color', format: 'hsv' }, { convert: false })).not.toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(datatypeSchema.validate({ datatype: 'color', format: 'adobe' }, { convert: false })).toHaveProperty(
      'error',
      expect.any(Error),
    );
  });
  test('should validate enum Datatype according to homie spec', () => {
    expect(
      datatypeSchema.validate({ datatype: 'enum', format: ['a', 'b', 'c'] }, { convert: false }),
    ).not.toHaveProperty('error', expect.any(Error));
    expect(datatypeSchema.validate({ datatype: 'enum', format: 'a,b,c' }, { convert: false })).toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(datatypeSchema.validate({ datatype: 'enum' }, { convert: false })).toHaveProperty(
      'error',
      expect.any(Error),
    );
  });
  test('should validate string Datatype according to homie spec', () => {
    expect(datatypeSchema.validate({ datatype: 'string' }, { convert: false })).not.toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(datatypeSchema.validate({ datatype: 'string', format: 'a,b,c' }, { convert: false })).toHaveProperty(
      'error',
      expect.any(Error),
    );
  });
  test('should validate boolean Datatype according to homie spec', () => {
    expect(datatypeSchema.validate({ datatype: 'boolean' }, { convert: false })).not.toHaveProperty(
      'error',
      expect.any(Error),
    );
    expect(datatypeSchema.validate({ datatype: 'boolean', format: 'a,b,c' }, { convert: false })).toHaveProperty(
      'error',
      expect.any(Error),
    );
  });
});
