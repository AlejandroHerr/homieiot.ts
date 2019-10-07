import Result from '../../core/logic/Result';

import Device from '../domain/Device';
import HomiePublisher from '../services/HomiePublisher';

interface UpdateStateUseCaseDTO {
  device: Device;
  state: Device['state'];
  homiePublisher: HomiePublisher;
}

const updateStateUseCase = async ({ device, state, homiePublisher }: UpdateStateUseCaseDTO): Promise<Result<void>> => {
  const updateResult = device.updateState(state);

  if (updateResult.failed()) {
    return Result.fail(updateResult.error);
  }

  const publishResult = await homiePublisher.publishStateUpdate(device);

  if (publishResult.failed()) {
    return Result.fail(publishResult.error);
  }

  return Result.ok();
};

export default updateStateUseCase;
