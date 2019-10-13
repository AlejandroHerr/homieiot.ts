/* eslint-disable @typescript-eslint/unbound-method */
import Result from '../../core/logic/Result';

import Device from '../domain/Device';
import Node from '../domain/Node';
import HomiePublisher from '../services/HomiePublisher';

import addNodeUseCase from './addNodeUseCase';

jest.mock('../services/HomiePublisher');

const MockedHomiePublisher = (HomiePublisher as unknown) as jest.Mock<HomiePublisher>;

describe('useCases/addNodeUseCase', () => {
  it('should create a new Node, add it to the Device and publish it with the HomiePublisher', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishNode: jest.fn(() => Promise.resolve(Result.ok())),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const device = Device.create({ deviceId: 'device0' }).value as Device;
    const nodeProps = { nodeId: 'node0' };

    const result = await addNodeUseCase({ device, nodeProps, homiePublisher });

    expect(result.succeded()).toBeTruthy();

    const addedNode = device.nodes.find(({ nodeId }) => nodeId === nodeProps.nodeId);

    expect(addedNode).toEqual(expect.any(Node));
    expect(addedNode).toEqual(Node.create({ deviceId: device.id, ...nodeProps }).value);
    expect(homiePublisher.publishNode).toHaveBeenCalledWith(device, addedNode);
  });

  it('should return a failed Result if Node creation fails', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishNode: jest.fn(() => Promise.resolve(Result.ok())),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const device = Device.create({ deviceId: 'device0' }).value as Device;
    const nodeProps = { nodeId: 'Node0' };

    const result = await addNodeUseCase({ device, nodeProps, homiePublisher });

    expect(result.failed()).toBeTruthy();
    expect(device.nodes.find(({ nodeId }) => nodeId === nodeProps.nodeId)).toBe(undefined);
    expect(homiePublisher.publishNode).not.toHaveBeenCalled();
  });

  it('should return a failed Result if Node cannot be added to the device creation fails', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishNode: jest.fn(() => Promise.resolve(Result.ok())),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const device = Device.create({ deviceId: 'device0' }).value as Device;
    const nodeProps = { nodeId: 'node0' };

    await addNodeUseCase({ device, nodeProps, homiePublisher });

    (homiePublisher.publishNode as jest.Mock).mockClear();

    const result = await addNodeUseCase({ device, nodeProps, homiePublisher });

    expect(result.failed()).toBeTruthy();
    expect(device.nodes).toHaveLength(1);
    expect(homiePublisher.publishNode).not.toHaveBeenCalled();
  });

  it('should return a failed Result if the HomiePublisher fails to publish', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishNode: jest.fn(() => Promise.resolve(Result.fail(new Error()))),
        } as unknown) as HomiePublisher),
    );

    const homiePublisher = new MockedHomiePublisher();
    const device = Device.create({ deviceId: 'device0' }).value as Device;
    const nodeProps = { nodeId: 'node0' };

    const result = await addNodeUseCase({ device, nodeProps, homiePublisher });

    expect(result.failed()).toBeTruthy();
  });
});
