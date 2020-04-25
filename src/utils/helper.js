const R = require('ramda')

function isNilOrEmpty(data) {
  return R.anyPass([R.isNil, R.isEmpty])(data)
}

module.exports = { isNilOrEmpty }
