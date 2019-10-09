# Class: HomiePublisher

## Hierarchy

* **HomiePublisher**

## Constructors

###  constructor

\+ **new HomiePublisher**(`__namedParameters`: object): *[HomiePublisher](homiepublisher.md)*

*Defined in [homie/services/HomiePublisher.ts:11](https://github.com/AlejandroHerr/homieiot.ts/blob/188cbb7/src/homie/services/HomiePublisher.ts#L11)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`mqttConnectionManager` | [MqttConnectionManager](mqttconnectionmanager.md) |

**Returns:** *[HomiePublisher](homiepublisher.md)*

## Properties

### `Private` mqttConnectionManager

• **mqttConnectionManager**: *[MqttConnectionManager](mqttconnectionmanager.md)*

*Defined in [homie/services/HomiePublisher.ts:11](https://github.com/AlejandroHerr/homieiot.ts/blob/188cbb7/src/homie/services/HomiePublisher.ts#L11)*

## Methods

### `Private` createConnection

▸ **createConnection**(`device`: [Device](device.md)): *Promise‹[Result](result.md)‹[MqttClient](../interfaces/mqttclient.md)››*

*Defined in [homie/services/HomiePublisher.ts:17](https://github.com/AlejandroHerr/homieiot.ts/blob/188cbb7/src/homie/services/HomiePublisher.ts#L17)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](device.md) |

**Returns:** *Promise‹[Result](result.md)‹[MqttClient](../interfaces/mqttclient.md)››*

___

###  disconnect

▸ **disconnect**(`device`: [Device](device.md)): *Promise‹[Result](result.md)‹void››*

*Defined in [homie/services/HomiePublisher.ts:120](https://github.com/AlejandroHerr/homieiot.ts/blob/188cbb7/src/homie/services/HomiePublisher.ts#L120)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](device.md) |

**Returns:** *Promise‹[Result](result.md)‹void››*

___

###  publisNode

▸ **publisNode**(`node`: [Node](node.md)): *Promise‹[Result](result.md)‹void››*

*Defined in [homie/services/HomiePublisher.ts:93](https://github.com/AlejandroHerr/homieiot.ts/blob/188cbb7/src/homie/services/HomiePublisher.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [Node](node.md) |

**Returns:** *Promise‹[Result](result.md)‹void››*

___

###  publishDevice

▸ **publishDevice**(`device`: [Device](device.md)): *Promise‹[Result](result.md)‹void››*

*Defined in [homie/services/HomiePublisher.ts:36](https://github.com/AlejandroHerr/homieiot.ts/blob/188cbb7/src/homie/services/HomiePublisher.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](device.md) |

**Returns:** *Promise‹[Result](result.md)‹void››*

___

###  publishNodeUpdate

▸ **publishNodeUpdate**(`device`: [Device](device.md)): *Promise‹[Result](result.md)‹void››*

*Defined in [homie/services/HomiePublisher.ts:78](https://github.com/AlejandroHerr/homieiot.ts/blob/188cbb7/src/homie/services/HomiePublisher.ts#L78)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](device.md) |

**Returns:** *Promise‹[Result](result.md)‹void››*

___

###  publishStateUpdate

▸ **publishStateUpdate**(`device`: [Device](device.md)): *Promise‹[Result](result.md)‹void››*

*Defined in [homie/services/HomiePublisher.ts:63](https://github.com/AlejandroHerr/homieiot.ts/blob/188cbb7/src/homie/services/HomiePublisher.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](device.md) |

**Returns:** *Promise‹[Result](result.md)‹void››*

___

### `Static` create

▸ **create**(`__namedParameters`: object): *[HomiePublisher](homiepublisher.md)*

*Defined in [homie/services/HomiePublisher.ts:133](https://github.com/AlejandroHerr/homieiot.ts/blob/188cbb7/src/homie/services/HomiePublisher.ts#L133)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`mqttConnectionManager` | [MqttConnectionManager](mqttconnectionmanager.md) |

**Returns:** *[HomiePublisher](homiepublisher.md)*
