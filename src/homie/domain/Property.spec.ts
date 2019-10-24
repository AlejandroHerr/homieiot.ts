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
    it('should create a Property', () => {
      const datatype = new Datatype({ datatype: 'integer', format: [0, 10] });
      const propertyOrError = Property.create({
        deviceId: 'device0',
        nodeId: 'node0',
        propertyId: 'property0',
        datatype,
        name: 'Test Property',
        settable: true,
        retained: false,
        unit: 'dB',
        value: 7,
      });

      expect(propertyOrError.succeded()).toBeTruthy();
      expect(propertyOrError).toHaveProperty('value', expect.any(Property));
      expect(propertyOrError).toHaveProperty(['value', 'id'], 'device0/node0/property0');
      expect(propertyOrError).toHaveProperty(['value', 'deviceId'], 'device0');
      expect(propertyOrError).toHaveProperty(['value', 'nodeId'], 'node0');
      expect(propertyOrError).toHaveProperty(['value', 'propertyId'], 'property0');
      expect(propertyOrError).toHaveProperty(['value', 'datatype'], datatype);
      expect(propertyOrError).toHaveProperty(['value', 'name'], 'Test Property');
      expect(propertyOrError).toHaveProperty(['value', 'settable'], true);
      expect(propertyOrError).toHaveProperty(['value', 'retained'], false);
      expect(propertyOrError).toHaveProperty(['value', 'unit'], 'dB');
      expect(propertyOrError).toHaveProperty(['value', 'value'], 7);
    });

    it('should create a Property with default values', () => {
      const datatype = new Datatype({ datatype: 'boolean' });
      const propertyOrError = Property.create({
        deviceId: 'device0',
        nodeId: 'node0',
        propertyId: 'property0',
        datatype,
      });

      expect(propertyOrError.succeded()).toBeTruthy();
      expect(propertyOrError).toHaveProperty('value', expect.any(Property));
      expect(propertyOrError).toHaveProperty(['value', 'id'], 'device0/node0/property0');
      expect(propertyOrError).toHaveProperty(['value', 'deviceId'], 'device0');
      expect(propertyOrError).toHaveProperty(['value', 'nodeId'], 'node0');
      expect(propertyOrError).toHaveProperty(['value', 'propertyId'], 'property0');
      expect(propertyOrError).toHaveProperty(['value', 'datatype'], datatype);
      expect(propertyOrError).toHaveProperty(['value', 'name'], '');
      expect(propertyOrError).toHaveProperty(['value', 'settable'], false);
      expect(propertyOrError).toHaveProperty(['value', 'retained'], true);
      expect(propertyOrError).toHaveProperty(['value', 'unit'], undefined);
      expect(propertyOrError).toHaveProperty(['value', 'value'], '');
    });

    it('should validate the props', () => {
      expect(
        Property.create({
          deviceId: 'deviceID',
          nodeId: 'nodeid',
          propertyId: 'propertyid',
          datatype: new Datatype({ datatype: 'string' }),
          name: 'My Type',
          settable: false,
          retained: true,
        }).failed(),
      ).toBeTruthy();

      expect(
        Property.create({
          deviceId: 'deviceid',
          nodeId: 'nodeid',
          propertyId: 'propertyid',
          datatype: new Datatype({ datatype: 'string' }),
          name: 'My Type',
          settable: false,
          retained: true,
          value: 7,
        }).failed(),
      ).toBeTruthy();
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
