import ValueObject from '../../core/domain/ValueObject';
import datatypeSchema from './validation/datatypeSchema';
import Result from '../../core/logic/Result';

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
    const propsOrError = datatypeSchema.validate(props, { convert: false });

    if (propsOrError.error) {
      return Result.fail(propsOrError.error);
    }

    return Result.ok(new Datatype(propsOrError.value));
  }
}
