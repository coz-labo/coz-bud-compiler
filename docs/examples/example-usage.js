var cozBudCompiler = require('coz-bud-compiler');

var compiler = cozBudCompiler({
    resolveTmpl: function () {
        /*...*/
    },
    resolveEngine: function () {
        /*...*/
    }
});

compiler.compile({/*bud*/}, function (err, buds) {
    /*...*/
});