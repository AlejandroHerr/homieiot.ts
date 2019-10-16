import Entity from '../../core/domain/Entity';
import Result from '../../core/logic/Result';

import generateUUID from './generateUUID';
import Node from './Node';
import deviceStateSchema from './validation/deviceStateSchema';
import deviceSchema from './validation/deviceSchema';
import deviceNodeSchema from './validation/deviceNodeSchema';

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

  getNode(nodeId: string): Node | undefined {
    return this.nodes.find(node => node.nodeId === nodeId);
  }

  hasNode(nodeId: string): boolean {
    return this.nodes.some(node => node.nodeId === nodeId);
  }

  addNode(node: Node): Result<void> {
    const validationResult = deviceNodeSchema.validate(node, { convert: false });

    if (validationResult.error) {
      return Result.fail(validationResult.error);
    }

    if (this.hasNode(node.nodeId)) {
      return Result.fail(`Node ${node.id} already exists in ${this.deviceId}`);
    }

    this.nodes.push(node);

    return Result.ok();
  }

  setState(state: DeviceProps['state']): Result<void> {
    const validationResult = deviceStateSchema.validate(state, { convert: false });

    if (validationResult.error) {
      return Result.fail(validationResult.error);
    }

    this.props.state = state;

    return Result.ok();
  }

  static create(deviceProps: RequiredDeviceProps & Partial<OptionalDeviceProps>): Result<Device> {
    const propsOrError = deviceSchema.validate<DeviceProps>({ ...defaultProps, ...deviceProps });

    if (propsOrError.error) {
      return Result.fail(propsOrError.error);
    }

    const id = generateUUID(propsOrError.value);

    return Result.ok(new Device(propsOrError.value, id));
  }
}