const docutils = require('docutils-parser')

const {
  extractDocumentTitle,
  extractSourcePath
} = require('../lib/parserPlugins')

const basicDoc = require('./documents/hello.xml')
const indexDoc = require('./documents/index.xml')
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
    let sourcePath = []

    docutils.parse(basicDoc, [
      extractSourcePath('/', path => {
        sourcePath = path
      })
    ])

    expect(sourcePath).toEqual(['hello'])
  })

  test('custom basePath', () => {
    let sourcePath = []

    docutils.parse(basicDoc, [
      extractSourcePath('example-project/', path => {
        sourcePath = path
      })
    ])

    expect(sourcePath).toEqual(['docs', 'hello'])
  })

  test('index page', () => {
    let sourcePath = []

    docutils.parse(indexDoc, [
      extractSourcePath('example-project/', path => {
        sourcePath = path
      })
    ])

    expect(sourcePath).toEqual(['docs'])
  })
})
