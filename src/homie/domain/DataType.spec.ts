import Datatype from './Datatype';

describe('homie/domain/Datatype', () => {
  describe('create', () => {
    it('it should validate the props and return the result', () => {
      expect(Datatype.create({ datatype: 'integer' })).toHaveProperty('value', expect.any(Datatype));
      expect(Datatype.create({ datatype: 'integer', format: [-13, 20] })).toHaveProperty('value', expect.any(Datatype));
      expect(Datatype.create({ datatype: 'integer', format: ['-13', '20'] })).toHaveProperty(
        'error',
        expect.any(Error),
      );
      expect(Datatype.create({ datatype: 'integer', format: [-13] })).toHaveProperty('error', expect.any(Error));
    });
  });
});
