# Class: ApplicationError

## Hierarchy

* Error

  ↳ **ApplicationError**

## Constructors

###  constructor

\+ **new ApplicationError**(`message`: string, `cause?`: [Error](applicationerror.md#static-error)): *[ApplicationError](applicationerror.md)*

*Defined in [core/application/ApplicationError.ts:2](https://github.com/AlejandroHerr/homieiot.ts/blob/a180e8f/src/core/application/ApplicationError.ts#L2)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
`cause?` | [Error](applicationerror.md#static-error) |

**Returns:** *[ApplicationError](applicationerror.md)*

## Properties

### `Optional` cause

• **cause**? : *[Error](applicationerror.md#static-error)*

*Defined in [core/application/ApplicationError.ts:2](https://github.com/AlejandroHerr/homieiot.ts/blob/a180e8f/src/core/application/ApplicationError.ts#L2)*

___

###  message

• **message**: *string*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from void*

Defined in /Users/alejandro/projects/homie/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from void*

*Overrides void*

Defined in /Users/alejandro/projects/homie/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in /Users/alejandro/projects/homie/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:984

## Methods

### `Static` create

▸ **create**(`error`: string | Error): *[ApplicationError](applicationerror.md)*

*Defined in [core/application/ApplicationError.ts:10](https://github.com/AlejandroHerr/homieiot.ts/blob/a180e8f/src/core/application/ApplicationError.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`error` | string &#124; Error |

**Returns:** *[ApplicationError](applicationerror.md)*
