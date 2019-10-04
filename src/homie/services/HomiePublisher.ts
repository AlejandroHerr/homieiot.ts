import MqttClient from '../../core/infrastructure/MqttClient';
import Result from '../../core/logic/Result';

import Device from '../domain/Device';
import Node from '../domain/Node';
import * as deviceMapper from '../mappers/deviceMapper';
import * as nodeMapper from '../mappers/nodeMapper';
import MqttConnectionManager from '../../core/infrastructure/MqttConnectionManager';

export default class HomiePublisher {
  private mqttConnectionManager: MqttConnectionManager;

  constructor({ mqttConnectionManager }: { mqttConnectionManager: MqttConnectionManager }) {
    this.mqttConnectionManager = mqttConnectionManager;
  }

  private async createConnection(device: Device): Promise<Result<MqttClient>> {
    if (this.mqttConnectionManager.hasConnection(device.deviceId)) {
      return this.mqttConnectionManager.getConnection(device.deviceId);
    }

    return this.mqttConnectionManager.createConnection({
      id: device.deviceId,
      options: {
        clientId: device.deviceId,
        will: {
          topic: `homie/${device.deviceId}/$state`,
          payload: 'lost',
          qos: 1,
          retain: true,
        },
      },
    });
  }

  async publishDevice(device: Device): Promise<Result<void>> {
    const connection = await this.createConnection(device);

    if (connection.failed()) {
      return Result.fail(connection.error);
    }

    const mqttMessages = deviceMapper.toMqtt(device);

    const results = await Promise.all(
      mqttMessages.map(mqttMessage =>
        (connection.value as MqttClient)
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
  }

  async publishStateUpdate(device: Device): Promise<Result<void>> {
    const connection = this.mqttConnectionManager.getConnection(device.deviceId);

    if (connection.failed()) {
      return Result.fail(connection.error);
    }

    const mqttMessage = deviceMapper.stateToMqtt(device);

    return (connection.value as MqttClient)
      .publish(mqttMessage.topic, mqttMessage.message, { qos: 1, retain: true })
      .then(() => Result.ok<void>())
      .catch((error: Error) => Result.fail<void>(error.message));
  }

  async publishNodeUpdate(device: Device): Promise<Result<void>> {
    const connection = this.mqttConnectionManager.getConnection(device.deviceId);

    if (connection.failed()) {
      return Result.fail(connection.error);
    }

    const mqttMessage = deviceMapper.nodesToMqtt(device);

    return (connection.value as MqttClient)
      .publish(mqttMessage.topic, mqttMessage.message, { qos: 1, retain: true })
      .then(() => Result.ok<void>())
      .catch((error: Error) => Result.fail<void>(error.message));
  }

  async publisNode(node: Node): Promise<Result<void>> {
    const connection = this.mqttConnectionManager.getConnection(node.deviceId);

    if (connection.failed()) {
      return Result.fail(connection.error);
    }

    const mqttMessages = nodeMapper.toMqtt(node);

    const results = await Promise.all(
      mqttMessages.map(mqttMessage =>
        (connection.value as MqttClient)
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
  }

  async disconnect(device: Device): Promise<Result<void>> {
    const connection = this.mqttConnectionManager.getConnection(device.deviceId);

    if (connection.failed()) {
      return Result.fail(connection.error);
    }

    return (connection.value as MqttClient)
      .end()
      .then(() => Result.ok<void>())
      .catch((error: Error) => Result.fail<void>(error.message));
  }

  static create({ mqttConnectionManager }: { mqttConnectionManager: MqttConnectionManager }): HomiePublisher {
    return new HomiePublisher({ mqttConnectionManager });
  }
}
