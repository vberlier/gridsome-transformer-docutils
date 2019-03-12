const DocutilsTransformer = require('../lib')

const basicDoc = require('./documents/hello.xml')

describe('parse method', () => {
  let transformer

  beforeEach(() => {
    transformer = new DocutilsTransformer(
      {
        basePath: 'documents/'
      },
      {
        context: __dirname,
        localOptions: {}
      }
    )
  })

  test('returns the content as-is', () => {
    const { content } = transformer.parse(basicDoc)
    expect(content).toEqual(basicDoc)
  })
})
