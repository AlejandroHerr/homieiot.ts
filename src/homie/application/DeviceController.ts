import ApplicationError from '../../core/application/ApplicationError';

import Device from '../domain/Device';
import NodePropsDTO from '../dto/NodePropsDTO';
import HomiePublisher from '../services/HomiePublisher';
import addNodeUseCase from '../useCases/addNodeUseCase';
import deviceHasNodeUseCase from '../useCases/deviceHasNodeUseCase';
import disconnectDeviceUseCase from '../useCases/disconnectDeviceUseCase';
import getNodeFromDeviceUseCase from '../useCases/getNodeFromDeviceUseCase';
import setDeviceStateUseCase from '../useCases/setDeviceStateUseCase';

import NodeController from './NodeController';

export default class DeviceController {
  readonly device: Device;

  readonly homiePublisher: HomiePublisher;

  constructor({ device, homiePublisher }: { device: Device; homiePublisher: HomiePublisher }) {
    this.device = device;
    this.homiePublisher = homiePublisher;
  }

  async setState(state: Device['state']): Promise<this> {
    const result = await setDeviceStateUseCase({ device: this.device, homiePublisher: this.homiePublisher, state });

    if (result.failed()) {
      throw ApplicationError.create(result.error);
    }

    return this;
  }

  hasNode(nodeId: string): boolean {
    return deviceHasNodeUseCase({ device: this.device, nodeId });
  }

  getNode(nodeId: string): NodeController {
    const foundNode = getNodeFromDeviceUseCase({ device: this.device, nodeId });

    if (!foundNode) {
      throw ApplicationError.create(`Node ${nodeId} not found in device ${this.device.id}`);
    }

    return NodeController.create({ node: foundNode, homiePublisher: this.homiePublisher });
  }

  async addNode(nodeProps: NodePropsDTO): Promise<this> {
    const result = await addNodeUseCase({ device: this.device, nodeProps, homiePublisher: this.homiePublisher });

    if (result.failed()) {
      throw ApplicationError.create(result.error);
    }

    return this;
  }

  async disconnect(): Promise<this> {
    const result = await disconnectDeviceUseCase({ device: this.device, homiePublisher: this.homiePublisher });

    if (result.failed()) {
      throw ApplicationError.create(result.error);
    }

    return this;
  }

  static create({ device, homiePublisher }: { device: Device; homiePublisher: HomiePublisher }): DeviceController {
    const deviceController = new DeviceController({ device, homiePublisher });

    return deviceController;
  }
}
