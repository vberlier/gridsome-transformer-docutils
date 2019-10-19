const docutils = require('docutils-parser')

const {
  extractDocumentTitle,
  extractSourcePath
} = require('../lib/parserPlugins')

const basicDoc = require('./documents/hello.xml')
const testDoc = require('./documents/test.xml')

describe('document title', () => {
  test('simple', () => {
    let title = ''

    docutils.parse(basicDoc, [
      extractDocumentTitle(docutmentTitle => {
        title = docutmentTitle
      })
    ])

    expect(title).toEqual('Hello, world!')
  })

  test('literal element', () => {
    let title = ''

    docutils.parse(testDoc, [
      extractDocumentTitle(documentTitle => {
        title = documentTitle
      })
    ])

    expect(title).toEqual('This is a test')
  })
})
describe('source path', () => {
  test('default basePath', () => {
    let source = ''

    docutils.parse(basicDoc, [
      extractSourcePath('/', sourcePath => {
        source = sourcePath
      })
    ])

    expect(source).toEqual('hello')
  })

  test('custom basePath', () => {
    let source = ''

    docutils.parse(basicDoc, [
      extractSourcePath('example-project/', sourcePath => {
        source = sourcePath
      })
    ])

    expect(source).toEqual('docs/hello')
  })
})
