import Entity from '../../core/domain/Entity';

import generateUUID from './generateUUID';

export interface PropertyIdProps {
  deviceId: string;
  nodeId: string;
}

export interface PropertyAttributesProps {
  name: string;
  value: string;
  attributes: Record<string, string>;
}

export interface PropertyProps extends PropertyIdProps, PropertyAttributesProps {}

const defaultProps: PropertyAttributesProps = {
  name: '',
  value: '',
  attributes: {},
};

export default class Property extends Entity<PropertyProps> {
  get deviceId(): string {
    return this.props.deviceId;
  }

  get nodeId(): string {
    return this.props.nodeId;
  }

  get propertyId(): string {
    return this.props.nodeId;
  }

  get value(): string {
    return this.props.value;
  }

  get attributes(): Record<string, string> {
    return this.props.attributes;
  }

  static create(propertyProps: PropertyIdProps & Partial<PropertyAttributesProps>): Property {
    const id = generateUUID(propertyProps);

    return new Property({ ...defaultProps, ...propertyProps }, id);
  }
}
