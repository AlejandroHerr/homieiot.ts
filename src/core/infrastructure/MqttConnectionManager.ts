import Result from '../logic/Result';

import MqttClient from './MqttClient';
import MqttClientOptions from './MqttClientOptions';
import { MqttConnect } from './MqttConnect';
import MqttError from './MqttError';

export default class MqttConnectionManager {
  private mqttConnect: MqttConnect;

  private options: Partial<MqttClientOptions>;

  private store: Map<string, MqttClient> = new Map();

  constructor({ mqttConnect, options }: { mqttConnect: MqttConnect; options: Partial<MqttClientOptions> }) {
    this.mqttConnect = mqttConnect;
    this.options = options;
  }

  async createClient({ clientId, options }: { clientId: string; options?: MqttClientOptions }): Promise<MqttClient> {
    if (this.store.has(clientId)) {
      throw MqttError.create(`Client ${clientId} already exists`);
    }

    const mqttClient = await this.mqttConnect({
      ...this.options,
      ...options,
      clientId,
    });

    this.store.set(clientId, mqttClient);

    return mqttClient;
  }

  hasClient(clientId: string): boolean {
    return this.store.has(clientId);
  }

  getClient(clientId: string): MqttClient {
    if (!this.hasClient(clientId)) {
      throw MqttError.create(`Client ${clientId} does not exist`);
    }

    const client = this.store.get(clientId) as MqttClient;

    return client;
  }

  async removeClient(clientId: string): Promise<this> {
    const client = this.getClient(clientId);

    await client.end();

    this.store.delete(clientId);

    return this;
  }

  async removeAllClients(): Promise<this> {
    const clientIds = [...this.store.keys()];
    const result = await Promise.all(
      clientIds.map(clientId =>
        this.removeClient(clientId)
          .then(mqttConnectionManager => Result.ok(mqttConnectionManager))
          .catch(error => Result.fail(error)),
      ),
    ).then(results => Result.combine(results));

    if (result.failed()) {
      throw result.error;
    }

    return this;
  }

  static create({
    mqttConnect,
    options,
  }: {
    options: Partial<MqttClientOptions>;
    mqttConnect: MqttConnect;
  }): MqttConnectionManager {
    return new MqttConnectionManager({ mqttConnect, options });
  }
}
