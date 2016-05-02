#!/usr/bin/env node

/**
 * Release this package.
 */

'use strict'

const path = require('path')
const apeTasking = require('ape-tasking')
const apeReleasing = require('ape-releasing')

const basedir = path.resolve(__dirname, '..')
process.chdir(basedir)

apeTasking.runTasks('release', [
  () => apeReleasing.releasePackage({
    beforeRelease: [
      './ci/build.js',
      './ci/test.js'
    ]
  })
], true)
