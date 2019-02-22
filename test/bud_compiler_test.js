/**
 * Test case for budCompiler.
 * Runs with mocha.
 */
'use strict'

const BudCompiler = require('../lib/bud_compiler.js')
const assert = require('assert')

describe('budCompiler', () => {
  it('Bud compiler', async () => {
    let compiler = new BudCompiler({
      resolveTmpl(tmpl) {
        return tmpl
      },
      resolveEngine(engine) {
        return function () {
          this.compile = function (bud, callback) {
            callback(null, 'hoge')
          }
        }
      }
    })

    let bud = require('../doc/mockups/mock-bud.bud')

    bud = await compiler.compile(bud)
    assert.ok(bud)
  })
})

/* global describe, it */
