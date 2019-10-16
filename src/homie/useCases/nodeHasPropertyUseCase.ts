import Node from '../domain/Node';

const nodeHasPropertyUseCase = ({ node, propertyId }: { node: Node; propertyId: string }): boolean =>
  node.hasProperty(propertyId);

export default nodeHasPropertyUseCase;
