import Device from '../domain/Device';
import Node from '../domain/Node';

const getNodeFromDeviceUseCase = ({ device, nodeId }: { device: Device; nodeId: string }): Node | undefined =>
  device.getNode(nodeId);

export default getNodeFromDeviceUseCase;
