# gridsome-transformer-docutils

[![Build Status](https://travis-ci.com/vberlier/gridsome-transformer-docutils.svg?branch=master)](https://travis-ci.com/vberlier/gridsome-transformer-docutils)
![npm](https://img.shields.io/npm/v/gridsome-transformer-docutils.svg)

> Docutils transformer for Gridsome.

This transformer parses [docutils xml documents](http://docutils.sourceforge.net/docs/ref/doctree.html) with [docutils-parser](https://github.com/vberlier/docutils-parser) and extends the graphql node type with a `document` field that contains the resulting document. This is particularly useful if you're also using tools like [sphinx](http://www.sphinx-doc.org) as it lets you load your generated documentation as a Gridsome data source.

## Installation

You can install `gridsome-transformer-docutils` with your `npm` client of choice.

```bash
$ npm install gridsome-transformer-docutils
```

## Usage

WIP

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
