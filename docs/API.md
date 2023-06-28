# @my-scope/my-package-name - v0.9.4

My module description. Please update with your module data.

**`Remarks`**

This module runs perfectly in node.js and browsers

## Table of contents

### Type Aliases

- [Response](API.md#response)

### Functions

- [default](API.md#default)
- [helloWorld](API.md#helloworld)

## Type Aliases

### Response

Ƭ **Response**: `string`

#### Defined in

[hello-world.ts:1](https://github.com/juanelas/node-browser-skel/blob/f75815d/src/ts/hello-world.ts#L1)

## Functions

### default

▸ **default**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[index.ts:12](https://github.com/juanelas/node-browser-skel/blob/f75815d/src/ts/index.ts#L12)

___

### helloWorld

▸ **helloWorld**(`name`): `Promise`<[`Response`](API.md#response)\>

Returns the a Hello to the input string name

**`Remarks`**

An example function that runs different code in Node and Browser javascript

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name to say hello to |

#### Returns

`Promise`<[`Response`](API.md#response)\>

A gratifying Hello to the input name

#### Defined in

[hello-world.ts:12](https://github.com/juanelas/node-browser-skel/blob/f75815d/src/ts/hello-world.ts#L12)
