/* eslint-disable import/prefer-default-export */
import MqttMessage from '../../core/infrastructure/MqttMessage';

import Property from '../domain/Property';

const parseBoolean = (boolean: boolean): string => (boolean && 'true') || 'false';
const parseValue = (value: string | number | boolean): string =>
  value === true || value === false ? parseBoolean(value) : `${value}`;
const parseFormat = (format: string | string[] | number[]): string =>
  Array.isArray(format) ? `${format.join(',')}` : `${format}`;

export const toMqtt = (property: Property): MqttMessage[] => {
  const baseTopic = `homie/${property.id}`;

  const requiredTopics = [
    {
      topic: `${baseTopic}/$name`,
      message: `${property.name}`,
    },
    {
      topic: `${baseTopic}/$datatype`,
      message: property.datatype.datatype,
    },
    {
      topic: `${baseTopic}/$settable`,
      message: parseBoolean(property.settable),
    },
    {
      topic: `${baseTopic}/$retained`,
      message: parseBoolean(property.retained),
    },
    {
      topic: baseTopic,
      message: parseValue(property.value),
    },
  ];

  const requiredTopicsWithFormat = property.datatype.format
    ? requiredTopics.concat({ topic: `${baseTopic}/$format`, message: parseFormat(property.datatype.format) })
    : requiredTopics;

  const requiredTopicsWithUnit = property.unit
    ? requiredTopicsWithFormat.concat({ topic: `${baseTopic}/$unit`, message: parseFormat(property.unit) })
    : requiredTopicsWithFormat;

  return requiredTopicsWithUnit;
};
