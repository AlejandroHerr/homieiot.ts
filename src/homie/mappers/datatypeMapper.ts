/* eslint-disable import/prefer-default-export */
import MqttMessage from '../../core/infrastructure/MqttMessage';

import Datatype from '../domain/Datatype';

const parseFormat = (format: string | string[] | number[]): string =>
  Array.isArray(format) ? `${format.join(',')}` : `${format}`;

export const toMqttMessages = (datatype: Datatype, baseTopic: string): MqttMessage[] => {
  const messages: MqttMessage[] = [
    {
      topic: `${baseTopic}/$datatype`,
      message: datatype.datatype,
    },
  ];

  return datatype.format
    ? messages.concat({ topic: `${baseTopic}/$format`, message: parseFormat(datatype.format) })
    : messages;
};
