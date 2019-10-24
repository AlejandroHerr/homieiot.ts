export default interface MqttMessage {
  readonly topic: string;
  readonly message: string;
}
