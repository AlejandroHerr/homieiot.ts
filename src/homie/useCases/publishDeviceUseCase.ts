import Result from '../../core/logic/Result';

import Device from '../domain/Device';
import DevicePropsDTO from '../dto/DevicePropsDTO';
import HomiePublisher from '../services/HomiePublisher';

interface PublishDeviceUseCaseDTO {
  deviceProps: DevicePropsDTO;
  homiePublisher: HomiePublisher;
}
const publishDeviceUseCase = async ({
  deviceProps,
  homiePublisher,
}: PublishDeviceUseCaseDTO): Promise<Result<Device>> => {
  const deviceOrError = Device.create(deviceProps);

  if (deviceOrError.failed()) {
    return Result.fail(deviceOrError.error);
  }

  const device = deviceOrError.value as Device;

  const publishResult = await homiePublisher.publishDevice(device);

  if (publishResult.failed()) {
    return Result.fail(publishResult.error);
  }

  return Result.ok(device);
};

export default publishDeviceUseCase;
