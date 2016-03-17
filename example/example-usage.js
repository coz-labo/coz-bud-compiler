"use strict";

const cozBudCompiler = require('coz-bud-compiler');

let compiler = cozBudCompiler({
    resolveTmpl() {
        /*...*/
    },
    resolveEngine() {
        /*...*/
    }
});

compiler.compile({/*bud*/}, (err, buds) => {
    /*...*/
});