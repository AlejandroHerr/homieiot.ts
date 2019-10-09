import HomiePublisher from '../services/HomiePublisher';
import publishDeviceUseCase from './publishDeviceUseCase';
import Device from '../domain/Device';
import Result from '../../core/logic/Result';
// jest.mock('../domain/Device');
jest.mock('../services/HomiePublisher');

const MockedHomiePublisher = (HomiePublisher as unknown) as jest.Mock<HomiePublisher>;
describe('useCases/publishDeviceUseCase', () => {
  it('should create and publish a Device with the HomiePublisher', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishDevice: jest.fn(() => Promise.resolve(Result.ok())),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const deviceProps = { deviceId: 'device0' };

    const result = await publishDeviceUseCase({ deviceProps, homiePublisher });

    expect(result.succeded()).toBeTruthy();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(homiePublisher.publishDevice).toHaveBeenCalledWith(Device.create(deviceProps).value as Device);
  });
  it('should return a failed Result and not publish when device props are invalid', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishDevice: jest.fn(() => Promise.resolve(Result.ok())),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const deviceProps = { deviceId: 'DEVICE0' };

    const result = await publishDeviceUseCase({ deviceProps, homiePublisher });

    expect(result.failed()).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(homiePublisher.publishDevice).not.toHaveBeenCalled();
  });
  it('should return a failed Result if the HomiePublisher fails to publish', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishDevice: jest.fn(() => Promise.resolve(Result.fail(new Error()))),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const deviceProps = { deviceId: 'device0' };

    const result = await publishDeviceUseCase({ deviceProps, homiePublisher });

    expect(result.failed()).toBeTruthy();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(homiePublisher.publishDevice).toHaveBeenCalled();
  });
});
