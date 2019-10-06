import ValueObject from '../../core/domain/ValueObject';
import datatypeSchema from './validation/datatypeSchema';
import Result from '../../core/logic/Result';

// interface IntegerOrFloatDataType {
//   datatype: 'integer' | 'float';
//   format?: string;
// }

// interface EnumDataType {
//   datatype: 'enum';
//   format: string[];
// }

// interface ColorDatatype {
//   datatype: 'color';
//   format?: string;
// }

// interface BooleanOrStringDataType {
//   datatype: 'boolean' | 'string';
// }

// export type DatatypeProps = IntegerOrFloatDataType | EnumDataType | ColorDatatype | BooleanOrStringDataType;

export interface DatatypeProps {
  datatype: 'integer' | 'float' | 'boolean' | 'string' | 'enum' | 'color';
  format?: string | string[] | number[];
}

export default class Datatype extends ValueObject<DatatypeProps> {
  get datatype(): DatatypeProps['datatype'] {
    return this.props.datatype;
  }

  get format(): DatatypeProps['format'] {
    return this.props.format;
  }

  static create(props: DatatypeProps): Result<Datatype> {
    const validationResult = datatypeSchema.validate(props, { convert: false });

    if (validationResult.error) {
      return Result.fail(validationResult.error);
    }

    return Result.ok(new Datatype(props));
  }
}
