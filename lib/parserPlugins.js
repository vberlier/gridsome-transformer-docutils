const slash = require('slash')

function textContent (element) {
  return typeof element === 'string'
    ? element
    : element.children.map(textContent).join(' ')
}

module.exports.extractDocumentTitle = callback => {
  return parser => {
    parser.once('element:title', element => {
      callback(textContent(element))
    })
  }
}

module.exports.extractSourcePath = (basePath, callback) => {
  return parser => {
    parser.once('document:end', document => {
      if (document.attributes.name) {
        callback(document.attributes.name)
        return
      }

      if (!document.attributes.source) {
        return
      }

      const source = slash(document.attributes.source || '/')

      let index = source.lastIndexOf(slash(basePath))

      if (index === -1) {
        basePath = '/'
        index = source.lastIndexOf(basePath)
      }

      const croppedPath =
        index >= 0 ? source.substr(index + basePath.length) : source

      const sourcePath = croppedPath.split('/')
      const last = sourcePath.length - 1

      sourcePath[last] = sourcePath[last].replace(/\.[^.]+$/, '')

      if (sourcePath[last] === 'index') {
        sourcePath.pop()
      }

      callback(sourcePath)
    })
  }
}
