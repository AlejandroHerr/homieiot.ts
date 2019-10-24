/* eslint-disable import/prefer-default-export */
import MqttMessage from '../../core/infrastructure/MqttMessage';

import Node from '../domain/Node';
import Property from '../domain/Property';

const parseProperties = (properties: Property[]): string => properties.map(({ propertyId }) => propertyId).join(',');

export const toMqtt = (node: Node): MqttMessage[] => {
  const baseTopic = `homie/${node.id}`;
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

export const propertiesToMqtt = (node: Node): MqttMessage => {
  const baseTopic = `homie/${node.id}`;

  return {
    topic: `${baseTopic}/$properties`,
    message: parseProperties(node.properties),
  };
};
