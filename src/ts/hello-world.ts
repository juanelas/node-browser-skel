export type Response = string

/**
 * Returns the a Hello to the input string name
 *
 * @remarks An example function that runs different code in Node and Browser javascript
 *
 * @param name - The name to say hello to
 *
 * @returns A gratifying Hello to the input name
 */
export function helloWorld (name: string): Response {
  const text = `Hello ${name}!`
  if (text === `Hello ${name}!`) {
    if (IS_BROWSER) {
      console.log(`Browser says "${text}"`)
    } else {
      console.log(`Node.js says "${text}"`)
    }
  } else {
    console.log('This is not going to be printed') // This line should be reported as not tested when running the coverage
  }
  return text
}
