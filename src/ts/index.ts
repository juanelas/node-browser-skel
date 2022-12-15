/**
 * My module description. Please update with your module data.
 *
 * @remarks
 * This module runs perfectly in node.js and browsers
 *
 * @packageDocumentation
 */

export { helloWorld, Response } from './hello-world'
export default async function sayHello (): Promise<void> {
  const helloWorld = (await import('./hello-world')).helloWorld
  await helloWorld('hello')
}
