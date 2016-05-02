#!/usr/bin/env node

/**
 * Run report
 */

'use strict'

const path = require('path')
const apeTasking = require('ape-tasking')
const apeReporting = require('ape-reporting')

let basedir = path.resolve(__dirname, '..')
process.chdir(basedir)

apeTasking.runTasks([
  () => apeReporting.sendToCodeclimate('coverage/lcov.info')
], true)
