import { RequiredDeviceProps, OptionalDeviceProps } from '../domain/Device';

export default interface DevicePropsDTO extends RequiredDeviceProps, Partial<OptionalDeviceProps> {}
