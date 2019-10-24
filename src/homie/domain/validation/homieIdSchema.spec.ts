import homieIdSchema from './homieIdSchema';

describe('homie/domain/validation/homieIdSchema', () => {
  test('should validate right homie ids', () => {
    expect(homieIdSchema.validate('0')).not.toHaveProperty('error', expect.any(Error));
    expect(homieIdSchema.validate('0h')).not.toHaveProperty('error', expect.any(Error));
    expect(homieIdSchema.validate('homie-id')).not.toHaveProperty('error', expect.any(Error));
    expect(homieIdSchema.validate('homie-id0')).not.toHaveProperty('error', expect.any(Error));

    expect(homieIdSchema.validate('')).toHaveProperty('error', expect.any(Error));
    expect(homieIdSchema.validate('-homieid')).toHaveProperty('error', expect.any(Error));
    expect(homieIdSchema.validate('homie-id-')).toHaveProperty('error', expect.any(Error));
    expect(homieIdSchema.validate('homie-id0?')).toHaveProperty('error', expect.any(Error));
  });
});
