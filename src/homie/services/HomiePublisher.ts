import MqttClient from '../../core/infrastructure/MqttClient';
import MqttConnectionManager from '../../core/infrastructure/MqttConnectionManager';
import Result from '../../core/logic/Result';

import Device from '../domain/Device';
import Node from '../domain/Node';
import Property from '../domain/Property';
import { deviceMapper, nodeMapper, propertyMapper } from '../mappers';

export default class HomiePublisher {
  private mqttConnectionManager: MqttConnectionManager;

  constructor({ mqttConnectionManager }: { mqttConnectionManager: MqttConnectionManager }) {
    this.mqttConnectionManager = mqttConnectionManager;
  }

  private async createClient(device: Device): Promise<Result<MqttClient>> {
    if (this.mqttConnectionManager.hasClient(device.deviceId)) {
      return this.mqttConnectionManager.getClient(device.deviceId);
    }

    return this.mqttConnectionManager.createClient({
      clientId: device.deviceId,
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
    const clientOrError = await this.createClient(device);

    if (clientOrError.failed()) {
      return Result.fail(clientOrError.error);
    }

    const client = clientOrError.value as MqttClient;

    const mqttMessages = deviceMapper.toMqttMessages(device);

    return Promise.all(mqttMessages.map(mqttMessage => client.publish(mqttMessage.topic, mqttMessage.message))).then(
      () => Result.ok(),
    );
  }

  async publishDeviceState(device: Device): Promise<Result<void>> {
    const clientOrError = this.mqttConnectionManager.getClient(device.deviceId);

    if (clientOrError.failed()) {
      return Result.fail(clientOrError.error);
    }

    const client = clientOrError.value as MqttClient;

    const mqttMessage = deviceMapper.stateToMqttMessage(device);

    return client.publish(mqttMessage.topic, mqttMessage.message).then(() => Result.ok());
  }

  async publishDeviceNodes(device: Device): Promise<Result<void>> {
    const clientOrError = this.mqttConnectionManager.getClient(device.deviceId);

    if (clientOrError.failed()) {
      return Result.fail(clientOrError.error);
    }

    const client = clientOrError.value as MqttClient;

    const mqttMessage = deviceMapper.nodesToMqttMessage(device);

    return client.publish(mqttMessage.topic, mqttMessage.message).then(() => Result.ok());
  }

  async publishNode(node: Node): Promise<Result<void>> {
    const clientOrError = this.mqttConnectionManager.getClient(node.deviceId);

    if (clientOrError.failed()) {
      return Result.fail(clientOrError.error);
    }

    const client = clientOrError.value as MqttClient;

    const mqttMessages = nodeMapper.toMqttMessages(node);

    return Promise.all(mqttMessages.map(mqttMessage => client.publish(mqttMessage.topic, mqttMessage.message))).then(
      () => Result.ok(),
    );
  }

  async publishNodeProperties(node: Node): Promise<Result<void>> {
    const clientOrError = this.mqttConnectionManager.getClient(node.deviceId);

    if (clientOrError.failed()) {
      return Result.fail(clientOrError.error);
    }

    const client = clientOrError.value as MqttClient;

    const mqttMessage = nodeMapper.propertiesToMqttMessage(node);

    return client.publish(mqttMessage.topic, mqttMessage.message).then(() => Result.ok());
  }

  async publishProperty(property: Property): Promise<Result<void>> {
    const clientOrError = this.mqttConnectionManager.getClient(property.deviceId);

    if (clientOrError.failed()) {
      return Result.fail(clientOrError.error);
    }

    const client = clientOrError.value as MqttClient;

    const mqttMessages = propertyMapper.toMqttMessages(property);

    return Promise.all(
      mqttMessages.map(mqttMessage =>
        client.publish(mqttMessage.topic, mqttMessage.message, {
          qos: 1,
          ...mqttMessage.options,
        }),
      ),
    ).then(() => Result.ok());
  }

  async publishPropertyValue(property: Property): Promise<Result<void>> {
    const clientOrError = this.mqttConnectionManager.getClient(property.deviceId);

    if (clientOrError.failed()) {
      return Result.fail(clientOrError.error);
    }

    const client = clientOrError.value as MqttClient;

    const mqttMessage = propertyMapper.valueToMqttMessage(property);

    return client
      .publish(mqttMessage.topic, mqttMessage.message, {
        qos: 1,
        ...mqttMessage.options,
      })
      .then(() => Result.ok());
  }

  async disconnect(device: Device): Promise<Result<void>> {
    return this.mqttConnectionManager.removeClient(device.deviceId);
  }

  static create({ mqttConnectionManager }: { mqttConnectionManager: MqttConnectionManager }): HomiePublisher {
    return new HomiePublisher({ mqttConnectionManager });
  }
}
