import pkg from '#pkg'

describe('Testing default export', function () {
  it('should be executed without issues', function () {
    chai.expect(pkg())
  })
})
