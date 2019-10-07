import Entity from '../../core/domain/Entity';
import Result from '../../core/logic/Result';

import generateUUID from './generateUUID';
import Node from './Node';

export interface RequiredDeviceProps {
  deviceId: string;
}

export interface OptionalDeviceProps {
  homie: string;
  name: string;
  state: 'init' | 'ready' | 'disconnected' | 'sleeping' | 'lost' | 'alert';
  nodes: Node[];
  extensions: string;
}

export interface DeviceProps extends RequiredDeviceProps, OptionalDeviceProps {}

const defaultProps: OptionalDeviceProps = {
  homie: '4.0.0',
  name: '',
  state: 'ready',
  nodes: [],
  extensions: '',
};

export default class Device extends Entity<DeviceProps> {
  get deviceId(): string {
    return this.props.deviceId;
  }

  get homie(): string {
    return this.props.homie;
  }

  get name(): string {
    return this.props.name;
  }

  get state(): DeviceProps['state'] {
    return this.props.state;
  }

  get nodes(): Node[] {
    return this.props.nodes;
  }

  get extensions(): string {
    return this.props.extensions;
  }

  addNode(node: Node): Result<void> {
    if (this.nodes.some(({ id }) => node.id === id)) {
      Result.fail(`Node ${node.id} already exists in ${this.deviceId}`);
    }

    this.nodes.push(node);

    return Result.ok();
  }

  updateState(state: DeviceProps['state']): Result<void> {
    this.props.state = state;

    return Result.ok();
  }

  static create(deviceProps: RequiredDeviceProps & Partial<OptionalDeviceProps>): Result<Device> {
    const id = generateUUID(deviceProps);

    const device = new Device({ ...defaultProps, ...deviceProps }, id);

    return Result.ok(device);
  }
}
