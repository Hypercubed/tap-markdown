#!/usr/bin/env node
var minimist = require('minimist');

var opts = minimist(process.argv.slice(2), {
  boolean: true,
  alias: {
    ansi: 'a',
    progress: 'p',
    markdown: 'm',
    tidy: 't'
  },
  default: {
    ansi: false,
    progress: false,
    markdown: true,
    tidy: true
  }
});

var reporter = require('tap-summary/lib/summary')(opts);

process.stdin.on('error', function () {
  process.exit(1);
});

if (opts.markdown && opts.tidy) {
  var tidyMarkdown = require('tidy-markdown');
  var concat = require('concat-stream');

  process.stdin
    .pipe(reporter)
    .pipe(concat(function (data) {
      process.stdout.write(tidyMarkdown(String(data)));
    }));
} else {
  process.stdin
    .pipe(reporter)
    .pipe(process.stdout);
}

process.on('exit', function (status) {
  if (status === 1) {
    process.exit(1);
  }
  if (reporter.failed) {
    process.exit(1);
  }
});
