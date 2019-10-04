/* eslint-disable import/prefer-default-export */
import MqttMessage from '../../core/infrastructure/MqttMessage';

import Device from '../domain/Device';

export const toMqtt = (device: Device): MqttMessage[] => {
  const baseTopic = `homie/${device.id}`;

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
      message: `${device.nodes.map(({ nodeId }) => nodeId).join(',')}`,
    },
    {
      topic: `${baseTopic}/$extensions`,
      message: `${device.extensions}`,
    },
  ];
};

export const stateToMqtt = (device: Device): MqttMessage => {
  const baseTopic = `homie/${device.id}`;

  return {
    topic: `${baseTopic}/$state`,
    message: device.state.toString(),
  };
};

export const nodesToMqtt = (device: Device): MqttMessage => {
  const baseTopic = `homie/${device.id}`;

  return {
    topic: `${baseTopic}/$nodes`,
    message: `${device.nodes.map(node => node.nodeId).join(',')}`,
  };
};
