# Class: HomiePublisher

## Hierarchy

* **HomiePublisher**

## Constructors

###  constructor

\+ **new HomiePublisher**(`__namedParameters`: object): *[HomiePublisher](homiepublisher.md)*

*Defined in [homie/services/HomiePublisher.ts:11](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/services/HomiePublisher.ts#L11)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`mqttConnectionManager` | [MqttConnectionManager](mqttconnectionmanager.md) |

**Returns:** *[HomiePublisher](homiepublisher.md)*

## Properties

### `Private` mqttConnectionManager

• **mqttConnectionManager**: *[MqttConnectionManager](mqttconnectionmanager.md)*

*Defined in [homie/services/HomiePublisher.ts:11](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/services/HomiePublisher.ts#L11)*

## Methods

### `Private` createConnection

▸ **createConnection**(`device`: [Device](device.md)): *Promise‹[Result](result.md)‹[MqttClient](../interfaces/mqttclient.md)››*

*Defined in [homie/services/HomiePublisher.ts:17](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/services/HomiePublisher.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](device.md) |

**Returns:** *Promise‹[Result](result.md)‹[MqttClient](../interfaces/mqttclient.md)››*

___

###  disconnect

▸ **disconnect**(`device`: [Device](device.md)): *Promise‹[Result](result.md)‹void››*

*Defined in [homie/services/HomiePublisher.ts:106](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/services/HomiePublisher.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](device.md) |

**Returns:** *Promise‹[Result](result.md)‹void››*

___

###  publishDevice

▸ **publishDevice**(`device`: [Device](device.md)): *Promise‹[Result](result.md)‹void››*

*Defined in [homie/services/HomiePublisher.ts:36](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/services/HomiePublisher.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](device.md) |

**Returns:** *Promise‹[Result](result.md)‹void››*

___

###  publishNode

▸ **publishNode**(`device`: [Device](device.md), `node`: [Node](node.md)): *Promise‹[Result](result.md)‹void››*

*Defined in [homie/services/HomiePublisher.ts:78](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/services/HomiePublisher.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](device.md) |
`node` | [Node](node.md) |

**Returns:** *Promise‹[Result](result.md)‹void››*

___

###  publishStateUpdate

▸ **publishStateUpdate**(`device`: [Device](device.md)): *Promise‹[Result](result.md)‹void››*

*Defined in [homie/services/HomiePublisher.ts:63](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/services/HomiePublisher.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](device.md) |

**Returns:** *Promise‹[Result](result.md)‹void››*

___

### `Static` create

▸ **create**(`__namedParameters`: object): *[HomiePublisher](homiepublisher.md)*

*Defined in [homie/services/HomiePublisher.ts:119](https://github.com/AlejandroHerr/homieiot.ts/blob/1330521/src/homie/services/HomiePublisher.ts#L119)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`mqttConnectionManager` | [MqttConnectionManager](mqttconnectionmanager.md) |

**Returns:** *[HomiePublisher](homiepublisher.md)*
