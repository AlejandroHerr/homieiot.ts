import Result from '../../core/logic/Result';

import Device from '../domain/Device';
import HomiePublisher from '../services/HomiePublisher';

interface SetDeviceStateUseCaseDTO {
  device: Device;
  state: Device['state'];
  homiePublisher: HomiePublisher;
}

const setDeviceStateUseCase = async ({
  device,
  state,
  homiePublisher,
}: SetDeviceStateUseCaseDTO): Promise<Result<void>> => {
  const setStateResult = device.setState(state);

  if (setStateResult.failed()) {
    return Result.fail(setStateResult.error);
  }

  const publishResult = await homiePublisher.publishStateUpdate(device);

  if (publishResult.failed()) {
    return Result.fail(publishResult.error);
  }

  return Result.ok();
};

export default setDeviceStateUseCase;
