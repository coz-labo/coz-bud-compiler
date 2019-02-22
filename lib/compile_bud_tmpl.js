/**
 * Update bud data.
 * @memberof module:coz-bud-compiler/lib
 * @function compileBudTmpl
 * @param {Bud} bud - Bud to work with.
 * @returns {Promise}
 */

'use strict'

const _asyncWithTimeout = require('./_async_with_timeout')

/** @lends compileBudTmpl */
async function compileBudTmpl(bud, callback) {
  const results = []
  for (const b of [].concat(bud)) {
    const { tmpl, engine } = b
    switch (typeof tmpl) {
      case 'function':
        results.push(b)
        break
      default:
        const timeout = engine.timeout || 2000
        try {
          await _asyncWithTimeout(async () => {
            const compiled = await new Promise((resolve, reject) => {
              engine.compile(tmpl, (err, compiled) => err ? reject(err) : resolve(compiled))
            })
            b.tmpl = compiled || tmpl
            results.push(compiled)
          }, timeout)
        } catch (err) {
          let timeoutError = !!(err && err.$isTimeout)
          if (timeoutError) {
            console.error('[coz]Took too long with engine:', engine)
          }
          throw err
        }
        break
    }
  }
  return results
}

module.exports = compileBudTmpl
