import { NodeAttributesProps } from '../domain/Node';

export default interface NodePropsDTO extends Partial<NodeAttributesProps> {
  nodeId: string;
}
