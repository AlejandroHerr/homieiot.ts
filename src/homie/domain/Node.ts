import Entity from '../../core/domain/Entity';
import Result from '../../core/logic/Result';

import generateUUID from './generateUUID';
import Property from './Property';

export interface NodeIdProps {
  deviceId: string;
  nodeId: string;
}

export interface NodeAttributesProps {
  name: string;
  type: string;
  properties: Property[];
}

export interface NodeProps extends NodeIdProps, NodeAttributesProps {}

const defaultProps: NodeAttributesProps = {
  name: '',
  type: '',
  properties: [],
};

export default class Node extends Entity<NodeProps> {
  get deviceId(): string {
    return this.props.deviceId;
  }

  get nodeId(): string {
    return this.props.nodeId;
  }

  get name(): string {
    return this.props.name;
  }

  get type(): string {
    return this.props.type;
  }

  get properties(): Property[] {
    return this.props.properties;
  }

  static create(nodeProps: NodeIdProps & Partial<NodeAttributesProps>): Result<Node> {
    const id = generateUUID(nodeProps);

    const node = new Node({ ...defaultProps, ...nodeProps }, id);

    return Result.ok(node);
  }
}
