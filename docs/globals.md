# homieiot.ts

## Variables

### `Const` booleanSchema

• **booleanSchema**: *BooleanSchema* =  Joi.boolean().required()

*Defined in [homie/domain/validation/propertyValueSchema.ts:13](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/propertyValueSchema.ts#L13)*

___

### `Const` colorSchema

• **colorSchema**: *StringSchema* =  Joi.string()
  .regex(/^[0-9]{1,3},[0-9]{1,3},[0-9]{1,3}$/)
  .required()

*Defined in [homie/domain/validation/propertyValueSchema.ts:7](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/propertyValueSchema.ts#L7)*

___

### `Const` floatSchema

• **floatSchema**: *NumberSchema* =  Joi.number().required()

*Defined in [homie/domain/validation/propertyValueSchema.ts:5](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/propertyValueSchema.ts#L5)*

___

### `Const` integerSchema

• **integerSchema**: *NumberSchema* =  floatSchema.integer()

*Defined in [homie/domain/validation/propertyValueSchema.ts:6](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/propertyValueSchema.ts#L6)*

___

### `Const` stringSchema

• **stringSchema**: *StringSchema* =  Joi.string()
  .allow('')
  .required()

*Defined in [homie/domain/validation/propertyValueSchema.ts:10](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/propertyValueSchema.ts#L10)*

## Functions

### `Const` addNodeUseCase

▸ **addNodeUseCase**(`__namedParameters`: object): *Promise‹[Result](classes/result.md)‹void››*

*Defined in [homie/useCases/addNodeUseCase.ts:14](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/useCases/addNodeUseCase.ts#L14)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`device` | [Device](classes/device.md) |
`homiePublisher` | [HomiePublisher](classes/homiepublisher.md) |
`nodeProps` | [NodePropsDTO](interfaces/nodepropsdto.md) |

**Returns:** *Promise‹[Result](classes/result.md)‹void››*

___

### `Const` asyncConnect

▸ **asyncConnect**(`options`: Partial‹[MqttClientOptions](interfaces/mqttclientoptions.md)›): *Promise‹[MqttClient](interfaces/mqttclient.md)›*

*Defined in [core/infrastructure/asyncConnect.ts:7](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/core/infrastructure/asyncConnect.ts#L7)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`options` | Partial‹[MqttClientOptions](interfaces/mqttclientoptions.md)› |  {} |

**Returns:** *Promise‹[MqttClient](interfaces/mqttclient.md)›*

___

### `Const` disconnectDeviceUseCase

▸ **disconnectDeviceUseCase**(`__namedParameters`: object): *Promise‹[Result](classes/result.md)‹void››*

*Defined in [homie/useCases/disconnectDeviceUseCase.ts:11](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/useCases/disconnectDeviceUseCase.ts#L11)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`device` | [Device](classes/device.md) |
`homiePublisher` | [HomiePublisher](classes/homiepublisher.md) |

**Returns:** *Promise‹[Result](classes/result.md)‹void››*

___

### `Const` generateUUID

▸ **generateUUID**(`__namedParameters`: object): *string*

*Defined in [homie/domain/generateUUID.ts:1](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/generateUUID.ts#L1)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`deviceId` | string |
`nodeId` | undefined &#124; string |
`propertyId` | undefined &#124; string |

**Returns:** *string*

___

### `Const` getSchemaForDatatype

▸ **getSchemaForDatatype**(`datatype`: [Datatype](classes/datatype.md)): *Joi.Schema*

*Defined in [homie/domain/validation/propertyValueSchema.ts:15](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/propertyValueSchema.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`datatype` | [Datatype](classes/datatype.md) |

**Returns:** *Joi.Schema*

___

### `Const` nodesToMqtt

▸ **nodesToMqtt**(`device`: [Device](classes/device.md)): *[MqttMessage](interfaces/mqttmessage.md)*

*Defined in [homie/mappers/deviceMapper.ts:42](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/mappers/deviceMapper.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](classes/device.md) |

**Returns:** *[MqttMessage](interfaces/mqttmessage.md)*

___

### `Const` publishDeviceUseCase

▸ **publishDeviceUseCase**(`__namedParameters`: object): *Promise‹[Result](classes/result.md)‹[Device](classes/device.md)››*

*Defined in [homie/useCases/publishDeviceUseCase.ts:11](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/useCases/publishDeviceUseCase.ts#L11)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`deviceProps` | [DevicePropsDTO](interfaces/devicepropsdto.md) |
`homiePublisher` | [HomiePublisher](classes/homiepublisher.md) |

**Returns:** *Promise‹[Result](classes/result.md)‹[Device](classes/device.md)››*

___

### `Const` setDeviceStateUseCase

▸ **setDeviceStateUseCase**(`__namedParameters`: object): *Promise‹[Result](classes/result.md)‹void››*

*Defined in [homie/useCases/setDeviceStateUseCase.ts:12](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/useCases/setDeviceStateUseCase.ts#L12)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`device` | [Device](classes/device.md) |
`homiePublisher` | [HomiePublisher](classes/homiepublisher.md) |
`state` | "init" &#124; "ready" &#124; "disconnected" &#124; "sleeping" &#124; "lost" &#124; "alert" |

**Returns:** *Promise‹[Result](classes/result.md)‹void››*

___

### `Const` stateToMqtt

▸ **stateToMqtt**(`device`: [Device](classes/device.md)): *[MqttMessage](interfaces/mqttmessage.md)*

*Defined in [homie/mappers/deviceMapper.ts:33](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/mappers/deviceMapper.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](classes/device.md) |

**Returns:** *[MqttMessage](interfaces/mqttmessage.md)*

___

### `Const` toMqtt

▸ **toMqtt**(`device`: [Device](classes/device.md)): *[MqttMessage](interfaces/mqttmessage.md)[]*

*Defined in [homie/mappers/deviceMapper.ts:6](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/mappers/deviceMapper.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`device` | [Device](classes/device.md) |

**Returns:** *[MqttMessage](interfaces/mqttmessage.md)[]*

▸ **toMqtt**(`node`: [Node](classes/node.md)): *[MqttMessage](interfaces/mqttmessage.md)[]*

*Defined in [homie/mappers/nodeMapper.ts:6](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/mappers/nodeMapper.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [Node](classes/node.md) |

**Returns:** *[MqttMessage](interfaces/mqttmessage.md)[]*

## Object literals

### `Const` booleanOrStringFormatSchema

### ▪ **booleanOrStringFormatSchema**: *object*

*Defined in [homie/domain/validation/datatypeSchema.ts:22](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/datatypeSchema.ts#L22)*

###  is

• **is**: *AnySchema | ArraySchema | AlternativesSchema | BinarySchema | BooleanSchema | DateSchema | FunctionSchema | NumberSchema | ObjectSchema | StringSchema | LazySchema* =  Joi.valid('boolean', 'string')

*Defined in [homie/domain/validation/datatypeSchema.ts:23](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/datatypeSchema.ts#L23)*

###  then

• **then**: *AnySchema* =  Joi.any().forbidden()

*Defined in [homie/domain/validation/datatypeSchema.ts:24](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/datatypeSchema.ts#L24)*

___

### `Const` colorFormatSchema

### ▪ **colorFormatSchema**: *object*

*Defined in [homie/domain/validation/datatypeSchema.ts:10](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/datatypeSchema.ts#L10)*

###  is

• **is**: *AnySchema | ArraySchema | AlternativesSchema | BinarySchema | BooleanSchema | DateSchema | FunctionSchema | NumberSchema | ObjectSchema | StringSchema | LazySchema* =  Joi.valid('color')

*Defined in [homie/domain/validation/datatypeSchema.ts:11](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/datatypeSchema.ts#L11)*

###  then

• **then**: *StringSchema* =  Joi.string().valid('rgb', 'hsv')

*Defined in [homie/domain/validation/datatypeSchema.ts:12](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/datatypeSchema.ts#L12)*

___

### `Const` defaultProps

### ▪ **defaultProps**: *object*

*Defined in [homie/domain/Property.ts:26](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Property.ts#L26)*

*Defined in [homie/domain/Node.ts:21](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Node.ts#L21)*

*Defined in [homie/domain/Device.ts:24](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Device.ts#L24)*

###  extensions

• **extensions**: *string* = ""

*Defined in [homie/domain/Device.ts:29](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Device.ts#L29)*

###  homie

• **homie**: *string* = "4.0.0"

*Defined in [homie/domain/Device.ts:25](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Device.ts#L25)*

###  name

• **name**: *string* = ""

*Defined in [homie/domain/Property.ts:27](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Property.ts#L27)*

*Defined in [homie/domain/Node.ts:22](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Node.ts#L22)*

*Defined in [homie/domain/Device.ts:26](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Device.ts#L26)*

###  nodes

• **nodes**: *never[]* =  []

*Defined in [homie/domain/Device.ts:28](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Device.ts#L28)*

###  properties

• **properties**: *never[]* =  []

*Defined in [homie/domain/Node.ts:24](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Node.ts#L24)*

###  retained

• **retained**: *true* = true

*Defined in [homie/domain/Property.ts:29](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Property.ts#L29)*

###  settable

• **settable**: *false* = false

*Defined in [homie/domain/Property.ts:28](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Property.ts#L28)*

###  state

• **state**: *"ready"* = "ready"

*Defined in [homie/domain/Device.ts:27](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Device.ts#L27)*

###  type

• **type**: *string* = ""

*Defined in [homie/domain/Node.ts:23](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Node.ts#L23)*

###  value

• **value**: *string* = ""

*Defined in [homie/domain/Property.ts:30](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/Property.ts#L30)*

___

### `Const` enumFormatSchema

### ▪ **enumFormatSchema**: *object*

*Defined in [homie/domain/validation/datatypeSchema.ts:15](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/datatypeSchema.ts#L15)*

###  is

• **is**: *AnySchema | ArraySchema | AlternativesSchema | BinarySchema | BooleanSchema | DateSchema | FunctionSchema | NumberSchema | ObjectSchema | StringSchema | LazySchema* =  Joi.valid('enum')

*Defined in [homie/domain/validation/datatypeSchema.ts:16](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/datatypeSchema.ts#L16)*

###  then

• **then**: *ArraySchema* =  Joi.array()
    .items(Joi.string().required())
    .required()

*Defined in [homie/domain/validation/datatypeSchema.ts:17](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/datatypeSchema.ts#L17)*

___

### `Const` integerOrFloatFormatSchema

### ▪ **integerOrFloatFormatSchema**: *object*

*Defined in [homie/domain/validation/datatypeSchema.ts:3](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/datatypeSchema.ts#L3)*

###  is

• **is**: *AnySchema | ArraySchema | AlternativesSchema | BinarySchema | BooleanSchema | DateSchema | FunctionSchema | NumberSchema | ObjectSchema | StringSchema | LazySchema* =  Joi.valid('integer', 'float')

*Defined in [homie/domain/validation/datatypeSchema.ts:4](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/datatypeSchema.ts#L4)*

###  then

• **then**: *ArraySchema* =  Joi.array()
    .items(Joi.number().required())
    .length(2)

*Defined in [homie/domain/validation/datatypeSchema.ts:5](https://github.com/AlejandroHerr/homieiot.ts/blob/cd91a62/src/homie/domain/validation/datatypeSchema.ts#L5)*
