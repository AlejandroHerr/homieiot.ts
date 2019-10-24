# Class: Device

## Hierarchy

* [Entity](entity.md)‹[DeviceProps](../interfaces/deviceprops.md)›

  ↳ **Device**

## Constructors

###  constructor

\+ **new Device**(`props`: [DeviceProps](../interfaces/deviceprops.md), `id`: string): *[Device](device.md)*

*Inherited from [Entity](entity.md).[constructor](entity.md#constructor)*

*Defined in [core/domain/Entity.ts:4](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/domain/Entity.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [DeviceProps](../interfaces/deviceprops.md) |
`id` | string |

**Returns:** *[Device](device.md)*

## Properties

###  id

• **id**: *string*

*Inherited from [Entity](entity.md).[id](entity.md#id)*

*Defined in [core/domain/Entity.ts:2](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/domain/Entity.ts#L2)*

___

###  props

• **props**: *[DeviceProps](../interfaces/deviceprops.md)*

*Inherited from [Entity](entity.md).[props](entity.md#props)*

*Defined in [core/domain/Entity.ts:4](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/domain/Entity.ts#L4)*

## Accessors

###  deviceId

• **get deviceId**(): *string*

*Defined in [homie/domain/Device.ts:33](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/homie/domain/Device.ts#L33)*

**Returns:** *string*

___

###  extensions

• **get extensions**(): *string*

*Defined in [homie/domain/Device.ts:53](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/homie/domain/Device.ts#L53)*

**Returns:** *string*

___

###  homie

• **get homie**(): *string*

*Defined in [homie/domain/Device.ts:37](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/homie/domain/Device.ts#L37)*

**Returns:** *string*

___

###  name

• **get name**(): *string*

*Defined in [homie/domain/Device.ts:41](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/homie/domain/Device.ts#L41)*

**Returns:** *string*

___

###  nodes

• **get nodes**(): *[Node](node.md)[]*

*Defined in [homie/domain/Device.ts:49](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/homie/domain/Device.ts#L49)*

**Returns:** *[Node](node.md)[]*

___

###  state

• **get state**(): *"init" | "ready" | "disconnected" | "sleeping" | "lost" | "alert"*

*Defined in [homie/domain/Device.ts:45](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/homie/domain/Device.ts#L45)*

**Returns:** *"init" | "ready" | "disconnected" | "sleeping" | "lost" | "alert"*

## Methods

###  addNode

▸ **addNode**(`node`: [Node](node.md)): *[Result](result.md)‹void›*

*Defined in [homie/domain/Device.ts:57](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/homie/domain/Device.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [Node](node.md) |

**Returns:** *[Result](result.md)‹void›*

___

###  setState

▸ **setState**(`state`: "init" | "ready" | "disconnected" | "sleeping" | "lost" | "alert"): *[Result](result.md)‹void›*

*Defined in [homie/domain/Device.ts:73](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/homie/domain/Device.ts#L73)*

**Parameters:**

Name | Type |
------ | ------ |
`state` | "init" &#124; "ready" &#124; "disconnected" &#124; "sleeping" &#124; "lost" &#124; "alert" |

**Returns:** *[Result](result.md)‹void›*

___

### `Static` create

▸ **create**(`deviceProps`: [RequiredDeviceProps](../interfaces/requireddeviceprops.md) & Partial‹[OptionalDeviceProps](../interfaces/optionaldeviceprops.md)›): *[Result](result.md)‹[Device](device.md)›*

*Defined in [homie/domain/Device.ts:85](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/homie/domain/Device.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`deviceProps` | [RequiredDeviceProps](../interfaces/requireddeviceprops.md) & Partial‹[OptionalDeviceProps](../interfaces/optionaldeviceprops.md)› |

**Returns:** *[Result](result.md)‹[Device](device.md)›*
