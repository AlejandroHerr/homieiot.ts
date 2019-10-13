# Class: MqttConnectionManager

## Hierarchy

* **MqttConnectionManager**

## Constructors

###  constructor

\+ **new MqttConnectionManager**(`__namedParameters`: object): *[MqttConnectionManager](mqttconnectionmanager.md)*

*Defined in [core/infrastructure/MqttConnectionManager.ts:10](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/core/infrastructure/MqttConnectionManager.ts#L10)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`options` | object |

**Returns:** *[MqttConnectionManager](mqttconnectionmanager.md)*

## Properties

###  options

• **options**: *Partial‹[MqttClientOptions](../interfaces/mqttclientoptions.md)›*

*Defined in [core/infrastructure/MqttConnectionManager.ts:8](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/core/infrastructure/MqttConnectionManager.ts#L8)*

___

### `Private` store

• **store**: *Map‹string, [MqttClient](../interfaces/mqttclient.md)›* =  new Map()

*Defined in [core/infrastructure/MqttConnectionManager.ts:10](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/core/infrastructure/MqttConnectionManager.ts#L10)*

## Methods

###  createConnection

▸ **createConnection**(`__namedParameters`: object): *Promise‹[Result](result.md)‹[MqttClient](../interfaces/mqttclient.md)››*

*Defined in [core/infrastructure/MqttConnectionManager.ts:16](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/core/infrastructure/MqttConnectionManager.ts#L16)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`id` | string |
`options` | undefined &#124; [MqttClientOptions](../interfaces/mqttclientoptions.md) |

**Returns:** *Promise‹[Result](result.md)‹[MqttClient](../interfaces/mqttclient.md)››*

___

###  getConnection

▸ **getConnection**(`id`: string): *[Result](result.md)‹[MqttClient](../interfaces/mqttclient.md)›*

*Defined in [core/infrastructure/MqttConnectionManager.ts:40](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/core/infrastructure/MqttConnectionManager.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[Result](result.md)‹[MqttClient](../interfaces/mqttclient.md)›*

___

###  hasConnection

▸ **hasConnection**(`deviceId`: string): *boolean*

*Defined in [core/infrastructure/MqttConnectionManager.ts:36](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/core/infrastructure/MqttConnectionManager.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`deviceId` | string |

**Returns:** *boolean*

___

###  removeConnection

▸ **removeConnection**(`id`: string): *[Result](result.md)‹[MqttClient](../interfaces/mqttclient.md)›*

*Defined in [core/infrastructure/MqttConnectionManager.ts:48](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/core/infrastructure/MqttConnectionManager.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | string |

**Returns:** *[Result](result.md)‹[MqttClient](../interfaces/mqttclient.md)›*

___

### `Static` create

▸ **create**(`__namedParameters`: object): *[MqttConnectionManager](mqttconnectionmanager.md)*

*Defined in [core/infrastructure/MqttConnectionManager.ts:58](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/core/infrastructure/MqttConnectionManager.ts#L58)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`options` | object |

**Returns:** *[MqttConnectionManager](mqttconnectionmanager.md)*
