const docutils = require('docutils-parser')

const {
  extractDocumentTitle
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
