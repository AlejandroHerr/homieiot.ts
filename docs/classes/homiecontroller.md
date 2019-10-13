# Class: HomieController

## Hierarchy

* **HomieController**

## Constructors

###  constructor

\+ **new HomieController**(`__namedParameters`: object): *[HomieController](homiecontroller.md)*

*Defined in [homie/application/HomieController.ts:14](https://github.com/AlejandroHerr/homieiot.ts/blob/15259b3/src/homie/application/HomieController.ts#L14)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`homiePublisher` | [HomiePublisher](homiepublisher.md) |

**Returns:** *[HomieController](homiecontroller.md)*

## Properties

### `Private` homiePublisher

• **homiePublisher**: *[HomiePublisher](homiepublisher.md)*

*Defined in [homie/application/HomieController.ts:14](https://github.com/AlejandroHerr/homieiot.ts/blob/15259b3/src/homie/application/HomieController.ts#L14)*

## Methods

###  createDevice

▸ **createDevice**(`deviceProps`: [DevicePropsDTO](../interfaces/devicepropsdto.md)): *Promise‹[DeviceController](devicecontroller.md)›*

*Defined in [homie/application/HomieController.ts:20](https://github.com/AlejandroHerr/homieiot.ts/blob/15259b3/src/homie/application/HomieController.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`deviceProps` | [DevicePropsDTO](../interfaces/devicepropsdto.md) |

**Returns:** *Promise‹[DeviceController](devicecontroller.md)›*

___

### `Static` create

▸ **create**(`__namedParameters`: object): *[HomieController](homiecontroller.md)*

*Defined in [homie/application/HomieController.ts:32](https://github.com/AlejandroHerr/homieiot.ts/blob/15259b3/src/homie/application/HomieController.ts#L32)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`mqttOptions` | object |

**Returns:** *[HomieController](homiecontroller.md)*
