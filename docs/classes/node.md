# Class: Node

## Hierarchy

* [Entity](entity.md)‹[NodeProps](../interfaces/nodeprops.md)›

  ↳ **Node**

## Constructors

###  constructor

\+ **new Node**(`props`: [NodeProps](../interfaces/nodeprops.md), `id`: string): *[Node](node.md)*

*Inherited from [Entity](entity.md).[constructor](entity.md#constructor)*

*Defined in [core/domain/Entity.ts:4](https://github.com/AlejandroHerr/homieiot.ts/blob/0651aed/src/core/domain/Entity.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [NodeProps](../interfaces/nodeprops.md) |
`id` | string |

**Returns:** *[Node](node.md)*

## Properties

###  id

• **id**: *string*

*Inherited from [Entity](entity.md).[id](entity.md#id)*

*Defined in [core/domain/Entity.ts:2](https://github.com/AlejandroHerr/homieiot.ts/blob/0651aed/src/core/domain/Entity.ts#L2)*

___

###  props

• **props**: *[NodeProps](../interfaces/nodeprops.md)*

*Inherited from [Entity](entity.md).[props](entity.md#props)*

*Defined in [core/domain/Entity.ts:4](https://github.com/AlejandroHerr/homieiot.ts/blob/0651aed/src/core/domain/Entity.ts#L4)*

## Accessors

###  deviceId

• **get deviceId**(): *string*

*Defined in [homie/domain/Node.ts:28](https://github.com/AlejandroHerr/homieiot.ts/blob/0651aed/src/homie/domain/Node.ts#L28)*

**Returns:** *string*

___

###  name

• **get name**(): *string*

*Defined in [homie/domain/Node.ts:36](https://github.com/AlejandroHerr/homieiot.ts/blob/0651aed/src/homie/domain/Node.ts#L36)*

**Returns:** *string*

___

###  nodeId

• **get nodeId**(): *string*

*Defined in [homie/domain/Node.ts:32](https://github.com/AlejandroHerr/homieiot.ts/blob/0651aed/src/homie/domain/Node.ts#L32)*

**Returns:** *string*

___

###  properties

• **get properties**(): *[Property](property.md)[]*

*Defined in [homie/domain/Node.ts:44](https://github.com/AlejandroHerr/homieiot.ts/blob/0651aed/src/homie/domain/Node.ts#L44)*

**Returns:** *[Property](property.md)[]*

___

###  type

• **get type**(): *string*

*Defined in [homie/domain/Node.ts:40](https://github.com/AlejandroHerr/homieiot.ts/blob/0651aed/src/homie/domain/Node.ts#L40)*

**Returns:** *string*

## Methods

### `Static` create

▸ **create**(`nodeProps`: [RequiredNodeProps](../interfaces/requirednodeprops.md) & Partial‹OptionalNodeProps›): *[Result](result.md)‹[Node](node.md)›*

*Defined in [homie/domain/Node.ts:48](https://github.com/AlejandroHerr/homieiot.ts/blob/0651aed/src/homie/domain/Node.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`nodeProps` | [RequiredNodeProps](../interfaces/requirednodeprops.md) & Partial‹OptionalNodeProps› |

**Returns:** *[Result](result.md)‹[Node](node.md)›*
