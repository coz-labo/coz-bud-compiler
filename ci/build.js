#!/usr/bin/env node
'use strict'

const path = require('path')
const apeTasking = require('ape-tasking')
const coz = require('coz')

let basedir = path.resolve(__dirname, '..')
process.chdir(basedir)

apeTasking.runTasks('build', [
  () => coz.render([
    '.*.bud',
    'doc/**/.*.bud',
    'example/**/.*.bud',
    'lib/**/.*.bud',
    'test/**/.*.bud'
  ])
], true)

