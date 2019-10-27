import waitForExpect from 'wait-for-expect';

import asyncConnect from '../../core/infrastructure/asyncConnect';
import MqttClient from '../../core/infrastructure/MqttClient';
import MqttConnectionManager from '../../core/infrastructure/MqttConnectionManager';

import Device from '../domain/Device';
import Node from '../domain/Node';
import Property from '../domain/Property';
import Datatype from '../domain/Datatype';

import HomiePublisher from './HomiePublisher';

const mqttConnectionManager = new MqttConnectionManager({
  mqttConnect: asyncConnect,
  options: {
    host: process.env.MQTT_HOST as string,
    port: parseInt(process.env.MQTT_PORT as string, 10),
    protocol: process.env.MQTT_PROTOCOL as 'wss' | 'ws' | 'mqtt' | 'mqtts' | 'tcp' | 'ssl' | 'wx' | 'wxs',
    resubscribe: false,
  },
});

const generateTestId = (prefix = 'test-device'): string => `${prefix}--${Math.floor(Math.random() * 10000)}`;

const setupMqtttMessageSpy = async (deviceId: string): Promise<jest.Mock> => {
  const clientId = generateTestId('listener');
  const client = await mqttConnectionManager.createClient({ clientId }).then(result => result.value as MqttClient);

  const listener = jest.fn();

  await client.subscribe(`homie/${deviceId}/#`);

  client.on('message', (topic, message) => {
    listener(topic, message.toString());
  });

  return listener;
};

afterEach(() => mqttConnectionManager.removeAllClients());

