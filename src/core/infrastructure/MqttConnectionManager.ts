import Result from '../logic/Result';

import MqttClient from './MqttClient';
import MqttClientOptions from './MqttClientOptions';
import { MqttConnect } from './MqttConnect';

export default class MqttConnectionManager {
  private mqttConnect: MqttConnect;

  private options: Partial<MqttClientOptions>;

  private store: Map<string, MqttClient> = new Map();

  constructor({ mqttConnect, options }: { mqttConnect: MqttConnect; options: Partial<MqttClientOptions> }) {
    this.mqttConnect = mqttConnect;
    this.options = options;
  }

  async createClient({
    clientId,
    options,
  }: {
    clientId: string;
    options?: MqttClientOptions;
  }): Promise<Result<MqttClient>> {
    if (this.store.has(clientId)) {
      return Result.fail(`Client ${clientId} already exists`);
    }

    const mqttClient = await this.mqttConnect({
      ...this.options,
      ...options,
      clientId,
    });

    this.store.set(clientId, mqttClient);

    return Result.ok(mqttClient);
  }

  hasClient(clientId: string): boolean {
    return this.store.has(clientId);
  }

  getClient(clientId: string): Result<MqttClient> {
    if (!this.hasClient(clientId)) {
      return Result.fail(`Client ${clientId} does not exist`);
    }

    const client = this.store.get(clientId) as MqttClient;

    return Result.ok(client);
  }

  async removeClient(clientId: string): Promise<Result<void>> {
    const connectionOrError = this.getClient(clientId);

    if (connectionOrError.failed()) {
      return Result.fail(connectionOrError.error);
    }

    const client = connectionOrError.value as MqttClient;

    await client.end();

    this.store.delete(clientId);

    return Result.ok();
  }

  async removeAllClients(): Promise<Result<void>> {
    return Promise.all([...this.store.keys()].map(clientId => this.removeClient(clientId))).then(results =>
      Result.combine(results),
    );
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
