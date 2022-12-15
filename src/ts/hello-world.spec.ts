import { helloWorld } from '#pkg'

describe('testing function helloWorld() with .spec.ts file', function () {
  const inputs = ['Alice', 'Bob']
  for (const input of inputs) {
    describe(`helloWorld(${input})`, function () {
      it(`should return "Hello ${input}!"`, async function () {
        const ret = await helloWorld(input)
        chai.expect(ret).to.equal(`Hello ${input}!`)
      })
    })
  }
})
