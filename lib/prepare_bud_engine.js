/**
 * Update bud engine.
 * @memberof module:coz-bud-compiler/lib
 * @function prepareBudEngine
 * @param {Bud} bud - Bud to work with.
 * @param {function} resolver - Engine resolver.
 * @param {function} callback - Callback when done.
 */

"use strict";

const async = require('async');

/** @lends prepareBudEngine */
function prepareBudEngine(bud, resolver, callback) {
    async.concatSeries([].concat(bud), (bud, callback) => {
        let engine = bud.engine;
        let Engine = resolver(engine);
        if (Engine) {
            let setup = bud.setup || {};
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