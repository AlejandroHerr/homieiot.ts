import waitForExpect from 'wait-for-expect';
import { AsyncMqttClient } from 'async-mqtt';

import asyncConnect from '../../core/infrastructure/asyncConnect';
import setupMqttMessageSpy from '../../tests/setupMqttMessageSpy';

import NodePropsDTO from '../dto/NodePropsDTO';
import PropertyPropsDTO from '../dto/PropertyPropsDTO';

import HomieController from './HomieController';
import NodeController from './NodeController';

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

const setup = async (
  nodeProps: NodePropsDTO & { deviceId: string },
): Promise<{ nodeController: NodeController; mqttMessageSpy: jest.Mock<void, [string, string]> }> => {
  const { mqttMessageSpy } = setupMqttMessageSpy(mqttClient, `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/#`);

  const deviceController = await HomieController.create({ mqttOptions }).createDevice({ deviceId: nodeProps.deviceId });

  await deviceController.addNode(nodeProps);

  const nodeController = deviceController.getNode(nodeProps.nodeId);

  await waitForExpect(() => {
    expect(mqttMessageSpy).toHaveBeenCalledWith(`homie/${nodeProps.deviceId}/${nodeProps.nodeId}/$properties`, '');
  });

  mqttMessageSpy.mockClear();

  return { nodeController, mqttMessageSpy };
};

describe('homie/application/NodeController', () => {
  describe('addProperty', () => {
    it('should add and publish the new Node', async () => {
      const nodeProps = { deviceId: 'node-controller--add-property--ok-test', nodeId: 'node0' };
      const propertyProps0: PropertyPropsDTO = {
        propertyId: 'prop0',
        name: 'Test Prop 0',
        datatype: { datatype: 'boolean' },
        value: false,
      };
      const propertyProps1: PropertyPropsDTO = {
        propertyId: 'prop1',
        name: 'Test Prop 1',
        datatype: { datatype: 'integer', format: [0, 50] },
        unit: 'Pa',
        value: 10,
      };

      const { nodeController, mqttMessageSpy } = await setup(nodeProps);

      await nodeController.addProperty(propertyProps0);

      await waitForExpect(() => {
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/$properties`,
          propertyProps0.propertyId,
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/${propertyProps0.propertyId}`,
          'false',
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/${propertyProps0.propertyId}/$name`,
          propertyProps0.name,
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/${propertyProps0.propertyId}/$settable`,
          'false',
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/${propertyProps0.propertyId}/$retained`,
          'true',
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/${propertyProps0.propertyId}/$datatype`,
          propertyProps0.datatype.datatype,
        );
      });

      mqttMessageSpy.mockClear();

      await nodeController.addProperty(propertyProps1);

      await waitForExpect(() => {
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/$properties`,
          `${propertyProps0.propertyId},${propertyProps1.propertyId}`,
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/${propertyProps1.propertyId}`,
          `${propertyProps1.value}`,
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/${propertyProps1.propertyId}/$name`,
          propertyProps1.name,
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/${propertyProps1.propertyId}/$settable`,
          'false',
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/${propertyProps1.propertyId}/$retained`,
          'true',
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/${propertyProps1.propertyId}/$datatype`,
          propertyProps1.datatype.datatype,
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/${propertyProps1.propertyId}/$format`,
          (propertyProps1.datatype.format as number[]).join(','),
        );
        expect(mqttMessageSpy).toHaveBeenCalledWith(
          `homie/${nodeProps.deviceId}/${nodeProps.nodeId}/${propertyProps1.propertyId}/$unit`,
          propertyProps1.unit,
        );
      });
    });

    describe('hasNode', () => {
      it('should return a boolean indicating if the Device has a node with the specified nodeId', async () => {
        const nodeController = await HomieController.create({ mqttOptions })
          .createDevice({
            deviceId: 'node-controller--has-property--test',
          })
          .then(async deviceController => {
            const nodeId = 'node0';
            await deviceController.addNode({ nodeId });
            return deviceController.getNode(nodeId);
          });

        const propertyProps0: PropertyPropsDTO = {
          propertyId: 'property0',
          name: 'Test Property 0',
          datatype: { datatype: 'integer' },
        };

        expect(nodeController.hasProperty(propertyProps0.propertyId)).toBeFalsy();

        await nodeController.addProperty(propertyProps0);

        expect(nodeController.hasProperty(propertyProps0.propertyId)).toBeTruthy();
      });
    });
  });
});
