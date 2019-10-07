import Property from '../domain/Property';

export default interface NodePropsDTO {
  nodeId: string;
  name?: string;
  type?: string;
  properties?: Property[];
}
