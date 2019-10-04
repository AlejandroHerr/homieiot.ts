import waitForExpect from 'wait-for-expect';
import { AsyncMqttClient } from 'async-mqtt';

import HomieController from './homie/application/HomieController';
import asyncConnect from './core/infrastructure/asyncConnect';

const mqttOptions = {
  host: process.env.MQTT_HOST as string,
  port: parseInt(process.env.MQTT_PORT as string, 10),
  protocol: process.env.MQTT_PROTOCOL as 'wss' | 'ws' | 'mqtt' | 'mqtts' | 'tcp' | 'ssl' | 'wx' | 'wxs',
};

let mqttClient!: AsyncMqttClient;

const setupMqttMessageSpy = (): { mqttMessageSpy: jest.Mock<void, [string, string]> } => {
  const mqttMessageSpy = jest.fn<void, [string, string]>();

  mqttClient.subscribe('#');
  mqttClient.on('message', (topic, message) => mqttMessageSpy(topic, message.toString()));

  return { mqttMessageSpy };
};

beforeAll(async () => {
  mqttClient = await asyncConnect({ ...mqttOptions, resubscribe: false });
});
afterAll(async () => {
  await mqttClient.end();
});

describe('homie.ts', () => {
  describe('Device', () => {
    it('when a device is created, then device attributes are published', async () => {
      const { mqttMessageSpy } = setupMqttMessageSpy();

      const homieController = HomieController.create({ mqttOptions });

      const deviceProps = { deviceId: 'testDevice0', name: 'Device for Testing' };

      const deviceController = await homieController.createDevice(deviceProps);

      await waitForExpect(() => {
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$homie`, '4.0.0');
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$name`, deviceProps.name);
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$nodes`, '');
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$extensions`, '');
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$state`, 'ready');
      });

      await deviceController.disconnect();
    });

    it('when the state of a device changes, then the update is published', async () => {
      const { mqttMessageSpy } = setupMqttMessageSpy();

      const homieController = HomieController.create({ mqttOptions });

      const deviceProps = { deviceId: 'testDevice1', name: 'Device for Testing' };

      const deviceController = await homieController.createDevice(deviceProps);

      mqttMessageSpy.mockClear();

      await deviceController.updateState('disconnected');

      await waitForExpect(() => {
        expect(mqttMessageSpy).toHaveBeenLastCalledWith(`homie/${deviceProps.deviceId}/$state`, 'disconnected');
      });

      await deviceController.disconnect();
    });

    it('when a node is added to the device, then node attribute and the now are published', async () => {
      const { mqttMessageSpy } = setupMqttMessageSpy();

      const homieController = HomieController.create({ mqttOptions });

      const deviceProps = { deviceId: 'testDevice2', name: 'Device for Testing' };
      const nodeProps = { nodeId: 'testNode2', name: 'Node for Testing', type: 'test' };

      const deviceController = await homieController.createDevice(deviceProps);

      await deviceController.addNode(nodeProps);

      await waitForExpect(() => {
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$nodes`, nodeProps.nodeId);

        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${deviceProps.deviceId}/${nodeProps.nodeId}/$name`,
          nodeProps.name,
        );

        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${deviceProps.deviceId}/${nodeProps.nodeId}/$type`,
          nodeProps.type,
        );

        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${deviceProps.deviceId}/${nodeProps.nodeId}/$properties`,
          '',
        );
      });

      await deviceController.disconnect();
    });
  });
});
