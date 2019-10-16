/* eslint-disable @typescript-eslint/unbound-method */
import Result from '../../core/logic/Result';

import Node from '../domain/Node';
import Property from '../domain/Property';
import HomiePublisher from '../services/HomiePublisher';

import addPropertyUseCase from './addPropertyUseCase';
import PropertyPropsDTO from '../dto/PropertyPropsDTO';
import Datatype from '../domain/Datatype';

jest.mock('../services/HomiePublisher');

const MockedHomiePublisher = (HomiePublisher as unknown) as jest.Mock<HomiePublisher>;

const setup = (): { node: Node; homiePublisher: HomiePublisher } => {
  const homiePublisher = new MockedHomiePublisher();
  const node = Node.create({ deviceId: 'device0', nodeId: 'node0' }).value as Node;

  return { node, homiePublisher };
};

describe('useCases/addPropertyUseCase', () => {
  it('should create a new Property, add it to the Node and publish it with the HomiePublisher', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishProperty: jest.fn(() => Promise.resolve(Result.ok())),
        } as unknown) as HomiePublisher),
    );

    const { node, homiePublisher } = setup();

    const propertyProps: PropertyPropsDTO = { propertyId: 'property0', datatype: { datatype: 'integer' } };

    const result = await addPropertyUseCase({ node, propertyProps, homiePublisher });

    expect(result.succeded()).toBeTruthy();

    const addedProperty = node.properties.find(({ propertyId }) => propertyId === propertyProps.propertyId);

    expect(addedProperty).toEqual(expect.any(Property));
    expect(addedProperty).toEqual(
      Property.create({
        deviceId: node.deviceId,
        nodeId: node.nodeId,
        propertyId: propertyProps.propertyId,
        datatype: Datatype.create(propertyProps.datatype).value as Datatype,
      }).value,
    );
    expect(homiePublisher.publishProperty).toHaveBeenCalledWith(node, addedProperty);
  });

  it('should return a failed Result if Property validation fails', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishProperty: jest.fn(() => Promise.resolve(Result.ok())),
        } as unknown) as HomiePublisher),
    );

    const { node, homiePublisher } = setup();

    const resultWithBadDatatypeProps = await addPropertyUseCase({
      node,
      homiePublisher,
      propertyProps: { propertyId: 'property0', datatype: { datatype: 'integer', format: [0] } },
    });

    expect(resultWithBadDatatypeProps.failed()).toBeTruthy();
    expect(node.properties).toHaveLength(0);
    expect(homiePublisher.publishProperty).not.toHaveBeenCalled();

    const resultWithBadProps = await addPropertyUseCase({
      node,
      homiePublisher,
      propertyProps: { propertyId: 'Property0', datatype: { datatype: 'integer' } },
    });

    expect(resultWithBadProps.failed()).toBeTruthy();
    expect(node.properties).toHaveLength(0);
    expect(homiePublisher.publishProperty).not.toHaveBeenCalled();
  });

  it('should return a failed Result if Property already exists', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishProperty: jest.fn(() => Promise.resolve(Result.ok())),
        } as unknown) as HomiePublisher),
    );

    const { node, homiePublisher } = setup();

    const propertyProps: PropertyPropsDTO = { propertyId: 'property0', datatype: { datatype: 'integer' } };

    await addPropertyUseCase({ node, propertyProps, homiePublisher });

    (homiePublisher.publishProperty as jest.Mock).mockClear();

    const result = await addPropertyUseCase({ node, propertyProps, homiePublisher });

    expect(result.failed()).toBeTruthy();
    expect(node.properties).toHaveLength(1);
    expect(homiePublisher.publishProperty).not.toHaveBeenCalled();
  });

  it('should return a failed Result if the HomiePublisher fails to publish', async () => {
    MockedHomiePublisher.mockImplementationOnce(
      () =>
        (({
          publishProperty: jest.fn(() => Promise.resolve(Result.fail(new Error()))),
        } as unknown) as HomiePublisher),
    );

    const { node, homiePublisher } = setup();

    const propertyProps: PropertyPropsDTO = { propertyId: 'property0', datatype: { datatype: 'integer' } };

    const result = await addPropertyUseCase({ node, propertyProps, homiePublisher });

    expect(result.failed()).toBeTruthy();
  });
});
