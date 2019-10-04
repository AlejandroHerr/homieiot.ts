import { IClientOptions } from 'mqtt';

import ApplicationError from '../../core/application/ApplicationError';

import Device from '../domain/Device';
import DevicePropsDTO from '../dto/DevicePropsDTO';
import HomiePublisher from '../services/HomiePublisher';
import publishDeviceUseCase from '../useCases/publishDeviceUseCase';

import DeviceController from './DeviceController';

export default class HomieController {
  private homiePublisher: HomiePublisher;

  constructor({ mqttOptions }: { mqttOptions: Partial<IClientOptions> }) {
    this.homiePublisher = HomiePublisher.create({ options: mqttOptions });
  }

  public async createDevice(deviceProps: DevicePropsDTO): Promise<DeviceController> {
    const deviceOrError = await publishDeviceUseCase({ deviceProps, homiePublisher: this.homiePublisher });

    if (deviceOrError.failed()) {
      throw ApplicationError.create(deviceOrError.error);
    }

    const device = deviceOrError.value as Device;

    return DeviceController.create({ device, homiePublisher: this.homiePublisher });
  }

  static create({ mqttOptions }: { mqttOptions: Partial<IClientOptions> }): HomieController {
    return new HomieController({ mqttOptions });
  }
}
