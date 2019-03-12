const slash = require('slash')

function textContent (element) {
  return typeof element === 'string'
    ? element
    : element.children.map(textContent).join('')
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
      if (!document.attributes.source) {
        return
      }

      const source = slash(document.attributes.source || '/')

      let index = source.lastIndexOf(basePath)

      if (index === -1) {
        basePath = '/'
        index = source.lastIndexOf(basePath)
      }

      const cropped = index >= 0 ? source.substr(index + basePath.length) : source

      let separator = cropped.lastIndexOf('/')
      const extension = cropped.lastIndexOf('.')

      callback(
        extension >= 0 && extension > separator
          ? cropped.substring(0, extension)
          : cropped
      )
    })
  }
}
