import Node from './Node';

describe('homie/domain/Node', () => {
  describe('create', () => {
    it('should validate the props', () => {
      expect(
        Node.create({
          deviceId: 'deviceid',
          nodeId: 'nodeid',
          name: 'Test node',
          type: 'test',
          properties: [],
        }),
      ).toHaveProperty('value', expect.any(Node));
      expect(
        Node.create({
          deviceId: 'deviceID',
          nodeId: 'nodeid',
          name: 'My Type',
          properties: [],
        }),
      ).toHaveProperty('error', expect.any(Error));
    });

    it('should create the Node with default props', () => {
      const node = Node.create({
        deviceId: 'deviceid',
        nodeId: 'nodeid',
      });

      expect(node.value as Node).toHaveProperty('name', '');
      expect(node.value as Node).toHaveProperty('type', '');
      expect(node.value as Node).toHaveProperty('properties', []);
    });
  });
});
