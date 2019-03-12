const path = require('path')

const docutils = require('docutils-parser')
const defaultsDeep = require('lodash/defaultsDeep')

class DocutilsTransformer {
  static mimeTypes () {
    return ['application/xml']
  }

  constructor (options, { context, localOptions }) {
    const { basePath } = defaultsDeep(localOptions, options, {
      basePath: context
    })

    this.basePath = path.normalize(basePath)
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
        resolve: node => docutils.parse(node.content)
      }
    }
  }
}

module.exports = DocutilsTransformer
