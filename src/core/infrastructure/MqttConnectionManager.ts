import Result from '../logic/Result';

import asyncConnect from './asyncConnect';
import MqttClient from './MqttClient';
import MqttClientOptions from './MqttClientOptions';

export default class MqttConnectionManager {
  public readonly options: Partial<MqttClientOptions>;

  private store: Map<string, MqttClient> = new Map();

  constructor({ options }: { options: Partial<MqttClientOptions> }) {
    this.options = options;
  }

  async createConnection({ id, options }: { id: string; options?: MqttClientOptions }): Promise<Result<MqttClient>> {
    if (this.store.has(id)) {
      return Result.fail(`Connection ${id} already exists`);
    }

    try {
      const mqttClient = await asyncConnect({
        ...this.options,
        ...options,
        clientId: id,
      });

      this.store.set(id, mqttClient);

      return Result.ok(mqttClient);
    } catch (error) {
      return Result.fail(error);
    }
  }

  hasConnection(deviceId: string): boolean {
    return this.store.has(deviceId);
  }

  getConnection(id: string): Result<MqttClient> {
    if (!this.hasConnection(id)) {
      return Result.fail(`Connection ${id} does not exist`);
    }

    return Result.ok(this.store.get(id) as MqttClient);
  }

  removeConnection(id: string): Result<MqttClient> {
    if (!this.hasConnection(id)) {
      return Result.fail(`Connection ${id} does not exist`);
    }

    this.store.delete(id);

    return Result.ok();
  }

  static create({ options }: { options: Partial<MqttClientOptions> }): MqttConnectionManager {
    return new MqttConnectionManager({ options });
  }
}
