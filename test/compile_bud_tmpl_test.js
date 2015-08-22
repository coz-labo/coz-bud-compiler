/**
 * Test case for compileBudTmpl.
 * Runs with nodeunit.
 */

var compileBudTmpl = require('../lib/compile_bud_tmpl.js');

exports.setUp = function (done) {
    done();
};

exports.tearDown = function (done) {
    done();
};

exports['Compile bud tmpl'] = function (test) {

    compileBudTmpl({
        tmpl: '{{name}}',
        engine: {
            compile: function (tmpl, callback) {
                test.ok(!!tmpl);
                callback(null);
            }
        }
    }, function (err) {
        test.ifError(err);
        test.done();
    });
};

