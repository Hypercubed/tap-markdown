var fs = require('fs');
var path = require('path');
var test = require('tape');
var markdown = require('..');
var fixtures = path.resolve.bind(path, __dirname, 'fixtures');
var concat = require('concat-stream');

test('summary', function (t) {
  fs.createReadStream(fixtures('summary.tap'))
    .pipe(markdown({duration: false}))
    .pipe(concat({encoding: 'string'}, function (s) {
      t.equal(s, fs.readFileSync(fixtures('summary.expected'), 'utf8'));
      t.end();
    }));
});

test('fail', function (t) {
  markdown.Formatter.prototype.prettifyError = function (assertion) {
    var lines = assertion.error.raw.split('\n');
    lines.pop();
    return lines.join('\n');
  };
  fs.createReadStream(fixtures('fail.tap'))
    .pipe(markdown({duration: false}))
    .pipe(concat({encoding: 'string'}, function (s) {
      t.equal(s, fs.readFileSync(fixtures('fail.expected'), 'utf8'));
      t.end();
    }));
});

test('comment', function (t) {
  fs.createReadStream(fixtures('comment.tap'))
    .pipe(markdown({duration: false}))
    .pipe(concat({encoding: 'string'}, function (s) {
      t.equal(s, fs.readFileSync(fixtures('comment.expected'), 'utf8'));
      t.end();
    }));
});

