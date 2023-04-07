/**
 * My module description. Please update with your module data.
 *
 * @remarks
 * This module runs perfectly in node.js and browsers
 *
 * @packageDocumentation
 */

// If you want your module to be compatible with node16 or nodenext module resolution, add always the extension to imported files.
export { helloWorld, Response } from './hello-world.js'
export default async function sayHello (): Promise<void> {
  const helloWorld = (await import('./hello-world.js')).helloWorld
  await helloWorld('hello')
}
