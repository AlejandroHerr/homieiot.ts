import Entity from '../../core/domain/Entity';
import Result from '../../core/logic/Result';

import generateUUID from './generateUUID';
import Property from './Property';
import nodeSchema from './validation/nodeSchema';

interface RequiredNodeProps {
  deviceId: string;
  nodeId: string;
}

interface OptionalNodeProps {
  name: string;
  type: string;
  properties: Property[];
}

export interface NodeProps extends RequiredNodeProps, OptionalNodeProps {}

const defaultProps: OptionalNodeProps = {
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

  static create(nodeProps: RequiredNodeProps & Partial<OptionalNodeProps>): Result<Node> {
    const props = { ...defaultProps, ...nodeProps };
    const propsValidationResult = nodeSchema.validate(props, { convert: false });

    if (propsValidationResult.error) {
      return Result.fail(propsValidationResult.error);
    }

    const id = generateUUID(nodeProps);

    return Result.ok(new Node({ ...defaultProps, ...nodeProps }, id));
  }
}
