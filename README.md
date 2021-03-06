# gridsome-transformer-docutils

[![Build Status](https://travis-ci.com/vberlier/gridsome-transformer-docutils.svg?branch=master)](https://travis-ci.com/vberlier/gridsome-transformer-docutils)
[![npm](https://img.shields.io/npm/v/gridsome-transformer-docutils.svg)](https://www.npmjs.com/package/gridsome-transformer-docutils)

> Docutils transformer for Gridsome.

This transformer parses [docutils xml documents](http://docutils.sourceforge.net/docs/ref/doctree.html) with the [docutils](https://github.com/vberlier/docutils) package. You can use it to load documentation generated by tools like [sphinx](http://www.sphinx-doc.org) in Gridsome collections.

## Installation

You can install `gridsome-transformer-docutils` with your `npm` client of choice.

```bash
$ npm install --save-dev gridsome-transformer-docutils
```

## Usage

After installing the package as a development dependency, you can configure [@gridsome/source-filesystem](https://github.com/gridsome/gridsome/tree/master/packages/source-filesystem) to load the generated xml files.

```js
// gridsome.config.js

module.exports = {
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'SphinxDocument',
        baseDir: 'sphinx/dist',
        path: '**/*.xml',
        docutils: {
          // Options
        }
      }
    }
  ],
  templates: {
    SphinxDocument: node => node.path
  },
  transformers: {
    docutils: {
      // Global options
    }
  }
}
```

### Options

You can configure the transformer globally or for specific filesystem sources.

- `plugins`

  Defaults to `[]`. An array of plugins passed to the [docutils](https://github.com/vberlier/docutils) parser.

### Fields

In addition to the fields provided by the `source-filesystem` plugin, the transformer generates a JSON field containing the parsed document.

- `root`

  The document parsed as a hierarchy of plain JavaScript objects. Check out the [docutils](https://github.com/vberlier/docutils) documentation for more details.

## Contributing

Contributions are welcome. This project uses [jest](https://jestjs.io/) for testing.

```bash
$ npm test
```

The code follows the [javascript standard](https://standardjs.com/) style guide.

```bash
$ npm run lint
```

---

License - [MIT](https://github.com/vberlier/gridsome-transformer-docutils/blob/master/LICENSE)
