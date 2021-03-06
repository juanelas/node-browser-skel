/**
 * Returns the input string
 *
 * @param {string} a
 *
 * @returns {string} a gratifying echo response from either node or browser
 */
export function echo (a) {
  /* Every if else block with isBrowser (different code for node and browser) should disable eslint rule no-lone-blocks
  */
  /* eslint-disable no-lone-blocks */
  if (IS_BROWSER) {
    console.log('Browser echoes: ' + a)
  } else {
    console.log('Node.js echoes: ' + a)
  }
  /* eslint-enable no-lone-blocks */
  return a
}
