'use strict'

const kebabCase = require('lodash.kebabcase')
const fs = require('fs')
const path = require('path')
const debug = require('debug')('loopback:component:model-extender')
const appRoot = require('app-root-path')

module.exports = (app, options) => {
  options = options || {}

  debug('applying model customisations. options: %o', options)

  function loadComponents(Model) {
    debug('configuring model: %s', Model.modelName)

    // Sanity checks.
    if (Model._componentsLoaded && !options.force) {
      debug('cowardly refusing to reload model components')
      return
    }
    Model._componentsLoaded = true

    // Set up logging class.
    let log = options.log || console
    if (typeof log === 'string') {
      log = require(log)
    }

    // Apply models customisations.
    function customizeModel(sourcePath) {
      fs.readdirSync(sourcePath).forEach(sourceFile => {
        const filePath = path.join(sourcePath, sourceFile)

        if (path.extname(sourceFile) === '.js') {
          debug('Loading customization script %s', filePath)
          const code = require(filePath)

          if (typeof code === 'function') {
            debug('Customizing model %s', Model.modelName)
            code(Model)
          }
          else {
            debug('Skipping model file %s - `module.exports` is not a function', sourceFile)
          }
        }
      })
    }

    // Determine the path to look for model a customisation file.
    const basePath = path.join(appRoot.toString(), (options.basePath || '.'))
    const componentsPath = Model.settings.components || `common/models/${kebabCase(Model.modelName)}`
    const requirePath = path.join(basePath, componentsPath)

    try {
      debug(`Searching for model customisation file at ${requirePath}`)
      customizeModel(requirePath)
    }
    catch (err) {
      // anything other than 'file not found' should be a hard fail.
      if (err.code !== 'ENOENT') {
        log.error(`Failure loading component path: ${requirePath}`, err.stack)
        process.exit(1)
      }
    }
  }

  // Loop over each model and apply any found model customisations.
  Object.keys(app.models).forEach(key => {
    loadComponents(app.models[key])
  })
}
