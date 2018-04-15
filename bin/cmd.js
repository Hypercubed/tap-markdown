#!/usr/bin/env node
var minimist = require('minimist');

var opts = minimist(process.argv.slice(2), {
  boolean: true,
  default: {
    duration: true
  }
});

process.stdin.on('error', function () {
  process.exit(1);
});

var destination = process.stdout;
var reporter = require('..')(opts);

process.stdin
  .pipe(reporter)
  .pipe(destination);

process.on('exit', function (status) {
  if (status === 1) {
    process.exit(1);
  }
  if (reporter.failed) {
    process.exit(1);
  }
});
