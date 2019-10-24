import Node from './Node';
import Property from './Property';
import Datatype from './Datatype';

describe('homie/domain/Node', () => {
  describe('create', () => {
    it('should create a Node', () => {
      const nodeOrError = Node.create({
        deviceId: 'device0',
        nodeId: 'node0',
        name: 'Test node',
        type: 'test',
        properties: [],
      });

      expect(nodeOrError.succeded()).toBeTruthy();
      expect(nodeOrError).toHaveProperty('value', expect.any(Node));
      expect(nodeOrError).toHaveProperty(['value', 'id'], 'device0/node0');
      expect(nodeOrError).toHaveProperty(['value', 'deviceId'], 'device0');
      expect(nodeOrError).toHaveProperty(['value', 'nodeId'], 'node0');
      expect(nodeOrError).toHaveProperty(['value', 'name'], 'Test node');
      expect(nodeOrError).toHaveProperty(['value', 'type'], 'test');
      expect(nodeOrError).toHaveProperty(['value', 'properties'], []);
    });

    it('should create the Node with default values', () => {
      const nodeOrError = Node.create({
        deviceId: 'device0',
        nodeId: 'node0',
      });

      expect(nodeOrError.succeded()).toBeTruthy();
      expect(nodeOrError).toHaveProperty('value', expect.any(Node));
      expect(nodeOrError).toHaveProperty(['value', 'id'], 'device0/node0');
      expect(nodeOrError).toHaveProperty(['value', 'deviceId'], 'device0');
      expect(nodeOrError).toHaveProperty(['value', 'nodeId'], 'node0');
      expect(nodeOrError).toHaveProperty(['value', 'name'], '');
      expect(nodeOrError).toHaveProperty(['value', 'type'], '');
      expect(nodeOrError).toHaveProperty(['value', 'properties'], []);
    });

    it('should validate the props', () => {
      expect(
        Node.create({
          deviceId: 'deviceID',
          nodeId: 'node0',
          name: 'My Type',
          properties: [],
        }).failed(),
      ).toBeTruthy();
    });
  });

  describe('addProperty', () => {
    it('should add a new Property to the Node', () => {
      const node = Node.create({ deviceId: 'device0', nodeId: 'node0' }).value as Node;
      const property = Property.create({
        deviceId: 'device0',
        nodeId: node.nodeId,
        propertyId: 'property0',
        datatype: new Datatype({ datatype: 'string' }),
      }).value as Property;

      expect(node.addProperty(property).succeded()).toBeTruthy();
      expect(node.properties.includes(property)).toBeTruthy();
    });

    it('should validate the Property beofre adding it', () => {
      const node = Node.create({ deviceId: 'device0', nodeId: 'node0' }).value as Node;
      const property = { nodeId: node.nodeId, propertyId: 'property0' } as Property;

      expect(node.addProperty(property).failed()).toBeTruthy();
      expect(node.properties.includes(property)).toBeFalsy();
    });

    it('should not allow to add two properties with the same id', () => {
      const node = Node.create({ deviceId: 'device0', nodeId: 'node0' }).value as Node;
      const property0 = Property.create({
        deviceId: node.deviceId,
        nodeId: node.nodeId,
        propertyId: 'property0',
        datatype: new Datatype({ datatype: 'string' }),
      }).value as Property;
      const property1 = Property.create({
        deviceId: node.deviceId,
        nodeId: node.nodeId,
        propertyId: 'property0',
        datatype: new Datatype({ datatype: 'integer' }),
      }).value as Property;

      node.addProperty(property0);

      expect(node.addProperty(property1).failed()).toBeTruthy();
      expect(node.properties.filter(property => property.id === property0.id)).toHaveLength(1);
    });
  });
});
