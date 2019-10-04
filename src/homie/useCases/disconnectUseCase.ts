import Result from '../../core/logic/Result';

import Device from '../domain/Device';
import HomiePublisher from '../services/HomiePublisher';

const disconnectUseCase = async ({
  device,
  homiePublisher,
}: {
  device: Device;
  homiePublisher: HomiePublisher;
}): Promise<Result<void>> => {
  const disconnectResult = await homiePublisher.disconnect(device);

  if (disconnectResult.failed()) {
    return Result.fail(disconnectResult.error);
  }

  return Result.ok();
};

export default disconnectUseCase;
