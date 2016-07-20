/**
 * Update bud data.
 * @memberof module:coz-bud-compiler/lib
 * @function compileBudTmpl
 * @param {Bud} bud - Bud to work with.
 * @param {function} callback - Callback when done.
 */

'use strict'

const async = require('async')
const _asyncWithTimeout = require('./_async_with_timeout')

/** @lends compileBudTmpl */
function compileBudTmpl (bud, callback) {
  async.concatSeries([].concat(bud), (bud, callback) => {
    let { tmpl, engine } = bud
    async.waterfall([
      (callback) => {
        switch (typeof tmpl) {
          case 'function':
            // Already compiled.
            callback(null, tmpl)
            break
          default:
            let timeout = engine.timeout || 2000
            _asyncWithTimeout((callback) => {
              engine.compile(tmpl, callback)
            }, timeout, (err, compiled) => {
              let timeoutError = !!(err && err.$isTimeout)
              if (timeoutError) {
                console.log("Took too long with engine:", engine)
              }
              callback(err, compiled)
            })
            break
        }
      }
    ], (err, tmpl) => {
      bud.tmpl = tmpl
      callback(err, bud)
    })
  }, callback)
}

module.exports = compileBudTmpl
