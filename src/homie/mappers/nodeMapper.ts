import MqttMessage from '../../core/infrastructure/MqttMessage';

import Node from '../domain/Node';
import Property from '../domain/Property';

const parseProperties = (properties: Property[]): string => properties.map(({ propertyId }) => propertyId).join(',');

export const propertiesToMqttMessage = (node: Node): MqttMessage => {
  const baseTopic = `homie/${node.deviceId}/${node.nodeId}`;

  return {
    topic: `${baseTopic}/$properties`,
    message: parseProperties(node.properties),
  };
};

export const toMqttMessages = (node: Node): MqttMessage[] => {
  const baseTopic = `homie/${node.deviceId}/${node.nodeId}`;
  return [
    {
      topic: `${baseTopic}/$name`,
      message: `${node.name}`,
    },
    {
      topic: `${baseTopic}/$type`,
      message: `${node.type}`,
    },
    {
      topic: `${baseTopic}/$properties`,
      message: parseProperties(node.properties),
    },
  ];
};
