'use strict'

const cozBudCompiler = require('coz-bud-compiler')

async function main() {
  let compiler = cozBudCompiler({
    resolveTmpl() {
      /*...*/
    },
    resolveEngine() {
      /*...*/
    }
  })

  const buds = await compiler.compile({/*bud*/ })
}

void main()
