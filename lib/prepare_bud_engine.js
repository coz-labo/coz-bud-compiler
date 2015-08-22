/**
 * Update bud engine.
 * @memberof module:coz-bud-compiler/lib
 * @function prepareBudEngine
 * @param {Bud} bud - Bud to work with.
 * @param {function} resolver - Engine resolver.
 * @param {function} callback - Callback when done.
 */

"use strict";

var async = require('async');

/** @lends prepareBudEngine */
function prepareBudEngine(bud, resolver, callback) {
    async.concatSeries([].concat(bud), function (bud, callback) {
        var engine = bud.engine;
        var Engine = resolver(engine);
        if (Engine) {
            var setup = bud.setup || {};
            setup.basedir = bud.cwd;
            engine = new Engine(setup);
        }
        if (!engine) {
            callback(new Error('[BudCompiler]Engine not found:' + bud.engine));
            return;
        }
        bud.engine = engine;
        callback(null, bud);
    }, callback);
}

module.exports = prepareBudEngine;