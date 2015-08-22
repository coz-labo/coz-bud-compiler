/**
 * Test case for budCompiler.
 * Runs with nodeunit.
 */

var BudCompiler = require('../lib/bud_compiler.js');

exports.setUp = function (done) {
    done();
};

exports.tearDown = function (done) {
    done();
};

exports['Bud compiler'] = function (test) {

    var compiler = new BudCompiler({
        resolveTmpl: function (tmpl) {
            return tmpl;
        },
        resolveEngine: function (engine) {
            return function () {
                this.compile = function (bud, callback) {
                    callback(null, null);
                }
            };
        }
    });

    var bud = require('../docs/mockups/mock-bud.bud');

    compiler.compile(bud, function (err, bud) {
        test.ifError(err);
        test.ok(bud);
        test.done();
    });

};

