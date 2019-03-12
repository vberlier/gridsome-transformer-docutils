const path = require('path')
const docutils = require('docutils-parser')
const defaultsDeep = require('lodash/defaultsDeep')
const LRU = require('lru-cache')
const hash = require('hash-sum')

const cache = new LRU({ max: 1000 })

function cached (func) {
  return (...args) => {
    const key = hash({ func, args })
    let result = cache.get(key)

    if (!result) {
      result = func(...args)
      cache.set(key, result)
    }

    return result
  }
}

class DocutilsTransformer {
  static mimeTypes () {
    return ['application/xml']
  }

  constructor (options, { context, localOptions }) {
    const { basePath } = defaultsDeep(localOptions, options, {
      basePath: context
    })

    this.basePath = path.normalize(basePath)

    this.parseDocument = cached(docutils.parse)
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
        resolve: node => this.parseDocument(node.content)
      }
    }
  }
}

module.exports = DocutilsTransformer
