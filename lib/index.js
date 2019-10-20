const docutils = require('docutils-parser')
const LRU = require('lru-cache')
const memoize = require('fast-memoize')
const slash = require('slash')

const { extractDocumentTitle, extractSourcePath } = require('./parserPlugins')

class DocutilsTransformer {
  static mimeTypes () {
    return ['application/xml']
  }

  constructor (options = {}, { localOptions = {} } = {}) {
    const { basePath } = Object.assign({}, options, localOptions)

    this.basePath = slash(basePath || '/')
    this.plugins = (options.plugins || []).concat(localOptions.plugins || [])

    this.getDocumentData = memoize(this.process.bind(this), {
      cache: {
        create: () => new LRU({ max: 1000 })
      }
    })
  }

  parse (content) {
    const { title, sourcePath } = this.getDocumentData(content)

    return {
      title,
      content,
      sourcePath
    }
  }

  extendNodeType ({ graphql: { GraphQLJSON } }) {
    return {
      root: {
        type: GraphQLJSON,
        resolve: node => this.getDocumentData(node.content).document
      }
    }
  }

  process (content) {
    let title = ''
    let sourcePath = []

    const document = docutils.parse(content, [
      extractDocumentTitle(documentTitle => {
        title = documentTitle
      }),
      extractSourcePath(this.basePath, path => {
        sourcePath = path
      }),
      ...this.plugins
    ])

    return {
      title,
      sourcePath,
      document
    }
  }
}

module.exports = DocutilsTransformer
