import { AsyncClient } from 'async-mqtt';

import asyncConnect from './asyncConnect';
import MqttClient from './MqttClient';
import MqttConnectionManager from './MqttConnectionManager';

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

      const result = await mqttConnectionManager.createClient({ clientId });

      expect(result.succeded()).toBeTruthy();
      expect(result).toHaveProperty('value', expect.any(AsyncClient));
      expect(mqttConnectionManager.hasClient(clientId)).toBeTruthy();
      expect(mqttConnectionManager.getClient(clientId)).toHaveProperty('value', expect.any(AsyncClient));
    });
    it('should return a failed result when the client already exists', async () => {
      const mqttConnectionManager = new MqttConnectionManager({
        mqttConnect: asyncConnect,
        options,
      });

      const clientId = generateClientId();

      await mqttConnectionManager.createClient({ clientId });
      const result = await mqttConnectionManager.createClient({ clientId });

      expect(result.failed()).toBeTruthy();
      expect(result).toHaveProperty('error', `Client ${clientId} already exists`);
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

      const client = mqttConnectionManager.getClient(clientId).value as MqttClient;

      const result = await mqttConnectionManager.removeClient(clientId);

      expect(result.succeded()).toBeTruthy();
      expect(client).toHaveProperty('connected', false);
      expect(mqttConnectionManager.hasClient(clientId)).toBeFalsy();
      expect(mqttConnectionManager.getClient(clientId)).toHaveProperty('error', `Client ${clientId} does not exist`);
    });
    it('should return a failed result when the client does not exist', async () => {
      const mqttConnectionManager = new MqttConnectionManager({
        mqttConnect: asyncConnect,
        options,
      });

      const clientId = generateClientId();

      const result = await mqttConnectionManager.removeClient(clientId);

      expect(result.failed()).toBeTruthy();
      expect(result.error).toBe(`Client ${clientId} does not exist`);
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

      const client0 = mqttConnectionManager.getClient(client0Id).value as MqttClient;
      const client1 = mqttConnectionManager.getClient(client1Id).value as MqttClient;

      const result = await mqttConnectionManager.removeAllClients();

      expect(result.succeded()).toBeTruthy();
      expect(client0).toHaveProperty('connected', false);
      expect(mqttConnectionManager.hasClient(client0Id)).toBeFalsy();
      expect(mqttConnectionManager.getClient(client0Id)).toHaveProperty('error', `Client ${client0Id} does not exist`);
      expect(client1).toHaveProperty('connected', false);
      expect(mqttConnectionManager.hasClient(client1Id)).toBeFalsy();
      expect(mqttConnectionManager.getClient(client1Id)).toHaveProperty('error', `Client ${client1Id} does not exist`);
    });
  });
});
