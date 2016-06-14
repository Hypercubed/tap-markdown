var reporter = require('tap-summary').reporter;
var symbols = require('figures');
var prettyMs = require('pretty-ms');
var LF = '\n';

module.exports = function (opts) {
  return new Formatter(opts).init(reporter());
};
module.exports.Formatter = Formatter;

function Formatter(opts) {
  this.needDuration = !(opts && opts.duration === false);
}

Formatter.prototype.init = function (output) {
  var self = this;

  output.push('# Tests');

  output.on('test.end', function (test) {
    this.push(self.test(test));
  });

  output.on('summary', function (stats, fails, comments) {
    this.push(self.summary(stats));
    if (fails) {
      this.push(self.fail(fails));
    }
    if (comments) {
      this.push(self.comment(comments));
    }
  });

  return output;
};

Formatter.prototype.test = function (test) {
  var title = test.name + ' [' +
    'pass: ' + test.pass + ', fail: ' + test.fail +
    (this.needDuration ? ', duration: ' + prettyMs(test.duration) : '') +
    ']';
  return LF + '- ' + (test.fail ? symbols.cross : symbols.tick) + ' ' + title;
};

Formatter.prototype.summary = function (summary) {
  var output = [LF];
  output.push('# Summary');
  if (this.needDuration) {
    output.push('- duration: ' + prettyMs(summary.duration));
  }
  output.push('- planned: ' + summary.planned);
  output.push('- assertions: ' + summary.assertions);
  output.push('- pass: ' + summary.pass);
  output.push('- fail: ' + summary.fail);
  return output.join(LF);
};

Formatter.prototype.comment = function (comments) {
  var output = [LF];
  output.push('# Comments');
  // output.push('```');  TODO: make this an option?
  output.push(Object.keys(comments).map(function (name) {
    return '## ' + name + LF + comments[name].join(LF);
  }).join(LF + LF));
  // output.push('```');
  return output.join(LF);
};

Formatter.prototype.fail = function (fail) {
  var output = [LF];
  output.push(('# Fails'));
  // output.push('```');
  output.push(Object.keys(fail).map(function (name) {
    var res = ['## ' + name];
    fail[name].forEach(function (assertion) {
      res.push('    ' + symbols.cross + ' ' + assertion.name);
      res.push(this.prettifyError(assertion));
    }, this);
    return res.join(LF);
  }, this).join(LF + LF));

  // output.push('```');
  return output.join(LF);
};

Formatter.prototype.prettifyError = function (assertion) {
  return assertion.error.raw;
};
