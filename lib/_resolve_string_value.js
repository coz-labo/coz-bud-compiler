/**
 * Resolve a string.
 * If a string is a existing file path, returns the file content. Otherwise the original string.
 * @memberof coz/lib/bud
 * @function _resolveStringValue
 * @param {string} string - String to resolve
 * @param {string} basedir - Base directory path.
 * @returns {Promise}
 * @private
 */

'use strict'

const path = require('path')
const fs = require('fs')

async function _resolveStringValue(string, basedir) {
  let isString = typeof string === 'string'
  if (!isString) {
    return string
  }
  let filename = path.resolve(basedir, string)
  return new Promise((resolve, reject) => {
    _readFile(filename, (err, read) => {
      if (!err && read) {
        string = read
      }
      resolve(string)
    })
  })
}

function _readFile(filename, callback) {
  fs.exists(filename, (exists) => {
    if (exists) {
      fs.readFile(filename, callback)
    } else {
      callback(null, null)
    }
  })
}

module.exports = _resolveStringValue
