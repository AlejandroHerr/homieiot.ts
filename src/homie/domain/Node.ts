import Entity from '../../core/domain/Entity';
import Result from '../../core/logic/Result';

import generateUUID from './generateUUID';
import Property from './Property';
import nodeSchema from './validation/nodeSchema';
import nodePropertySchema from './validation/nodePropertySchema';

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

  hasProperty(propertyId: string): boolean {
    return this.properties.some(property => property.propertyId === propertyId);
  }

  getProperty(propertyId: string): Property | undefined {
    return this.properties.find(property => property.propertyId === propertyId);
  }

  addProperty(property: Property): Result<void> {
    const validationResult = nodePropertySchema.validate(property, { convert: false });

    if (validationResult.error) {
      return Result.fail(validationResult.error);
    }

    if (this.properties.some(({ id }) => property.id === id)) {
      return Result.fail(`Property ${property.id} already exists in Node ${this.id}`);
    }

    this.properties.push(property);

    return Result.ok();
  }

  static create(nodeProps: RequiredNodeProps & Partial<OptionalNodeProps>): Result<Node> {
    const propsOrError = nodeSchema.validate({ ...defaultProps, ...nodeProps }, { convert: false });

    if (propsOrError.error) {
      return Result.fail(propsOrError.error);
    }

    const id = generateUUID(propsOrError.value);

    return Result.ok(new Node(propsOrError.value, id));
  }
}
