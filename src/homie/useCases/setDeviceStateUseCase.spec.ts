/* eslint-disable @typescript-eslint/unbound-method */
import Result from '../../core/logic/Result';

import Device from '../domain/Device';
import HomiePublisher from '../services/HomiePublisher';

import setDeviceStateUseCase from './setDeviceStateUseCase';

jest.mock('../services/HomiePublisher');

const MockedHomiePublisher = (HomiePublisher as unknown) as jest.Mock<HomiePublisher>;

describe('useCases/setDeviceStateUseCase', () => {
  it('should set the new state of a Device and publish it with the HomiePublisher', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishStateUpdate: jest.fn(() => Promise.resolve(Result.ok())),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const device = Device.create({ deviceId: 'device0' }).value as Device;

    const result = await setDeviceStateUseCase({ device, state: 'sleeping', homiePublisher });

    expect(result.succeded()).toBeTruthy();
    expect(device).toHaveProperty('state', 'sleeping');

    expect(homiePublisher.publishStateUpdate).toHaveBeenCalledWith(device);
  });

  it('should return a failed Result and not publish when new state is invalid', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishStateUpdate: jest.fn(() => Promise.resolve(Result.ok())),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const device = Device.create({ deviceId: 'device0' }).value as Device;

    const result = await setDeviceStateUseCase({ device, state: 'sleepy' as Device['state'], homiePublisher });

    expect(result.failed()).toBeTruthy();

    expect(homiePublisher.publishStateUpdate).not.toHaveBeenCalled();
  });

  it('should return a failed Result if the HomiePublisher fails to publish new state', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishStateUpdate: jest.fn(() => Promise.resolve(Result.fail(new Error()))),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const device = Device.create({ deviceId: 'device0' }).value as Device;

    const result = await setDeviceStateUseCase({ device, state: 'sleeping', homiePublisher });

    expect(result.failed()).toBeTruthy();

    expect(homiePublisher.publishStateUpdate).toHaveBeenCalled();
  });
});
