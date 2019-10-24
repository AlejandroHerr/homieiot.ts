import { DatatypeProps } from '../domain/Datatype';

export default interface PropertyPropsDTO {
  propertyId: string;
  datatype: DatatypeProps;
  name?: string;
  settable?: boolean;
  retained?: boolean;
  unit?: string;
  value?: string | number | boolean;
}
