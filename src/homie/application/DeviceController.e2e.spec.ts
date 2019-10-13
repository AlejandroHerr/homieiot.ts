import waitForExpect from 'wait-for-expect';
import { AsyncMqttClient } from 'async-mqtt';

import ApplicationError from '../../core/application/ApplicationError';
import asyncConnect from '../../core/infrastructure/asyncConnect';
import setupMqttMessageSpy from '../../tests/setupMqttMessageSpy';

import Device from '../domain/Device';
import DevicePropsDTO from '../dto/DevicePropsDTO';

import HomieController from './HomieController';

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

const setup = async (deviceProps: DevicePropsDTO) => {
  const { mqttMessageSpy } = setupMqttMessageSpy(mqttClient, `homie/${deviceProps.deviceId}/#`);

  const deviceController = await HomieController.create({ mqttOptions }).createDevice(deviceProps);

  await waitForExpect(() => {
    expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$homie`, '4.0.0');
    expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$state`, 'ready');
  });

  mqttMessageSpy.mockClear();

  return { deviceController, mqttMessageSpy };
};

describe('homie/application/DeviceController', () => {
  describe('setState', () => {
    it('should change the state of the device and publish the statuss', async () => {
      const deviceProps = { deviceId: 'homie-controller--set-state--ok-test', name: 'Device for Testing' };

      const { deviceController, mqttMessageSpy } = await setup(deviceProps);

      await deviceController.setState('sleeping');

      await waitForExpect(() => {
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$state`, 'sleeping');
      });

      await deviceController.homiePublisher.disconnect(deviceController.device);
    });

    it('should throw an application error if the operation failes', async () => {
      const deviceProps = { deviceId: 'homie-controller--set-state--fail-test', name: 'Device for Testing' };

      const { deviceController } = await setup(deviceProps);

      expect(deviceController.setState('sleep' as Device['state'])).rejects.toBeInstanceOf(ApplicationError);

      await deviceController.homiePublisher.disconnect(deviceController.device);
    });
  });
  describe('addNode', () => {
    it('should add and publish the Node', async () => {
      const deviceProps = { deviceId: 'homie-controller--add-node--ok-test', name: 'Device for Testing' };
      const nodeProps0 = { nodeId: 'node0', name: 'Test Node 0', type: 'test' };
      const nodeProps1 = { nodeId: 'node1', name: 'Test Node 1', type: 'test' };

      const { deviceController, mqttMessageSpy } = await setup(deviceProps);

      await deviceController.addNode(nodeProps0);

      await waitForExpect(() => {
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$nodes`, nodeProps0.nodeId);
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${deviceProps.deviceId}/${nodeProps0.nodeId}/$name`,
          nodeProps0.name,
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${deviceProps.deviceId}/${nodeProps0.nodeId}/$type`,
          nodeProps0.type,
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${deviceProps.deviceId}/${nodeProps0.nodeId}/$properties`,
          '',
        );
      });

      mqttMessageSpy.mockClear();

      await deviceController.addNode(nodeProps1);

      await waitForExpect(() => {
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${deviceProps.deviceId}/$nodes`,
          `${nodeProps0.nodeId},${nodeProps1.nodeId}`,
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${deviceProps.deviceId}/${nodeProps1.nodeId}/$name`,
          nodeProps1.name,
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${deviceProps.deviceId}/${nodeProps1.nodeId}/$type`,
          nodeProps1.type,
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${deviceProps.deviceId}/${nodeProps1.nodeId}/$properties`,
          '',
        );
      });

      await deviceController.homiePublisher.disconnect(deviceController.device);
    });

    it('should throw an error if operation fails', async () => {
      const deviceProps = { deviceId: 'homie-controller--add-node--ok-test', name: 'Device for Testing' };
      const nodeProps = { nodeId: 'NODE0', name: 'Test Node 0', type: 'test' };

      const { deviceController } = await setup(deviceProps);

      expect(deviceController.addNode(nodeProps)).rejects.toBeInstanceOf(ApplicationError);

      await deviceController.homiePublisher.disconnect(deviceController.device);
    });
  });
  describe('disconnect', () => {
    it('should change the state of the device to disconnected and close the connection', async () => {
      const deviceProps = { deviceId: 'homie-controller--disconnect--ok-test', name: 'Device for Testing' };

      const { deviceController, mqttMessageSpy } = await setup(deviceProps);

      await deviceController.disconnect();

      await waitForExpect(() => {
        expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${deviceProps.deviceId}/$state`, 'disconnected');
      });

      expect(deviceController.disconnect()).rejects.toBeInstanceOf(ApplicationError);
    });
  });
});
