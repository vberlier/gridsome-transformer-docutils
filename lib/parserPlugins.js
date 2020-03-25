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
