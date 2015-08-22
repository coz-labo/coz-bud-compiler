/**
 * Update bud data.
 * @module coz-bud-compiler/lib
 * @function prepareBudData
 * @param {Bud} bud - Bud to work with.
 * @param {function} callback - Callback when done.
 */

"use strict";

var async = require('async'),
    path = require('path');

/** @lends prepareBudData */
function prepareBudData(bud, callback) {
    async.concatSeries([].concat(bud), function (bud, callback) {
        var data = bud.data || {};
        if (typeof(data) === 'string') {
            var filename = path.resolve(bud.cwd, data);
            data = require(filename);
        }
        data.__proto__ = {};
        data.__proto__.$$bud = {
            cwd: bud.cwd,
            src: bud.src,
            path: bud.path
        };
        bud.data = data;
        callback(null, bud);
    }, callback);
}

module.exports = prepareBudData;