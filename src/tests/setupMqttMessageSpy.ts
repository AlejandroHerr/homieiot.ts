import MqttClient from '../core/infrastructure/MqttClient';

export default (
  mqttClient: MqttClient,
  subscriptionTopic = 'homie/#',
): { mqttMessageSpy: jest.Mock<void, [string, string]> } => {
  const mqttMessageSpy = jest.fn<void, [string, string]>();

  mqttClient.subscribe(subscriptionTopic);
  mqttClient.on('message', (topic, message) => mqttMessageSpy(topic, message.toString()));

  return { mqttMessageSpy };
};
