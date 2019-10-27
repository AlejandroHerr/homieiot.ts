import MqttMessage from '../../core/infrastructure/MqttMessage';

import Device from '../domain/Device';
import Node from '../domain/Node';

const parseNodes = (node: Node[]): string => node.map(({ nodeId }) => nodeId).join(',');

export const nodesToMqttMessage = (device: Device): MqttMessage => {
  const baseTopic = `homie/${device.deviceId}`;

  return {
    topic: `${baseTopic}/$nodes`,
    message: parseNodes(device.nodes),
  };
};

export const toMqttMessages = (device: Device): MqttMessage[] => {
  const baseTopic = `homie/${device.deviceId}`;

  return [
    {
      topic: `${baseTopic}/$homie`,
      message: `${device.homie}`,
    },
    {
      topic: `${baseTopic}/$name`,
      message: `${device.name}`,
    },
    {
      topic: `${baseTopic}/$state`,
      message: `${device.state}`,
    },
    {
      topic: `${baseTopic}/$nodes`,
      message: parseNodes(device.nodes),
    },
    {
      topic: `${baseTopic}/$extensions`,
      message: `${device.extensions}`,
    },
  ];
};

export const stateToMqttMessage = (device: Device): MqttMessage => {
  const baseTopic = `homie/${device.id}`;

  return {
    topic: `${baseTopic}/$state`,
    message: device.state,
  };
};
