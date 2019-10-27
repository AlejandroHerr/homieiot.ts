import MqttMessage from '../../core/infrastructure/MqttMessage';

import Property from '../domain/Property';

import * as datatypeMapper from './datatypeMapper';

const parseBoolean = (boolean: boolean): string => (boolean && 'true') || 'false';

export const valueToMqttMessage = (property: Property): MqttMessage => ({
  topic: `homie/${property.deviceId}/${property.nodeId}/${property.propertyId}`,
  message: `${property.value}`,
  options: { retain: property.retained },
});

export const toMqttMessages = (property: Property): MqttMessage[] => {
  const baseTopic = `homie/${property.deviceId}/${property.nodeId}/${property.propertyId}`;

  const messages = [
    valueToMqttMessage(property),
    {
      topic: `${baseTopic}/$name`,
      message: `${property.name}`,
    },
    {
      topic: `${baseTopic}/$settable`,
      message: parseBoolean(property.settable),
    },
    {
      topic: `${baseTopic}/$retained`,
      message: parseBoolean(property.retained),
    },
    ...datatypeMapper.toMqttMessages(property.datatype, baseTopic),
  ];

  return property.unit ? messages.concat({ topic: `${baseTopic}/$unit`, message: property.unit }) : messages;
};
