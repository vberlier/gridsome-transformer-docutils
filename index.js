class DocutilsTransformer {
  static mimeTypes () {
    return ['application/xml']
  }

  parse (content) {
    return {
      content
    }
  }

  extendNodeType () {
    return {}
  }
}

module.exports = DocutilsTransformer
