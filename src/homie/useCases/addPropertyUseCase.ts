import Result from '../../core/logic/Result';

import Node from '../domain/Node';
import Property from '../domain/Property';
import Datatype from '../domain/Datatype';
import PropertyPropsDTO from '../dto/PropertyPropsDTO';
import HomiePublisher from '../services/HomiePublisher';

interface AddPropertyUseCaseDTO {
  node: Node;
  propertyProps: PropertyPropsDTO;
  homiePublisher: HomiePublisher;
}

const addPropertyUseCase = async ({
  node,
  propertyProps,
  homiePublisher,
}: AddPropertyUseCaseDTO): Promise<Result<void>> => {
  const { datatype: datatypeProps, ...props } = propertyProps;

  const datatypeOrError = Datatype.create(datatypeProps);

  if (datatypeOrError.failed()) {
    return Result.fail(datatypeOrError.error);
  }

  const datatype = datatypeOrError.value as Datatype;

  const propertyOrError = Property.create({ deviceId: node.deviceId, nodeId: node.nodeId, datatype, ...props });

  if (propertyOrError.failed()) {
    return Result.fail(propertyOrError.error);
  }

  const property = propertyOrError.value as Property;

  const addResult = node.addProperty(property);

  if (addResult.failed()) {
    return Result.fail(addResult.error);
  }

  const publishResult = await homiePublisher.publishProperty(node, property);

  if (publishResult.failed()) {
    return Result.fail(publishResult.error);
  }

  return Result.ok();
};

export default addPropertyUseCase;
