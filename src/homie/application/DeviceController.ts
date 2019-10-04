import ApplicationError from '../../core/application/ApplicationError';

import Device from '../domain/Device';
import NodePropsDTO from '../dto/NodePropsDTO';
import HomiePublisher from '../services/HomiePublisher';
import updateStateUseCase from '../useCases/updateStateUseCase';
import addNodeUseCase from '../useCases/addNodeUseCase';
import disconnectUseCase from '../useCases/disconnectUseCase';

export default class DeviceController {
  readonly device: Device;

  readonly homiePublisher: HomiePublisher;

  constructor({ device, homiePublisher }: { device: Device; homiePublisher: HomiePublisher }) {
    this.device = device;
    this.homiePublisher = homiePublisher;
  }

  async updateState(state: Device['state']): Promise<this> {
    const result = await updateStateUseCase({ device: this.device, homiePublisher: this.homiePublisher, state });

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
    const result = await disconnectUseCase({ device: this.device, homiePublisher: this.homiePublisher });

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
