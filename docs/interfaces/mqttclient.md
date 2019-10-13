# Interface: MqttClient

## Hierarchy

* AsyncMqttClient

  ↳ **MqttClient**

## Constructors

###  constructor

\+ **new MqttClient**(`client`: IMqttClient): *[MqttClient](mqttclient.md)*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:50

**Parameters:**

Name | Type |
------ | ------ |
`client` | IMqttClient |

**Returns:** *[MqttClient](mqttclient.md)*

## Properties

###  connected

• **connected**: *boolean*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:60

___

###  disconnected

• **disconnected**: *boolean*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:62

___

###  disconnecting

• **disconnecting**: *boolean*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:61

___

###  incomingStore

• **incomingStore**: *Store*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:64

___

###  options

• **options**: *IClientOptions*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:66

___

###  outgoingStore

• **outgoingStore**: *Store*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:65

___

###  queueQoSZero

• **queueQoSZero**: *boolean*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:67

___

###  reconnecting

• **reconnecting**: *boolean*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:63

___

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:9

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:11

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  end

▸ **end**(`force?`: undefined | false | true): *Promise‹void›*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:66

**Parameters:**

Name | Type |
------ | ------ |
`force?` | undefined &#124; false &#124; true |

**Returns:** *Promise‹void›*

▸ **end**(`force`: boolean, `callback`: never): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:67

**Parameters:**

Name | Type |
------ | ------ |
`force` | boolean |
`callback` | never |

**Returns:** *this*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:24

**Returns:** *Array‹string | symbol›*

___

###  getLastMessageId

▸ **getLastMessageId**(): *number*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:194

getLastMessageId

**Returns:** *number*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:20

**Returns:** *number*

___

###  handleMessage

▸ **handleMessage**(`packet`: Packet, `callback`: PacketCallback): *void*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:189

Handle messages with backpressure support, one at a time.
Override at will.

**`api`** public

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`packet` | Packet | packet the packet |
`callback` | PacketCallback | callback call when finished |

**Returns:** *void*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:25

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:21

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:17

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: "message", `cb`: OnMessageCallback): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:71

**Parameters:**

Name | Type |
------ | ------ |
`event` | "message" |
`cb` | OnMessageCallback |

**Returns:** *this*

▸ **on**(`event`: "packetsend" | "packetreceive", `cb`: OnPacketCallback): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:72

**Parameters:**

Name | Type |
------ | ------ |
`event` | "packetsend" &#124; "packetreceive" |
`cb` | OnPacketCallback |

**Returns:** *this*

▸ **on**(`event`: "error", `cb`: OnErrorCallback): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:73

**Parameters:**

Name | Type |
------ | ------ |
`event` | "error" |
`cb` | OnErrorCallback |

**Returns:** *this*

▸ **on**(`event`: string, `cb`: Function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:74

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`cb` | Function |

**Returns:** *this*

___

###  once

▸ **once**(`event`: "message", `cb`: OnMessageCallback): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:76

**Parameters:**

Name | Type |
------ | ------ |
`event` | "message" |
`cb` | OnMessageCallback |

**Returns:** *this*

▸ **once**(`event`: "packetsend" | "packetreceive", `cb`: OnPacketCallback): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:77

**Parameters:**

Name | Type |
------ | ------ |
`event` | "packetsend" &#124; "packetreceive" |
`cb` | OnPacketCallback |

**Returns:** *this*

▸ **once**(`event`: "error", `cb`: OnErrorCallback): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:80

**Parameters:**

Name | Type |
------ | ------ |
`event` | "error" |
`cb` | OnErrorCallback |

**Returns:** *this*

▸ **once**(`event`: string, `cb`: Function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:81

**Parameters:**

Name | Type |
------ | ------ |
`event` | string |
`cb` | Function |

**Returns:** *this*

___

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:14

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:15

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  publish

▸ **publish**(`topic`: string, `message`: string | Buffer, `opts`: IClientPublishOptions): *Promise‹IPublishPacket›*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:61

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string |
`message` | string &#124; Buffer |
`opts` | IClientPublishOptions |

**Returns:** *Promise‹IPublishPacket›*

▸ **publish**(`topic`: string, `message`: string | Buffer): *Promise‹IPublishPacket›*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:62

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string |
`message` | string &#124; Buffer |

**Returns:** *Promise‹IPublishPacket›*

▸ **publish**(`topic`: string, `message`: string | Buffer, `opts`: IClientPublishOptions, `callback`: never): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:63

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string |
`message` | string &#124; Buffer |
`opts` | IClientPublishOptions |
`callback` | never |

**Returns:** *this*

▸ **publish**(`topic`: string, `message`: string | Buffer, `callback`: never): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:64

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string |
`message` | string &#124; Buffer |
`callback` | never |

**Returns:** *this*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:22

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  reconnect

▸ **reconnect**(`opts?`: IClientReconnectOptions): *this*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:179

reconnect - connect again using the same options as connect()

**`api`** public

**Parameters:**

Name | Type |
------ | ------ |
`opts?` | IClientReconnectOptions |

**Returns:** *this*

this - for chaining

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:18

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:16

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  removeOutgoingMessage

▸ **removeOutgoingMessage**(`mid`: number): *this*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/node_modules/mqtt/types/lib/client.d.ts:165

removeOutgoingMessage - remove a message in outgoing store
the outgoing callback will be called withe Error('Message removed') if the message is removed

**`api`** public

**`example`** client.removeOutgoingMessage(client.getLastMessageId());

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`mid` | number | messageId to remove message |

**Returns:** *this*

this - for chaining

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:19

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

###  subscribe

▸ **subscribe**(`topic`: string | string[], `opts`: IClientSubscribeOptions): *Promise‹ISubscriptionGrant[]›*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:53

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string &#124; string[] |
`opts` | IClientSubscribeOptions |

**Returns:** *Promise‹ISubscriptionGrant[]›*

▸ **subscribe**(`topic`: string | string[] | ISubscriptionMap): *Promise‹ISubscriptionGrant[]›*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:54

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string &#124; string[] &#124; ISubscriptionMap |

**Returns:** *Promise‹ISubscriptionGrant[]›*

▸ **subscribe**(`topic`: string | string[], `opts`: IClientSubscribeOptions, `callback`: never): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:55

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string &#124; string[] |
`opts` | IClientSubscribeOptions |
`callback` | never |

**Returns:** *this*

▸ **subscribe**(`topic`: string | string[] | ISubscriptionMap, `callback`: never): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:56

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string &#124; string[] &#124; ISubscriptionMap |
`callback` | never |

**Returns:** *this*

___

###  unsubscribe

▸ **unsubscribe**(`topic`: string | string[]): *Promise‹IUnsubackPacket›*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:58

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string &#124; string[] |

**Returns:** *Promise‹IUnsubackPacket›*

▸ **unsubscribe**(`topic`: string | string[], `callback`: never): *this*

*Inherited from void*

*Overrides void*

Defined in /home/circleci/homieiot.ts/node_modules/async-mqtt/index.d.ts:59

**Parameters:**

Name | Type |
------ | ------ |
`topic` | string &#124; string[] |
`callback` | never |

**Returns:** *this*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Inherited from void*

Defined in /home/circleci/homieiot.ts/node_modules/@types/node/events.d.ts:8

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
