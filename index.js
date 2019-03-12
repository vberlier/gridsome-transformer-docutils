const path = require('path')
const docutils = require('docutils-parser')
const defaultsDeep = require('lodash/defaultsDeep')
const LRU = require('lru-cache')
const memoize = require('fast-memoize')

class DocutilsTransformer {
  static mimeTypes () {
    return ['application/xml']
  }

  constructor (options, { context, localOptions }) {
    const { basePath } = defaultsDeep(localOptions, options, {
      basePath: context
    })

    this.basePath = path.normalize(basePath)
    this.plugins = (options.plugins || []).concat(localOptions.plugins || [])

    this.getDocumentData = memoize(this.process.bind(this), {
      cache: {
        create: () => new LRU({ max: 1000 })
      }
    })
  }

  parse (content) {
    return {
      content
    }
  }

  extendNodeType ({ graphql: { GraphQLJSON } }) {
    return {
      document: {
        type: GraphQLJSON,
        resolve: node => this.getDocumentData(node.content).document
      }
    }
  }

  process (content) {
    const document = docutils.parse(content, [
      ...this.plugins
    ])

    return {
      document
    }
  }
}

module.exports = DocutilsTransformer
