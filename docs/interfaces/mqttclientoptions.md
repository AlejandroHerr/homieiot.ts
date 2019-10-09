# Interface: MqttClientOptions

## Hierarchy

* IClientOptions

  ↳ **MqttClientOptions**

## Properties

### `Optional` ca

• **ca**? : *string | string[] | Buffer | Buffer[]*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:130

Optionally override the trusted CA certificates in PEM format

___

### `Optional` cert

• **cert**? : *string | string[] | Buffer | Buffer[]*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:126

optional cert chains in PEM format

___

### `Optional` clean

• **clean**? : *undefined | false | true*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:36

true, set to false to receive QoS 1 and 2 messages while offline

___

### `Optional` clientId

• **clientId**? : *undefined | string*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:24

'mqttjs_' + Math.random().toString(16).substr(2, 8)

___

### `Optional` connectTimeout

• **connectTimeout**? : *undefined | number*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:44

30 * 1000 milliseconds, time to wait before a CONNACK is received

___

### `Optional` host

• **host**? : *undefined | string*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:9

___

### `Optional` hostname

• **hostname**? : *undefined | string*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:10

___

### `Optional` incomingStore

• **incomingStore**? : *Store*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:56

a Store for the incoming packets

___

### `Optional` keepalive

• **keepalive**? : *undefined | number*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:20

 10 seconds, set to 0 to disable

___

### `Optional` key

• **key**? : *string | string[] | Buffer | Buffer[] | Object[]*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:122

optional private keys in PEM format

___

### `Optional` outgoingStore

• **outgoingStore**? : *Store*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:60

a Store for the outgoing packets

___

### `Optional` password

• **password**? : *undefined | string*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:52

the password required by your broker, if any

___

### `Optional` path

• **path**? : *undefined | string*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:11

___

### `Optional` port

• **port**? : *undefined | number*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:8

___

### `Optional` properties

• **properties**? : *undefined | object*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:106

___

### `Optional` protocol

• **protocol**? : *"wss" | "ws" | "mqtt" | "mqtts" | "tcp" | "ssl" | "wx" | "wxs"*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:12

___

### `Optional` protocolId

• **protocolId**? : *undefined | string*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:28

'MQTT'

___

### `Optional` protocolVersion

• **protocolVersion**? : *undefined | number*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:32

4

___

### `Optional` queueQoSZero

• **queueQoSZero**? : *undefined | false | true*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:61

___

### `Optional` reconnectPeriod

• **reconnectPeriod**? : *undefined | number*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:40

1000 milliseconds, interval between two reconnections

___

### `Optional` rejectUnauthorized

• **rejectUnauthorized**? : *undefined | false | true*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:131

___

### `Optional` reschedulePings

• **reschedulePings**? : *undefined | false | true*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:62

___

### `Optional` resubscribe

• **resubscribe**? : *undefined | false | true*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:71

true, set to false to disable re-subscribe functionality

___

### `Optional` servers

• **servers**? : *Array‹object›*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:63

___

### `Optional` transformWsUrl

• **transformWsUrl**? : *undefined | function*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:105

___

### `Optional` username

• **username**? : *undefined | string*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:48

the username required by your broker, if any

___

### `Optional` will

• **will**? : *undefined | object*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:75

a message that will sent by the broker automatically when the client disconnect badly.

___

### `Optional` wsOptions

• **wsOptions**? : *undefined | object*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/mqtt/types/lib/client-options.d.ts:14
