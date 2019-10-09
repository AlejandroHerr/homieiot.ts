import Entity from '../../core/domain/Entity';
import Result from '../../core/logic/Result';

import Datatype from './Datatype';
import generateUUID from './generateUUID';
import propertyValueSchema from './validation/propertyValueSchema';
import propertySchema from './validation/propertySchema';

export interface RequiredPropertyProps {
  deviceId: string;
  nodeId: string;
  propertyId: string;
  datatype: Datatype;
}

export interface OptionalNodeProps {
  name: string;
  settable: boolean;
  retained: boolean;
  unit?: string;
  value: string | number | boolean;
}

export interface PropertyProps extends RequiredPropertyProps, OptionalNodeProps {}

const defaultProps: OptionalNodeProps = {
  name: '',
  settable: false,
  retained: true,
  value: '',
};

export default class Property extends Entity<PropertyProps> {
  get deviceId(): PropertyProps['deviceId'] {
    return this.props.deviceId;
  }

  get nodeId(): PropertyProps['nodeId'] {
    return this.props.nodeId;
  }

  get propertyId(): PropertyProps['propertyId'] {
    return this.props.propertyId;
  }

  get name(): PropertyProps['name'] {
    return this.props.name;
  }

  get datatype(): PropertyProps['datatype'] {
    return this.props.datatype;
  }

  get settable(): PropertyProps['settable'] {
    return this.props.settable;
  }

  get retained(): PropertyProps['retained'] {
    return this.props.retained;
  }

  get unit(): PropertyProps['unit'] {
    return this.props.unit;
  }

  get value(): PropertyProps['value'] {
    return this.props.value;
  }

  setValue(value: PropertyProps['value']): Result<void> {
    const validationResult = propertyValueSchema(this.datatype).validate(value, { convert: false });

    if (validationResult.error) {
      return Result.fail(validationResult.error);
    }

    this.props.value = value;

    return Result.ok();
  }

  static create(propertyProps: RequiredPropertyProps & Partial<OptionalNodeProps>): Result<Property> {
    const propsOrValue = propertySchema.validate({ ...defaultProps, ...propertyProps }, { convert: false });

    if (propsOrValue.error) {
      return Result.fail(propsOrValue.error);
    }

    if (propertyProps.value !== undefined) {
      const valueValidationResult = propertyValueSchema(propsOrValue.value.datatype).validate(
        propsOrValue.value.value,
        {
          convert: false,
        },
      );

      if (valueValidationResult.error) {
        return Result.fail(valueValidationResult.error);
      }
    }

    const id = generateUUID(propsOrValue.value);

    return Result.ok<Property>(new Property(propsOrValue.value, id));
  }
}
