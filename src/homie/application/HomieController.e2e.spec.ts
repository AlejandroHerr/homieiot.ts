import waitForExpect from 'wait-for-expect';
import { AsyncMqttClient } from 'async-mqtt';

import HomieController from './HomieController';
import asyncConnect from '../../core/infrastructure/asyncConnect';
import setupMqttMessageSpy from '../../tests/setupMqttMessageSpy';
import DeviceController from './DeviceController';
import ApplicationError from '../../core/application/ApplicationError';

const mqttOptions = {
  host: process.env.MQTT_HOST as string,
  port: parseInt(process.env.MQTT_PORT as string, 10),
  protocol: process.env.MQTT_PROTOCOL as 'wss' | 'ws' | 'mqtt' | 'mqtts' | 'tcp' | 'ssl' | 'wx' | 'wxs',
};

let mqttClient!: AsyncMqttClient;

beforeAll(async () => {
  mqttClient = await asyncConnect({ ...mqttOptions, resubscribe: false });
});
afterAll(async () => {
  await mqttClient.end();
});

describe('homie/application/HomieController', () => {
  describe('createDevice', () => {
    it(`when a device is created, then device is published and a DeviceController is returned`, async () => {
      const deviceProps = { deviceId: 'homiecontroller-createdevice-ok-test', name: 'Device for Testing' };

      const { mqttMessageSpy } = setupMqttMessageSpy(mqttClient, `homie/${deviceProps.deviceId}/#`);

      const homieController = HomieController.create({ mqttOptions });

      const deviceController = await homieController.createDevice(deviceProps);

      expect(deviceController).toBeInstanceOf(DeviceController);

      await waitForExpect(() => {
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$homie`, '4.0.0');
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$name`, deviceProps.name);
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$nodes`, '');
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$extensions`, '');
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$state`, 'ready');
      });

      // @ts-ignore
      await homieController.homiePublisher.disconnect(deviceProps);
    });

    it('when a device is creation failes, then it should throw an error', () => {
      const homieController = HomieController.create({ mqttOptions });

      const deviceProps = { deviceId: 'homiecontroller-createdevice-FAIL-test', name: 'Device for Testing' };

      expect(homieController.createDevice(deviceProps)).rejects.toBeInstanceOf(ApplicationError);
    });
  });
});
