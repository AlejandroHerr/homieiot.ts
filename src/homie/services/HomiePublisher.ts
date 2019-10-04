import { IClientOptions } from 'mqtt';
import { AsyncMqttClient } from 'async-mqtt';

import MqttClient from '../../core/infrastructure/MqttClient';
import Result from '../../core/logic/Result';
import asyncConnect from '../../infrastructure/mqtt';

import Device from '../domain/Device';
import Node from '../domain/Node';
import * as deviceMapper from '../mappers/deviceMapper';
import * as nodeMapper from '../mappers/nodeMapper';

export default class HomiePublisher {
  public readonly options: Partial<IClientOptions>;

  private store: Map<string, AsyncMqttClient> = new Map();

  constructor({ options }: { options: Partial<IClientOptions> }) {
    this.options = options;
  }

  private async createConnection(deviceId: string): Promise<void> {
    if (this.store.has(deviceId)) {
      throw new Error('Connection already exists');
    }

    const mqttConnection = await asyncConnect({
      options: {
        ...this.options,
        clientId: deviceId,
        will: {
          topic: `homie/${deviceId}/$state`,
          payload: 'lost',
          qos: 1,
          retain: true,
        },
      },
    });

    this.store.set(deviceId, mqttConnection);
  }

  private hasConnection(deviceId: string): boolean {
    return this.store.has(deviceId);
  }

  private async getConnection(deviceId: string): Promise<MqttClient> {
    if (!this.hasConnection(deviceId)) {
      await this.createConnection(deviceId);
    }

    return this.store.get(deviceId) as MqttClient;
  }

  async publishDevice(device: Device): Promise<Result<void>> {
    try {
      const connection = await this.getConnection(device.deviceId);

      const mqttMessages = deviceMapper.toMqtt(device);

      const results = await Promise.all(
        mqttMessages.map(mqttMessage =>
          connection
            .publish(mqttMessage.topic, mqttMessage.message, { qos: 1, retain: true })
            .then(response => Result.ok(response))
            .catch(error => Result.fail(error)),
        ),
      );

      const resultError = results.find(result => result.failed());

      if (resultError) {
        return Result.fail(resultError.error as string);
      }

      return Result.ok();
    } catch (error) {
      return Result.fail(error.message);
    }
  }

  async publishStateUpdate(device: Device): Promise<Result<void>> {
    try {
      const connection = await this.getConnection(device.deviceId);

      const mqttMessage = deviceMapper.stateToMqtt(device);

      return connection
        .publish(mqttMessage.topic, mqttMessage.message, { qos: 1, retain: true })
        .then(() => Result.ok<void>())
        .catch((error: Error) => Result.fail<void>(error.message));
    } catch (error) {
      return Result.fail(error.message);
    }
  }

  async publishNodeUpdate(device: Device): Promise<Result<void>> {
    try {
      const connection = await this.getConnection(device.deviceId);

      const mqttMessage = deviceMapper.nodesToMqtt(device);

      return connection
        .publish(mqttMessage.topic, mqttMessage.message, { qos: 1, retain: true })
        .then(() => Result.ok<void>())
        .catch((error: Error) => Result.fail<void>(error.message));
    } catch (error) {
      return Result.fail(error.message);
    }
  }

  async publisNode(node: Node): Promise<Result<void>> {
    try {
      const connection = await this.getConnection(node.deviceId);

      const mqttMessages = nodeMapper.toMqtt(node);

      const results = await Promise.all(
        mqttMessages.map(mqttMessage =>
          connection
            .publish(mqttMessage.topic, mqttMessage.message, { qos: 1, retain: true })
            .then(response => Result.ok(response))
            .catch(error => Result.fail(error)),
        ),
      );

      const resultError = results.find(result => result.failed());

      if (resultError) {
        return Result.fail(resultError.error as string);
      }

      return Result.ok();
    } catch (error) {
      return Result.fail(error.message);
    }
  }

  async disconnect(device: Device): Promise<Result<void>> {
    try {
      const connection = await this.getConnection(device.deviceId);

      return connection
        .end()
        .then(() => Result.ok<void>())
        .catch((error: Error) => Result.fail<void>(error.message));
    } catch (error) {
      return Result.fail(error.message);
    }
  }

  static create({ options }: { options: Partial<IClientOptions> }): HomiePublisher {
    return new HomiePublisher({ options });
  }
}
