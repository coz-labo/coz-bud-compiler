/**
 * Test case for compileBudTmpl.
 * Runs with mocha.
 */
'use strict'

const compileBudTmpl = require('../lib/compile_bud_tmpl.js'),
  assert = require('assert')

describe('compileBudTmpl', () => {

  it('Compile bud tmpl', async () => {
    const bud = compileBudTmpl({
      tmpl: '{{name}}',
      engine: {
        compile(tmpl, callback) {
          assert.ok(!!tmpl)
          callback(null)
        }
      }
    })
    assert.ok(bud)
  })
})

/* global describe, it */
