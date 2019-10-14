import ApplicationError from '../../core/application/ApplicationError';

import Device from '../domain/Device';
import NodePropsDTO from '../dto/NodePropsDTO';
import HomiePublisher from '../services/HomiePublisher';
import addNodeUseCase from '../useCases/addNodeUseCase';
import disconnectDeviceUseCase from '../useCases/disconnectDeviceUseCase';
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

  hasNode(nodeId: string): boolean {
    return this.device.nodes.some(node => node.nodeId === nodeId);
  }

  getNode(nodeId: string): NodeController {
    const foundNode = this.device.nodes.find(node => node.nodeId === nodeId);

    if (!foundNode) {
      throw ApplicationError.create(`Node ${nodeId} not found in device ${this.device.id}`);
    }

    return NodeController.create({ node: foundNode, homiePublisher: this.homiePublisher });
  }

  static create({ device, homiePublisher }: { device: Device; homiePublisher: HomiePublisher }): DeviceController {
    const deviceController = new DeviceController({ device, homiePublisher });

    return deviceController;
  }
}
