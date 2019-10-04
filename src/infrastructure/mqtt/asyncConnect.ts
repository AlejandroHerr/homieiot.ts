import { connect, IClientOptions } from 'mqtt';
import { AsyncClient, IMqttClient } from 'async-mqtt';

const asyncConnect = ({ options }: { options?: IClientOptions }): Promise<AsyncClient> => {
  const client = connect(options);

  const asyncClient = new AsyncClient(client as IMqttClient);

  return new Promise<AsyncClient>((resolve, reject): void => {
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
