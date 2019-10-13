# Class: Result <**T**>

## Type parameters

▪ **T**

## Hierarchy

* **Result**

## Constructors

###  constructor

\+ **new Result**(`__namedParameters`: object): *[Result](result.md)*

*Defined in [core/logic/Result.ts:12](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/logic/Result.ts#L12)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`error` | undefined &#124; string &#124; Error |
`value` | undefined &#124; T |

**Returns:** *[Result](result.md)*

## Properties

### `Optional` error

• **error**? : *string | Error*

*Defined in [core/logic/Result.ts:10](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/logic/Result.ts#L10)*

___

### `Optional` value

• **value**? : *[T](undefined)*

*Defined in [core/logic/Result.ts:12](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/logic/Result.ts#L12)*

## Methods

###  failed

▸ **failed**(): *boolean*

*Defined in [core/logic/Result.ts:19](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/logic/Result.ts#L19)*

**Returns:** *boolean*

___

###  succeded

▸ **succeded**(): *boolean*

*Defined in [core/logic/Result.ts:23](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/logic/Result.ts#L23)*

**Returns:** *boolean*

___

### `Static` combine

▸ **combine**(`results`: [Result](result.md)‹any›[]): *[Result](result.md)‹void›*

*Defined in [core/logic/Result.ts:36](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/logic/Result.ts#L36)*

**Parameters:**

Name | Type |
------ | ------ |
`results` | [Result](result.md)‹any›[] |

**Returns:** *[Result](result.md)‹void›*

___

### `Static` fail

▸ **fail**<**S**>(`error`: string | Error): *[Result](result.md)‹S›*

*Defined in [core/logic/Result.ts:31](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/logic/Result.ts#L31)*

**Type parameters:**

▪ **S**

**Parameters:**

Name | Type |
------ | ------ |
`error` | string &#124; Error |

**Returns:** *[Result](result.md)‹S›*

___

### `Static` ok

▸ **ok**<**S**>(`value?`: [S](undefined)): *[Result](result.md)‹S›*

*Defined in [core/logic/Result.ts:27](https://github.com/AlejandroHerr/homieiot.ts/blob/e44ddfb/src/core/logic/Result.ts#L27)*

**Type parameters:**

▪ **S**

**Parameters:**

Name | Type |
------ | ------ |
`value?` | [S](undefined) |

**Returns:** *[Result](result.md)‹S›*
