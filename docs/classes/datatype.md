# Class: Datatype

## Hierarchy

* [ValueObject](valueobject.md)‹[DatatypeProps](../interfaces/datatypeprops.md)›

  ↳ **Datatype**

## Constructors

###  constructor

\+ **new Datatype**(`props`: [DatatypeProps](../interfaces/datatypeprops.md)): *[Datatype](datatype.md)*

*Inherited from [ValueObject](valueobject.md).[constructor](valueobject.md#constructor)*

*Defined in [core/domain/ValueObject.ts:7](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/domain/ValueObject.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [DatatypeProps](../interfaces/datatypeprops.md) |

**Returns:** *[Datatype](datatype.md)*

## Properties

###  props

• **props**: *[DatatypeProps](../interfaces/datatypeprops.md)*

*Inherited from [ValueObject](valueobject.md).[props](valueobject.md#props)*

*Defined in [core/domain/ValueObject.ts:7](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/domain/ValueObject.ts#L7)*

## Accessors

###  datatype

• **get datatype**(): *"string" | "boolean" | "integer" | "float" | "color" | "enum"*

*Defined in [homie/domain/Datatype.ts:11](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/homie/domain/Datatype.ts#L11)*

**Returns:** *"string" | "boolean" | "integer" | "float" | "color" | "enum"*

___

###  format

• **get format**(): *undefined | string | string[] | number[]*

*Defined in [homie/domain/Datatype.ts:15](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/homie/domain/Datatype.ts#L15)*

**Returns:** *undefined | string | string[] | number[]*

## Methods

### `Static` create

▸ **create**(`props`: [DatatypeProps](../interfaces/datatypeprops.md)): *[Result](result.md)‹[Datatype](datatype.md)›*

*Defined in [homie/domain/Datatype.ts:19](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/homie/domain/Datatype.ts#L19)*

**Parameters:**

Name | Type |
------ | ------ |
`props` | [DatatypeProps](../interfaces/datatypeprops.md) |

**Returns:** *[Result](result.md)‹[Datatype](datatype.md)›*
