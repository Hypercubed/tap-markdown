# tap-markdown
Consume TAP, produce markdown.

[![version](https://img.shields.io/npm/v/tap-markdown.svg)](https://www.npmjs.org/package/tap-markdown)
[![status](https://travis-ci.org/Hypercubed/tap-markdown.svg)](https://travis-ci.org/Hypercubed/tap-markdown)
[![dependencies](https://david-dm.org/Hypercubed/tap-markdown.svg)](https://david-dm.org/Hypercubed/tap-markdown)
[![devDependencies](https://david-dm.org/Hypercubed/tap-markdown/dev-status.svg)](https://david-dm.org/Hypercubed/tap-markdown#info=devDependencies)

## Install

npm install tap-markdown -g

## Usage

```sh
tape test/*.js | tap-markdown
```

or in `package.json`

```json
{
  "scripts": {
    "test": "tape test/*.js | tap-markdown"
  }
}
```

## Example output

```md
# Tests

- ✔ t.plan [pass: 1, fail: 0, duration: 0ms]
- ✔ t.end [pass: 2, fail: 0, duration: 3ms]

# Summary

- duration: 3ms
- planned: 3
- assertions: 3
- pass: 3
- fail: 0
```

### CLI Options

```
  --no-tidy        Disable tidy-markdown
```

## Acknowledgments

This TAP consumer is a thin wrapper around [zoubin/tap-summary](https://github.com/zoubin/tap-summary) and [tidy-markdown](https://github.com/slang800/tidy-markdown).  The only difference at the moment is this consumer defaults to no-ansi, no-progress, and tidy markdown output.  This is ideal for sending test results to a markdown file.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

Copyright (c) 2016 Jayson Harshbarger

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
