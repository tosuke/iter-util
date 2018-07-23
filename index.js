const semver = require('semver')

if (process && semver.gt(process.version, '10.0.0')) {
  module.exports = require('./lib/cjs/esnext')
} else {
  module.exports = require('./lib/cjs/es2015')
}
