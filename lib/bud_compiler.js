/**
 * Bud file compiler.
 * @memberof module:coz-bud-compiler/lib
 * @inner
 * @constructor BudCompiler
 * @param {object} config - Compiler configuration.
 * @param {function} config.resolveTmpl - Resolve a tmpl.
 * @param {function} config.resolveEngine - A engine.
 */

"use strict";

const async = require('async'),
    assert = require('assert'),
    cozBud = require('coz-bud'),
    prepareBudData = require('./prepare_bud_data'),
    prepareBudTmpl = require('./prepare_bud_tmpl'),
    prepareBudEngine = require('./prepare_bud_engine'),
    compileBudTmpl = require('./compile_bud_tmpl');

/** @lends BudCompiler */
function BudCompiler(config) {
    config = config || {};
    let s = this;
    s.resolveTmpl = config.resolveTmpl;
    s.resolveEngine = config.resolveEngine;
    assert.ok(s.resolveTmpl, "config.resolveTmpl is required.");
    assert.ok(s.resolveEngine, "config.resolveEngine is required.");
}

BudCompiler.prototype = {
    /**
     * Compile bud.
     * @param {Bud} bud - Bud to compile.
     * @param {compileCallback} callback - Callback when done.
     */
    compile: function (bud, callback) {
        let s = this;
        bud = [].concat(bud).map(cozBud.create);
        async.waterfall([
            (callback) => {
                process.nextTick(() => {
                    callback(null, bud);
                });
            },
            (bud, callback) => {
                prepareBudData(bud, callback);
            },
            (bud, callback) => {
                prepareBudTmpl(bud, s.resolveTmpl, callback);
            },
            (bud, callback) => {
                prepareBudEngine(bud, s.resolveEngine, callback);
            },
            (bud, callback) => {
                compileBudTmpl(bud, callback);
            }
        ], (err, bud) => {
            callback(err, bud);
        });
    }
};

module.exports = BudCompiler;


/**
 * Callback for bud compiler.
 * @memberof module:coz-bud-compiler/lib
 * @inner
 * @callback compileCallback
 * @param {?Error} err - Bud compile error.
 * @param {Bud} bud - Compiled bud.
 */