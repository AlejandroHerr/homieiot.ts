/* eslint-disable @typescript-eslint/unbound-method */
import Result from '../../core/logic/Result';

import Device from '../domain/Device';
import HomiePublisher from '../services/HomiePublisher';

import disconnectDeviceUseCase from './disconnectDeviceUseCase';

jest.mock('../services/HomiePublisher');

const MockedHomiePublisher = (HomiePublisher as unknown) as jest.Mock<HomiePublisher>;

describe('useCases/disconnectDeviceUseCase', () => {
  it('should set the new state of a Device to disconnected and close the connection', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishStateUpdate: jest.fn(() => Promise.resolve(Result.ok())),
          disconnect: jest.fn(() => Promise.resolve(Result.ok())),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const device = Device.create({ deviceId: 'device0' }).value as Device;

    const result = await disconnectDeviceUseCase({ device, homiePublisher });

    expect(result.succeded()).toBeTruthy();
    expect(device).toHaveProperty('state', 'disconnected');

    expect(homiePublisher.publishStateUpdate).toHaveBeenCalledWith(device);
    expect(homiePublisher.disconnect).toHaveBeenCalledWith(device);
  });

  it('should return a failed Result if the HomiePublisher fails to publish new state', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishStateUpdate: jest.fn(() => Promise.resolve(Result.fail(new Error()))),
          disconnect: jest.fn(() => Promise.resolve(Result.ok())),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const device = Device.create({ deviceId: 'device0' }).value as Device;

    const result = await disconnectDeviceUseCase({ device, homiePublisher });

    expect(result.failed()).toBeTruthy();
    expect(homiePublisher.disconnect).not.toHaveBeenCalledWith(device);
  });

  it('should return a failed Result if the HomiePublisher fails to publish new state', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishStateUpdate: jest.fn(() => Promise.resolve(Result.ok())),
          disconnect: jest.fn(() => Promise.resolve(Result.fail(new Error()))),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const device = Device.create({ deviceId: 'device0' }).value as Device;

    const result = await disconnectDeviceUseCase({ device, homiePublisher });

    expect(result.failed()).toBeTruthy();
  });
});
