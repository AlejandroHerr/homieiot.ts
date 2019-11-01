import Result from '../../core/logic/Result';

import Device from '../domain/Device';
import Node from '../domain/Node';
import NodePropsDTO from '../dto/NodePropsDTO';
import HomiePublisher from '../services/HomiePublisher';

interface AddNodeUseCaseDTO {
  device: Device;
  nodeProps: NodePropsDTO;
  homiePublisher: HomiePublisher;
}

const addNodeUseCase = async ({ device, nodeProps, homiePublisher }: AddNodeUseCaseDTO): Promise<Result<void>> => {
  const nodeOrError = Node.create({ deviceId: device.deviceId, ...nodeProps });

  if (nodeOrError.failed()) {
    return Result.fail(nodeOrError.error);
  }

  const node = nodeOrError.value as Node;

  const addResult = device.addNode(node);

  if (addResult.failed()) {
    return Result.fail(addResult.error);
  }

  const publishResult = await homiePublisher.publishNode(device, node);

  if (publishResult.failed()) {
    return Result.fail(publishResult.error);
  }

  return Result.ok();
};

export default addNodeUseCase;