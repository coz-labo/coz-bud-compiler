/**
 * Test case for budCompiler.
 * Runs with mocha.
 */
'use strict'

const BudCompiler = require('../lib/bud_compiler.js')
const assert = require('assert')

describe('budCompiler', () => {
  it('Bud compiler', (done) => {
    let compiler = new BudCompiler({
      resolveTmpl (tmpl) {
        return tmpl
      },
      resolveEngine (engine) {
        return function () {
          this.compile = function (bud, callback) {
            callback(null, null)
          }
        }
      }
    })

    let bud = require('../doc/mockups/mock-bud.bud')

    compiler.compile(bud, (err, bud) => {
      assert.ifError(err)
      assert.ok(bud)
      done()
    })
  })
})

/* global describe, it */
