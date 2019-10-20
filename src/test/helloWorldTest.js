const chai = require('chai')
const helloWorldService = require('../service/helloWorldService')

const expect = chai.expect

describe('Teste de serviço de helloWorld', () => {
  it('Validar retorno de helloWorld', () => {
    expect(helloWorldService.show).to.have.lengthOf.above(0)
  })
})
