import MqttClient from './MqttClient';
import MqttClientOptions from './MqttClientOptions';

export type MqttConnect = (options?: Partial<MqttClientOptions>) => Promise<MqttClient>;
