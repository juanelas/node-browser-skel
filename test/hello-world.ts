describe('testing function helloWorld() with ts file in the test directory', function () {
  const inputs = ['Alice', 'Bob']
  for (const input of inputs) {
    describe(`helloWorld(${input})`, function () {
      it(`should return "Hello ${input}!"`, function () {
        const ret = _pkg.helloWorld(input)
        chai.expect(ret).to.equal(`Hello ${input}!`)
      })
    })
  }
})
