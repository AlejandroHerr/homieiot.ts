import { IClientPublishOptions } from 'mqtt';

export default interface MqttMessage {
  readonly topic: string;
  readonly message: string;
  readonly options?: Partial<IClientPublishOptions>;
}
