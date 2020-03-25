const DocutilsTransformer = require('../lib')

const basicDoc = require('./documents/hello.xml')

describe('parse method', () => {
  let transformer

  beforeEach(() => {
    transformer = new DocutilsTransformer()
  })

  test('return the content as-is', () => {
    const { content } = transformer.parse(basicDoc)
    expect(content).toEqual(basicDoc)
  })

  test('return the title of the document', () => {
    const { title } = transformer.parse(basicDoc)
    expect(title).toEqual('Hello, world!')
  })
})

test('memoized getDocumentData method', () => {
  const noop = jest.fn()

  const transformer = new DocutilsTransformer({
    plugins: [noop]
  })

  transformer.parse(basicDoc)
  transformer.parse(basicDoc + '\n')
  transformer.parse(basicDoc)

  expect(noop.mock.calls.length).toEqual(2)
})
