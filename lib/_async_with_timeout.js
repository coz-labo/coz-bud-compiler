/**
 * Do some task with timeout.
 * @memberof module:coz/lib/bud
 * @function _asyncWithTimeout
 * @param {function} task - An async task.
 * @param {number} timeout - Timeout duration.
 * @returns {Promise}
 * @private
 */

'use strict'

/** @lends _asyncWithTimeout */
async function _asyncWithTimeout(task, timeout) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      let err = new Error('[coz] Operation timeout.')
      err.$isTimeout = true
      reject(err)
    }, timeout)
    Promise.resolve(task()).then((result) => {
      clearTimeout(timer)
      resolve(result)
    })
  })
}

module.exports = _asyncWithTimeout
