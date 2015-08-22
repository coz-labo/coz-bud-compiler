/**
 * Update bud data.
 * @memberof module:coz-bud-compiler/lib
 * @function compileBudTmpl
 * @param {Bud} bud - Bud to work with.
 * @param {function} callback - Callback when done.
 */

"use strict";

var async = require('async'),
    _asyncWithTimeout = require('./_async_with_timeout')

/** @lends compileBudTmpl */
function compileBudTmpl(bud, callback) {
    async.concatSeries([].concat(bud), function (bud, callback) {
        var tmpl = bud.tmpl,
            engine = bud.engine;
        async.waterfall([
            function (callback) {
                switch (typeof(tmpl)) {
                    case 'function':
                        // Already compiled.
                        callback(null, tmpl);
                        break;
                    default:
                        var timeout = engine.timeout || 2000;
                        _asyncWithTimeout(function (callback) {
                            engine.compile(tmpl, callback);
                        }, timeout, function (err, compiled) {
                            var timeoutError = !!(err && err.$isTimeout);
                            if (timeoutError) {
                                console.log("Took too long with engine:", engine);
                            }
                            callback(err, compiled)
                        });
                        break;
                }
            }
        ], function (err, tmpl) {
            bud.tmpl = tmpl;
            callback(err, bud);
        });
    }, callback);
}

module.exports = compileBudTmpl;