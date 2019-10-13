# Class: Property

## Hierarchy

* [Entity](entity.md)‹[PropertyProps](../interfaces/propertyprops.md)›

  ↳ **Property**

## Constructors

###  constructor

\+ **new Property**(`props`: [PropertyProps](../interfaces/propertyprops.md), `id`: string): *[Property](property.md)*

*Inherited from [Entity](entity.md).[constructor](entity.md#constructor)*

*Defined in [core/domain/Entity.ts:4](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/core/domain/Entity.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [PropertyProps](../interfaces/propertyprops.md) |
`id` | string |

**Returns:** *[Property](property.md)*

## Properties

###  id

• **id**: *string*

*Inherited from [Entity](entity.md).[id](entity.md#id)*

*Defined in [core/domain/Entity.ts:2](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/core/domain/Entity.ts#L2)*

___

###  props

• **props**: *[PropertyProps](../interfaces/propertyprops.md)*

*Inherited from [Entity](entity.md).[props](entity.md#props)*

*Defined in [core/domain/Entity.ts:4](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/core/domain/Entity.ts#L4)*

## Accessors

###  datatype

• **get datatype**(): *[Datatype](datatype.md)*

*Defined in [homie/domain/Property.ts:50](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/homie/domain/Property.ts#L50)*

**Returns:** *[Datatype](datatype.md)*

___

###  deviceId

• **get deviceId**(): *string*

*Defined in [homie/domain/Property.ts:34](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/homie/domain/Property.ts#L34)*

**Returns:** *string*

___

###  name

• **get name**(): *string*

*Defined in [homie/domain/Property.ts:46](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/homie/domain/Property.ts#L46)*

**Returns:** *string*

___

###  nodeId

• **get nodeId**(): *string*

*Defined in [homie/domain/Property.ts:38](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/homie/domain/Property.ts#L38)*

**Returns:** *string*

___

###  propertyId

• **get propertyId**(): *string*

*Defined in [homie/domain/Property.ts:42](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/homie/domain/Property.ts#L42)*

**Returns:** *string*

___

###  retained

• **get retained**(): *boolean*

*Defined in [homie/domain/Property.ts:58](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/homie/domain/Property.ts#L58)*

**Returns:** *boolean*

___

###  settable

• **get settable**(): *boolean*

*Defined in [homie/domain/Property.ts:54](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/homie/domain/Property.ts#L54)*

**Returns:** *boolean*

___

###  unit

• **get unit**(): *undefined | string*

*Defined in [homie/domain/Property.ts:62](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/homie/domain/Property.ts#L62)*

**Returns:** *undefined | string*

___

###  value

• **get value**(): *string | number | false | true*

*Defined in [homie/domain/Property.ts:66](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/homie/domain/Property.ts#L66)*

**Returns:** *string | number | false | true*

## Methods

###  setValue

▸ **setValue**(`value`: string | number | false | true): *[Result](result.md)‹void›*

*Defined in [homie/domain/Property.ts:70](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/homie/domain/Property.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`value` | string &#124; number &#124; false &#124; true |

**Returns:** *[Result](result.md)‹void›*

___

### `Static` create

▸ **create**(`propertyProps`: [RequiredPropertyProps](../interfaces/requiredpropertyprops.md) & Partial‹[OptionalNodeProps](../interfaces/optionalnodeprops.md)›): *[Result](result.md)‹[Property](property.md)›*

*Defined in [homie/domain/Property.ts:82](https://github.com/AlejandroHerr/homieiot.ts/blob/dacf39e/src/homie/domain/Property.ts#L82)*

**Parameters:**

Name | Type |
------ | ------ |
`propertyProps` | [RequiredPropertyProps](../interfaces/requiredpropertyprops.md) & Partial‹[OptionalNodeProps](../interfaces/optionalnodeprops.md)› |

**Returns:** *[Result](result.md)‹[Property](property.md)›*
