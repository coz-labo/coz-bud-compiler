/**
 * Resolve a string.
 * If a string is a existing file path, returns the file content. Otherwise the original string.
 * @memberof coz/lib/bud
 * @function _resolveStringValue
 * @param {string} string - String to resolve
 * @param {string} basedir - Base directory path.
 * @param {function} callback - Callback when done.
 * @private
 */

'use strict'

const path = require('path')
const fs = require('fs')

function _resolveStringValue (string, basedir, callback) {
  let isString = typeof string === 'string'
  if (!isString) {
    callback(null, string)
    return
  }
  let filename = path.resolve(basedir, string)
  _readFile(filename, (err, read) => {
    if (!err && read) {
      string = read
    }
    callback(null, string)
  })
}

function _readFile (filename, callback) {
  fs.exists(filename, (exists) => {
    if (exists) {
      fs.readFile(filename, callback)
    } else {
      callback(null, null)
    }
  })
}

module.exports = _resolveStringValue
