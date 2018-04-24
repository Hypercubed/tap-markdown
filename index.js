var reporter = require('tap-summary').reporter;
var symbols = require('figures');
var prettyMs = require('pretty-ms');

var LF = '\n';
var fence = '';

module.exports = function (opts) {
  return new Formatter(opts).init(reporter());
};
module.exports.Formatter = Formatter;

function Formatter(opts) {
  this.needDuration = !(opts && opts.duration === false);
  this.needFencing = !(opts && opts.fence === false);
  if(this.needFencing) {
    fence = '```';
  };
};

Formatter.prototype.init = function (output) {
  var self = this;

  output.push('# Tests' + LF);

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
  output.push('# Summary' + LF);
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
  output.push('# Comments' + LF);
  output.push(Object.keys(comments).map(function (name) {
    return '## ' + name + LF + LF + fence + LF + comments[name].join(LF).replace('    ','') + LF + fence;
  }).join(LF + LF));
  return output.join(LF);
};

Formatter.prototype.fail = function (fail) {
  var output = [LF];
  output.push(('# Fails' + LF));
  output.push(Object.keys(fail).map(function (name) {
    var res = ['## ' + name + LF + LF +fence];
    fail[name].forEach(function (assertion) {
      res.push(symbols.cross + ' ' + assertion.name);
      res.push("operator: " + assertion.error.operator);
      res.push("expected: " + assertion.error.expected);
      res.push("actual:   " + assertion.error.actual);
    }, this);
    res.push(fence);
    return res.join(LF);
  }, this).join(LF + LF));
  return output.join(LF);
};