describe('homie/services/HomiePublisher', () => {
  describe('static create', () => {
    it('should create an instance of HomiePublisher', () => {
      const homiePublisher = HomiePublisher.create({ mqttConnectionManager });

      expect(homiePublisher).toBeInstanceOf(HomiePublisher);
    });
  });
  describe('publishDevice', () => {
    it('should publish the device', async () => {
      const device = Device.create({
        deviceId: generateTestId(),
        name: 'test name',
      }).value as Device;

      const listener = await setupMqtttMessageSpy(device.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishDevice(device);

      expect(result.succeded()).toBeTruthy();

      await waitForExpect(() => {
        const baseTopic = `homie/${device.deviceId}`;

        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$homie`, `${device.homie}`);
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$name`, `${device.name}`);
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$state`, `${device.state}`);
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$nodes`, '');
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$extensions`, '');
      });
    });

    it('should publish the device when the client already exists', async () => {
      const device = Device.create({
        deviceId: generateTestId(),
        name: 'test name',
      }).value as Device;

      await mqttConnectionManager.createClient({ clientId: device.deviceId });
      const listener = await setupMqtttMessageSpy(device.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishDevice(device);

      expect(result.succeded()).toBeTruthy();

      await waitForExpect(() => {
        const baseTopic = `homie/${device.deviceId}`;

        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$homie`, `${device.homie}`);
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$name`, `${device.name}`);
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$state`, `${device.state}`);
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$nodes`, '');
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$extensions`, '');
      });
    });

    it.skip('should return a failed result if client does not exist', async () => {
      const device = Device.create({
        deviceId: generateTestId(),
      }).value as Device;

      const listener = await setupMqtttMessageSpy(device.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishDevice(device);

      expect(result.failed()).toBeTruthy();
      expect(result).toHaveProperty('error', `Client ${device.deviceId} does not exist`);
      expect(listener).not.toHaveBeenCalled();
    });
  });
  describe('publishDeviceState', () => {
    it("should publish the message for device's state", async () => {
      const device = Device.create({
        deviceId: generateTestId(),
        state: 'init',
      }).value as Device;

      await mqttConnectionManager.createClient({ clientId: device.deviceId });
      const listener = await setupMqtttMessageSpy(device.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishDeviceState(device);

      expect(result.succeded()).toBeTruthy();

      await waitForExpect(() => {
        expect(listener).toHaveBeenCalledWith(`homie/${device.deviceId}/$state`, device.state);
      });
    });

    it('should return a failed result if client does not exist', async () => {
      const device = Device.create({
        deviceId: generateTestId(),
      }).value as Device;

      const listener = await setupMqtttMessageSpy(device.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishDeviceState(device);

      expect(result.failed()).toBeTruthy();
      expect(result).toHaveProperty('error', `Client ${device.deviceId} does not exist`);
      expect(listener).not.toHaveBeenCalled();
    });
  });
  describe('publishDeviceNodes', () => {
    it("should publish the message for devices's nodes", async () => {
      const device = Device.create({
        deviceId: generateTestId(),
      }).value as Device;

      device.addNode(Node.create({
        deviceId: generateTestId(),
        nodeId: 'nodeid0',
      }).value as Node);
      device.addNode(Node.create({
        deviceId: generateTestId(),
        nodeId: 'nodeid1',
      }).value as Node);

      await mqttConnectionManager.createClient({ clientId: device.deviceId });
      const listener = await setupMqtttMessageSpy(device.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishDeviceNodes(device);

      expect(result.succeded()).toBeTruthy();

      await waitForExpect(() => {
        expect(listener).toHaveBeenCalledWith(
          `homie/${device.deviceId}/$nodes`,
          `${device.nodes.map(({ nodeId }) => nodeId).join(',')}`,
        );
      });
    });

    it('should return a failed result if client does not exist', async () => {
      const device = Device.create({
        deviceId: generateTestId(),
      }).value as Device;

      const listener = await setupMqtttMessageSpy(device.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishDeviceNodes(device);

      expect(result.failed()).toBeTruthy();
      expect(result).toHaveProperty('error', `Client ${device.deviceId} does not exist`);
      expect(listener).not.toHaveBeenCalled();
    });
  });
  describe('publishNode', () => {
    it('should publish the node', async () => {
      const node = Node.create({
        deviceId: generateTestId(),
        nodeId: 'nodeid',
        name: 'test name',
        type: 'test node',
      }).value as Node;

      await mqttConnectionManager.createClient({ clientId: node.deviceId });
      const listener = await setupMqtttMessageSpy(node.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishNode(node);

      expect(result.succeded()).toBeTruthy();

      await waitForExpect(() => {
        const baseTopic = `homie/${node.deviceId}/${node.nodeId}`;

        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$name`, `${node.name}`);
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$type`, `${node.type}`);
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$properties`, '');
      });
    });

    it('should return a failed result if client does not exist', async () => {
      const node = Node.create({
        deviceId: generateTestId(),
        nodeId: 'nodeid',
      }).value as Node;

      const listener = await setupMqtttMessageSpy(node.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishNode(node);

      expect(result.failed()).toBeTruthy();
      expect(result).toHaveProperty('error', `Client ${node.deviceId} does not exist`);
      expect(listener).not.toHaveBeenCalled();
    });
  });
  describe('publisNodeProperties', () => {
    it("should publish the message for nodes's properties", async () => {
      const node = Node.create({
        deviceId: generateTestId(),
        nodeId: 'nodeid',
      }).value as Node;

      node.addProperty(Property.create({
        deviceId: node.deviceId,
        nodeId: node.nodeId,
        propertyId: 'propertyid0',
        datatype: Datatype.create({ datatype: 'integer' }).value as Datatype,
      }).value as Property);
      node.addProperty(Property.create({
        deviceId: node.deviceId,
        nodeId: node.nodeId,
        propertyId: 'propertyid1',
        datatype: Datatype.create({ datatype: 'integer' }).value as Datatype,
      }).value as Property);

      await mqttConnectionManager.createClient({ clientId: node.deviceId });
      const listener = await setupMqtttMessageSpy(node.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publisNodeProperties(node);

      expect(result.succeded()).toBeTruthy();

      await waitForExpect(() => {
        expect(listener).toHaveBeenCalledWith(
          `homie/${node.deviceId}/${node.nodeId}/$properties`,
          `${node.properties.map(({ propertyId }) => propertyId).join(',')}`,
        );
      });
    });

    it('should return a failed result if client does not exist', async () => {
      const node = Node.create({
        deviceId: generateTestId(),
        nodeId: 'nodeid',
      }).value as Node;

      const listener = await setupMqtttMessageSpy(node.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publisNodeProperties(node);

      expect(result.failed()).toBeTruthy();
      expect(result).toHaveProperty('error', `Client ${node.deviceId} does not exist`);
      expect(listener).not.toHaveBeenCalled();
    });
  });
  describe('publishProperty', () => {
    it('should publish the property', async () => {
      const property = Property.create({
        deviceId: generateTestId(),
        nodeId: 'nodeid',
        propertyId: 'propertyid',
        name: 'testProp',
        datatype: Datatype.create({ datatype: 'integer', format: [0, 100] }).value as Datatype,
        value: 7,
        unit: 'm',
      }).value as Property;

      await mqttConnectionManager.createClient({ clientId: property.deviceId });
      const listener = await setupMqtttMessageSpy(property.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishProperty(property);

      expect(result.succeded()).toBeTruthy();

      await waitForExpect(() => {
        const baseTopic = `homie/${property.deviceId}/${property.nodeId}/${property.propertyId}`;
        expect(listener).toHaveBeenCalledWith(baseTopic, `${property.value}`);
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$name`, `${property.name}`);
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$settable`, `${property.settable}`);
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$retained`, `${property.retained}`);
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$datatype`, `${property.datatype.datatype}`);
        expect(listener).toHaveBeenCalledWith(
          `${baseTopic}/$format`,
          `${(property.datatype.format as number[])[0]},${(property.datatype.format as number[])[1]}`,
        );
        expect(listener).toHaveBeenCalledWith(`${baseTopic}/$unit`, `${property.unit}`);
      });
    });

    it('should return a failed result if client does not exist', async () => {
      const property = Property.create({
        deviceId: generateTestId(),
        nodeId: 'nodeid',
        propertyId: 'propertyid',
        datatype: Datatype.create({ datatype: 'integer' }).value as Datatype,
        value: 7,
      }).value as Property;

      const listener = await setupMqtttMessageSpy(property.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishProperty(property);

      expect(result.failed()).toBeTruthy();
      expect(result).toHaveProperty('error', `Client ${property.deviceId} does not exist`);
      expect(listener).not.toHaveBeenCalled();
    });
  });
  describe('publishPropertyValue', () => {
    it("should publish the message for property's value", async () => {
      const property = Property.create({
        deviceId: generateTestId(),
        nodeId: 'nodeid',
        propertyId: 'propertyid',
        datatype: Datatype.create({ datatype: 'integer' }).value as Datatype,
        value: 7,
      }).value as Property;

      await mqttConnectionManager.createClient({ clientId: property.deviceId });
      const listener = await setupMqtttMessageSpy(property.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishPropertyValue(property);

      expect(result.succeded()).toBeTruthy();

      await waitForExpect(() => {
        expect(listener).toHaveBeenCalledWith(
          `homie/${property.deviceId}/${property.nodeId}/${property.propertyId}`,
          `${property.value}`,
        );
      });
    });

    it('should return a failed result if client does not exist', async () => {
      const property = Property.create({
        deviceId: generateTestId(),
        nodeId: 'nodeid',
        propertyId: 'propertyid',
        datatype: Datatype.create({ datatype: 'integer' }).value as Datatype,
        value: 7,
      }).value as Property;

      const listener = await setupMqtttMessageSpy(property.deviceId);

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      const result = await homiePublisher.publishPropertyValue(property);

      expect(result.failed()).toBeTruthy();
      expect(result).toHaveProperty('error', `Client ${property.deviceId} does not exist`);
      expect(listener).not.toHaveBeenCalled();
    });
  });
  describe('disconnect', () => {
    it('should thisconnect the device client', async () => {
      const device = Device.create({
        deviceId: generateTestId(),
        name: 'test name',
      }).value as Device;

      const homiePublisher = new HomiePublisher({ mqttConnectionManager });

      await homiePublisher.publishDevice(device);

      const mqttClient = mqttConnectionManager.getClient(device.deviceId).value as MqttClient;

      await homiePublisher.disconnect(device);

      expect(mqttClient).toHaveProperty('connected', false);
      expect(mqttConnectionManager.hasClient(device.deviceId)).toBeFalsy();
    });
  });
});
