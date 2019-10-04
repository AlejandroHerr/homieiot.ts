import { connect } from 'mqtt';
import { AsyncClient, IMqttClient } from 'async-mqtt';

import MqttClient from './MqttClient';
import MqttClientOptions from './MqttClientOptions';

const asyncConnect = (options: Partial<MqttClientOptions> = {}): Promise<MqttClient> => {
  const client = connect(options);

  const asyncClient = new AsyncClient(client as IMqttClient);

  return new Promise<MqttClient>((resolve, reject): void => {
    const onError = (error: Error): void => {
      reject(error);
    };

    asyncClient.once('error', onError);
    asyncClient.once('connect', (): void => {
      asyncClient.removeListener('error', onError);

      resolve(asyncClient);
    });
  });
};

export default asyncConnect;
