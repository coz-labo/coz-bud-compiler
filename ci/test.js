#!/usr/bin/env node

/**
 * Run test
 */

'use strict'

const path = require('path')
const apeTasking = require('ape-tasking')
const apeTesting = require('ape-testing')

let basedir = path.resolve(__dirname, '..')

process.chdir(basedir)

apeTasking.runTasks('test', [
  () => apeTesting.runMocha('test/**/*_test.js')
], true)
