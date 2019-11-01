import { AsyncClient } from 'async-mqtt';

import asyncConnect from './asyncConnect';
import MqttConnectionManager from './MqttConnectionManager';
import MqttError from './MqttError';

const options = {
  host: process.env.MQTT_HOST as string,
  port: parseInt(process.env.MQTT_PORT as string, 10),
  protocol: process.env.MQTT_PROTOCOL as 'wss' | 'ws' | 'mqtt' | 'mqtts' | 'tcp' | 'ssl' | 'wx' | 'wxs',
  resubscribe: false,
};

const generateClientId = (prefix = 'test-client'): string => `${prefix}--${Math.floor(Math.random() * 10000)}`;

describe('core/infraestructure/MqttConnectionManager', () => {
  describe('static create', () => {
    it('should create an instance of MqttConnectionManager', () => {
      const mqttConnectionManager = MqttConnectionManager.create({ mqttConnect: asyncConnect, options });

      expect(mqttConnectionManager).toBeInstanceOf(MqttConnectionManager);
    });
  });
  describe('createClient', () => {
    it('should create a new client with the id, options and defaultOptions', async () => {
      const mqttConnectionManager = new MqttConnectionManager({
        mqttConnect: asyncConnect,
        options,
      });

      const clientId = generateClientId();

      const client = await mqttConnectionManager.createClient({ clientId });

      expect(client).toBeInstanceOf(AsyncClient);
      expect(mqttConnectionManager.hasClient(clientId)).toBeTruthy();
      expect(mqttConnectionManager.getClient(clientId)).toBeInstanceOf(AsyncClient);
    });
    it('should return a failed result when the client already exists', async () => {
      const mqttConnectionManager = new MqttConnectionManager({
        mqttConnect: asyncConnect,
        options,
      });

      const clientId = generateClientId();

      await mqttConnectionManager.createClient({ clientId });

      expect(mqttConnectionManager.createClient({ clientId })).rejects.toEqual(
        MqttError.create(`Client ${clientId} already exists`),
      );
    });
  });
  describe('removeClient', () => {
    it('should close the connection and remove it from the store', async () => {
      const mqttConnectionManager = new MqttConnectionManager({
        mqttConnect: asyncConnect,
        options,
      });

      const clientId = generateClientId();

      await mqttConnectionManager.createClient({ clientId });

      const client = mqttConnectionManager.getClient(clientId);

      await mqttConnectionManager.removeClient(clientId);

      expect(client).toHaveProperty('connected', false);
      expect(mqttConnectionManager.hasClient(clientId)).toBeFalsy();
      expect(() => mqttConnectionManager.getClient(clientId)).toThrow(
        MqttError.create(`Client ${clientId} does not exist`),
      );
    });
    it('should return a failed result when the client does not exist', () => {
      const mqttConnectionManager = new MqttConnectionManager({
        mqttConnect: asyncConnect,
        options,
      });

      const clientId = generateClientId();

      expect(mqttConnectionManager.removeClient(clientId)).rejects.toEqual(
        MqttError.create(`Client ${clientId} does not exist`),
      );
    });
  });
  describe('removeAllClients', () => {
    it('should close  allthe connections and remove them from the store', async () => {
      const mqttConnectionManager = new MqttConnectionManager({
        mqttConnect: asyncConnect,
        options,
      });

      const client0Id = generateClientId();
      const client1Id = generateClientId();

      await Promise.all([
        mqttConnectionManager.createClient({ clientId: client0Id }),
        mqttConnectionManager.createClient({ clientId: client1Id }),
      ]);

      const client0 = mqttConnectionManager.getClient(client0Id);
      const client1 = mqttConnectionManager.getClient(client1Id);

      await mqttConnectionManager.removeAllClients();

      expect(client0).toHaveProperty('connected', false);
      expect(mqttConnectionManager.hasClient(client0Id)).toBeFalsy();
      expect(() => mqttConnectionManager.getClient(client0Id)).toThrowError(
        MqttError.create(`Client ${client0Id} does not exist`),
      );
      expect(client1).toHaveProperty('connected', false);
      expect(mqttConnectionManager.hasClient(client1Id)).toBeFalsy();
      expect(() => mqttConnectionManager.getClient(client1Id)).toThrowError(
        MqttError.create(`Client ${client1Id} does not exist`),
      );
    });
  });
});
