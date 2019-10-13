# Class: DeviceController

## Hierarchy

* **DeviceController**

## Constructors

###  constructor

\+ **new DeviceController**(`__namedParameters`: object): *[DeviceController](devicecontroller.md)*

*Defined in [homie/application/DeviceController.ts:13](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/application/DeviceController.ts#L13)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`device` | [Device](device.md) |
`homiePublisher` | [HomiePublisher](homiepublisher.md) |

**Returns:** *[DeviceController](devicecontroller.md)*

## Properties

###  device

• **device**: *[Device](device.md)*

*Defined in [homie/application/DeviceController.ts:11](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/application/DeviceController.ts#L11)*

___

###  homiePublisher

• **homiePublisher**: *[HomiePublisher](homiepublisher.md)*

*Defined in [homie/application/DeviceController.ts:13](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/application/DeviceController.ts#L13)*

## Methods

###  addNode

▸ **addNode**(`nodeProps`: [NodePropsDTO](../interfaces/nodepropsdto.md)): *Promise‹this›*

*Defined in [homie/application/DeviceController.ts:30](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/application/DeviceController.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`nodeProps` | [NodePropsDTO](../interfaces/nodepropsdto.md) |

**Returns:** *Promise‹this›*

___

###  disconnect

▸ **disconnect**(): *Promise‹this›*

*Defined in [homie/application/DeviceController.ts:40](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/application/DeviceController.ts#L40)*

**Returns:** *Promise‹this›*

___

###  setState

▸ **setState**(`state`: "init" | "ready" | "disconnected" | "sleeping" | "lost" | "alert"): *Promise‹this›*

*Defined in [homie/application/DeviceController.ts:20](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/application/DeviceController.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`state` | "init" &#124; "ready" &#124; "disconnected" &#124; "sleeping" &#124; "lost" &#124; "alert" |

**Returns:** *Promise‹this›*

___

### `Static` create

▸ **create**(`__namedParameters`: object): *[DeviceController](devicecontroller.md)*

*Defined in [homie/application/DeviceController.ts:50](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/application/DeviceController.ts#L50)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`device` | [Device](device.md) |
`homiePublisher` | [HomiePublisher](homiepublisher.md) |

**Returns:** *[DeviceController](devicecontroller.md)*
