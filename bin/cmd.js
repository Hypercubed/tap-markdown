#!/usr/bin/env node
var minimist = require('minimist');

var opts = minimist(process.argv.slice(2), {
  boolean: true,
  alias: {
      d: 'duration',
      f: 'fence'
  },
  default: {
    duration: true,
    fence: false
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
