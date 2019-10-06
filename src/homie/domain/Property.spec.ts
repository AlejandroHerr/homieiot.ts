import Datatype from './Datatype';
import generateUUID from './generateUUID';
import Property, { PropertyProps } from './Property';

const createProperty = (props: { datatype: Datatype } & Partial<PropertyProps>): Property => {
  const defaultProps = {
    deviceId: 'deviceId',
    nodeId: 'nodeId',
    propertyId: 'propertyId',
    name: '',
    settable: false,
    retained: true,
    value: '',
  };

  return new Property({ ...props, ...defaultProps }, generateUUID({ ...defaultProps, ...props }));
};

describe('homie/domain/Property', () => {
  describe('create', () => {
    it('should validate the props', () => {
      expect(
        Property.create({
          deviceId: 'deviceid',
          nodeId: 'nodeid',
          propertyId: 'propertyid',
          datatype: new Datatype({ datatype: 'string' }),
          name: 'My Type',
          settable: false,
          retained: true,
        }),
      ).toHaveProperty('value', expect.any(Property));
      expect(
        Property.create({
          deviceId: 'deviceID',
          nodeId: 'nodeid',
          propertyId: 'propertyid',
          datatype: new Datatype({ datatype: 'string' }),
          name: 'My Type',
          settable: false,
          retained: true,
        }),
      ).toHaveProperty('error', expect.any(Error));
    });
    it('should validate the props and the value if it is provided', () => {
      expect(
        Property.create({
          deviceId: 'deviceid',
          nodeId: 'nodeid',
          propertyId: 'propertyid',
          datatype: new Datatype({ datatype: 'float', format: [1, 2] }),
          name: 'My Type',
          settable: false,
          retained: true,
          value: 1.5,
        }),
      ).toHaveProperty('value', expect.any(Property));
      expect(
        Property.create({
          deviceId: 'deviceid',
          nodeId: 'nodeid',
          propertyId: 'propertyid',
          datatype: new Datatype({ datatype: 'float', format: [1, 2] }),
          name: 'My Type',
          settable: false,
          retained: true,
          value: 5,
        }),
      ).toHaveProperty('error', expect.any(Error));
    });
    it('should create the Property with default props', () => {
      const property = Property.create({
        deviceId: 'deviceid',
        nodeId: 'nodeid',
        propertyId: 'propertyid',
        datatype: new Datatype({ datatype: 'string' }),
      });

      expect(property.value as Property).toHaveProperty('name', '');
      expect(property.value as Property).toHaveProperty('settable', false);
      expect(property.value as Property).toHaveProperty('retained', true);
      expect(property.value as Property).toHaveProperty('value', '');
    });
  });
  describe('setValue', () => {
    it("should validate the new value agains Property's datatype", () => {
      expect(createProperty({ datatype: new Datatype({ datatype: 'integer' }) }).setValue(7)).not.toHaveProperty(
        'error',
        expect.any(Error),
      );

      expect(
        createProperty({ datatype: new Datatype({ datatype: 'integer', format: [0, 5] }) }).setValue(7),
      ).toHaveProperty('error', expect.any(Error));
    });
  });
});
