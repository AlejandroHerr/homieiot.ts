/* eslint-disable import/prefer-default-export */
import MqttMessage from '../../core/infrastructure/MqttMessage';

import Node from '../domain/Node';

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
      message: `${node.properties.map(({ propertyId }) => propertyId).join(',')}`,
    },
  ];
};
