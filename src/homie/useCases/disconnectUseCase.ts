import Result from '../../core/logic/Result';

import Device from '../domain/Device';
import HomiePublisher from '../services/HomiePublisher';

interface DisconnectUseCaseDTO {
  device: Device;
  homiePublisher: HomiePublisher;
}

const disconnectUseCase = async ({ device, homiePublisher }: DisconnectUseCaseDTO): Promise<Result<void>> => {
  const disconnectResult = await homiePublisher.disconnect(device);

  if (disconnectResult.failed()) {
    return Result.fail(disconnectResult.error);
  }

  return Result.ok();
};

export default disconnectUseCase;
