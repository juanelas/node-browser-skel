type Response = string;
/**
 * Returns the a Hello to the input string name
 *
 * @remarks An example function that runs different code in Node and Browser javascript
 *
 * @param name - The name to say hello to
 *
 * @returns A gratifying Hello to the input name
 */
declare function helloWorld(name: string): Promise<Response>;

/**
 * My module description. Please update with your module data.
 *
 * @remarks
 * This module runs perfectly in node.js and browsers
 *
 * @packageDocumentation
 */

declare function sayHello(): Promise<void>;

export { Response, sayHello as default, helloWorld };
