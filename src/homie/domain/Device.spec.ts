import Device from './Device';
import Node from './Node';

describe('homie/domain/Device', () => {
  describe('static create', () => {
    it('should create a Device', () => {
      const deviceOrError = Device.create({ deviceId: 'device0', homie: '4.0.1', name: 'my test device' });

      expect(deviceOrError.succeded()).toBeTruthy();
      expect(deviceOrError).toHaveProperty('value', expect.any(Device));
      expect((deviceOrError.value as Device).id).toBe('device0');
    });
    it('should create a Device with default values', () => {
      const deviceOrError = Device.create({ deviceId: 'device0' });

      expect(deviceOrError.succeded()).toBeTruthy();
      expect(deviceOrError).toHaveProperty('value', expect.any(Device));
      expect((deviceOrError.value as Device).id).toBe('device0');
      expect((deviceOrError.value as Device).homie).toBe('4.0.0');
      expect((deviceOrError.value as Device).name).toBe('');
      expect((deviceOrError.value as Device).state).toBe('ready');
      expect((deviceOrError.value as Device).nodes).toEqual([]);
      expect((deviceOrError.value as Device).extensions).toBe('');
    });
    it('should validate the props', () => {
      const deviceOrError = Device.create({ deviceId: 'device0', homie: '4' });

      expect(deviceOrError.failed()).toBeTruthy();
    });
  });

  describe('updateState', () => {
    it('should update the state of the Device and return an ok result', () => {
      const device = Device.create({ deviceId: 'device0' }).value as Device;

      const result = device.setState('sleeping');

      expect(result.succeded()).toBeTruthy();
      expect(device).toHaveProperty('state', 'sleeping');
    });
    it('should reject invalid states with a failed result', () => {
      const device = Device.create({ deviceId: 'device0' }).value as Device;
      const initialState = device.state;

      // @ts-ignore
      const result = device.setState('sleep');

      expect(result.failed()).toBeTruthy();
      expect(device).toHaveProperty('state', initialState);
    });
  });

  describe('addNode', () => {
    it('should add a new Node to the Device', () => {
      const device = Device.create({ deviceId: 'device0' }).value as Device;
      const node = Node.create({ deviceId: device.deviceId, nodeId: 'node0' }).value as Node;

      expect(device.addNode(node).succeded()).toBeTruthy();
      expect(device.nodes.includes(node)).toBeTruthy();
    });
    it('should validate the Node beofre adding it', () => {
      const device = Device.create({ deviceId: 'device0' }).value as Device;
      const node = { deviceId: device.deviceId, nodeId: 'node0' } as Node;

      expect(device.addNode(node).failed()).toBeTruthy();
      expect(device.nodes.includes(node)).toBeFalsy();
    });
    it('should should not allow to add two nodes with the same id', () => {
      const device = Device.create({ deviceId: 'device0' }).value as Device;
      const node0 = Node.create({ deviceId: device.deviceId, nodeId: 'node0' }).value as Node;
      const node1 = Node.create({ deviceId: device.deviceId, nodeId: 'node0' }).value as Node;

      device.addNode(node0);

      expect(device.addNode(node1).failed()).toBeTruthy();
      expect(device.nodes.filter(node => node.id === node0.id)).toHaveLength(1);
    });
  });
});
