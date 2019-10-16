import Node from '../domain/Node';
import Property from '../domain/Property';

const getPropertyFromNodeUseCase = ({ node, propertyId }: { node: Node; propertyId: string }): Property | undefined =>
  node.getProperty(propertyId);

export default getPropertyFromNodeUseCase;
