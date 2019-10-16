import Device from '../domain/Device';

const deviceHasNodeUseCase = ({ device, nodeId }: { device: Device; nodeId: string }): boolean =>
  device.hasNode(nodeId);

export default deviceHasNodeUseCase;
