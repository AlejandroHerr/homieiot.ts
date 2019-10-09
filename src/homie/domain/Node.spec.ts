import Node from './Node';

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
