import Result from '../../core/logic/Result';

import Device from '../domain/Device';
import HomiePublisher from '../services/HomiePublisher';

interface DisconnectDeviceUseCaseDTO {
  device: Device;
  homiePublisher: HomiePublisher;
}

const disconnectDeviceUseCase = async ({
  device,
  homiePublisher,
}: DisconnectDeviceUseCaseDTO): Promise<Result<void>> => {
  device.setState('disconnected');

  const publishResult = await homiePublisher.publishStateUpdate(device);

  if (publishResult.failed()) {
    return Result.fail(publishResult.error);
  }

  const disconnectResult = await homiePublisher.disconnect(device);

  if (disconnectResult.failed()) {
    return Result.fail(disconnectResult.error);
  }

  return Result.ok();
};

export default disconnectDeviceUseCase;
