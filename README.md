# tap-markdown
Consume TAP, produce markdown.

## Usage

```javascript
var reporter = require('tap-summary')()

```

or in `package.json`

```json
{
  "scripts": {
    "test": "tape test/*.js | tap-markdown"
  }
}
```

### CLI Options

```
  --ansi           Enable ANSI formatting
  --progress       Enable progress output during tests
  --no-markdown    Disable markdown formatting
```

## Acknowledgments

This TAP consumer is a thin wrapper around [zoubin/tap-summary](https://github.com/zoubin/tap-summary).  The only difference at the moment is this consumer defaults to no-ansi, no-progress, and markdown output.  This is idea for sending test results to a markdown file.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

Copyright (c) 2016 Jayson Harshbarger

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
