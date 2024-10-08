'use strict'

const fs = require('fs')
const http = require('http')
const path = require('path')
const pkgJson = require('../../../package.json')
require('dotenv').config()

const rollup = require('rollup')
const resolve = require('@rollup/plugin-node-resolve').nodeResolve
const replace = require('@rollup/plugin-replace')
const typescriptPlugin = require('@rollup/plugin-typescript')
const commonjs = require('@rollup/plugin-commonjs')
const json = require('@rollup/plugin-json')
const multi = require('@rollup/plugin-multi-entry')
const runScript = require('../../run-script')

const rootDir = path.join(__dirname, '..', '..', '..')

const regex = /^(?:(?<scope>@.*?)\/)?(?<name>.*)/ // We are going to take only the package name part if there is a scope, e.g. @my-org/package-name
const { name } = pkgJson.name.match(regex).groups

const indexHtml = `<!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>${name}</title>
    <script src="/mocha.js"></script>
  </head>

  <body>

  </body>
    <div id="mocha"></div>
    <script type="module">
      import * as chai from '/chai';
      globalThis.chai = chai;
    </script>
    <script>
      mocha.setup({
        ui: 'bdd',
        reporter: 'spec',
        color: 'true',
        timeout: 90000
      })
    </script>
    <script type="module">
      import '/tests.js'
      window._mocha = mocha.run()
    </script>
  </html>`

const tsBundleOptions = {
  tsconfig: path.join(rootDir, 'tsconfig.json'),
  outDir: undefined, // ignore outDir in tsconfig.json
  sourceMap: false
  // include: ['src/ts/**/*', 'build/typings/**/*.d.ts']
}

async function buildTests (testFiles) {
  // create a bundle
  const inputOptions = {
    input: testFiles,
    plugins: [
      multi(),
      replace({
        IS_BROWSER: true,
        _MODULE_TYPE: "'ESM'",
        _NPM_PKG_VERSION: `'${process.env.npm_package_version}'` ?? "'0.0.1'",
        preventAssignment: true
      }),
      typescriptPlugin(tsBundleOptions),
      commonjs({ extensions: ['.js', '.jsx'] }),
      json(),
      resolve({ browser: true }),
      replace({
        '#pkg': '/esm.min.js',
        delimiters: ['', ''],
        preventAssignment: true
      })
    ],
    external: ['/esm.min.js']
  }
  const bundle = await rollup.rollup(inputOptions)
  const { output } = await bundle.generate({ format: 'es' })
  await bundle.close()
  let bundledCode = output[0].code
  const replacements = _getEnvVarsReplacements(bundledCode)
  for (const replacement in replacements) {
    const regExp = new RegExp(replacement, 'g')
    bundledCode = bundledCode.replace(regExp, replacements[replacement])
  }
  return bundledCode
}

class TestServer {
  constructor () {
    this.server = http.createServer()
  }

  async init (testFiles) {
    await runScript(path.join(rootDir, 'node_modules', '.bin', 'rollup'), ['-c', 'build/testing/browser/rollup.config.mjs'])

    const tests = await buildTests(testFiles)
    this.server.on('request', function (req, res) {
      if (req.url === '/esm.min.js') {
        fs.readFile(path.join(rootDir, pkgJson.directories.temp, 'esm.min.js'), function (err, data) {
          if (err) {
            res.writeHead(404)
            res.end(JSON.stringify(err))
            return
          }
          res.writeHead(200, { 'Content-Type': 'text/javascript' })
          res.end(data)
        })
      } else if (req.url === '/esm.min.js.map') {
        fs.readFile(path.join(rootDir, pkgJson.directories.temp, 'esm.min.js.map'), function (err, data) {
          if (err) {
            res.writeHead(404)
            res.end(JSON.stringify(err))
            return
          }
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(data)
        })
      } else if (req.url === '/index.html' || req.url === '/') {
        res.writeHead(200)
        res.end(indexHtml)
      } else if (req.url === '/tests.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' })
        res.end(tests)
      } else if (req.url === '/mocha.js') {
        fs.readFile(path.join(rootDir, 'node_modules/mocha/mocha.js'), function (err, data) {
          if (err) {
            res.writeHead(404)
            res.end(JSON.stringify(err))
            return
          }
          res.writeHead(200, { 'Content-Type': 'text/javascript' })
          res.end(data)
        })
      } else if (req.url === '/mocha.js.map') {
        fs.readFile(path.join(rootDir, 'node_modules/mocha/mocha.js.map'), function (err, data) {
          if (err) {
            res.writeHead(404)
            res.end(JSON.stringify(err))
            return
          }
          res.writeHead(200, { 'Content-Type': 'text/javascript' })
          res.end(data)
        })
      } else if (req.url === '/chai') {
        fs.readFile(path.join(rootDir, 'node_modules/chai/chai.js'), function (err, data) {
          if (err) {
            res.writeHead(404)
            res.end(JSON.stringify(err))
            return
          }
          res.writeHead(200, { 'Content-Type': 'text/javascript' })
          res.end(data)
        })
      } else if (req.url === '/favicon.ico') {
        fs.readFile(path.join(__dirname, 'favicon.ico'), function (err, data) {
          if (err) {
            res.writeHead(404)
            res.end(JSON.stringify(err))
            return
          }
          res.writeHead(200, { 'Content-Type': 'application/ico' })
          res.end(data)
        })
      } else {
        res.writeHead(404)
        res.end()
      }
    })
  }

  listen (port = 38080) {
    return new Promise((resolve, reject) => {
      this.server.listen(port, error => {
        if (error) return reject(error)
        console.log(`Testing server listenning at http://localhost:${port}`)
        return resolve()
      })
    })
  }

  close () {
    return new Promise((resolve, reject) => {
      this.server.close(error => {
        if (error) {
          reject(error)
        } else {
          try {
            fs.rmSync(path.join(rootDir, pkgJson.directories.temp, 'esm.min.js'))
            fs.rmSync(path.join(rootDir, pkgJson.directories.temp, 'esm.min.js.map'))
            fs.rmdirSync(path.join(rootDir, pkgJson.directories.temp)) // delete the temp directory if it is empty
          } catch (error) {
          }
          resolve()
        }
      })
    })
  }
}

function _getEnvVarsReplacements (testsCode) {
  const replacements = {}
  const missingEnvVars = []
  for (const match of testsCode.matchAll(/process\.env\.(\w+)/g)) {
    const envVar = match[1]
    if (process.env[envVar] !== undefined) {
      replacements[match[0]] = '`' + process.env[envVar] + '`'
    } else {
      replacements[match[0]] = undefined
    }
  }
  for (const match of testsCode.matchAll(/process\.env\[['"](\w+)['"]\]/g)) {
    const envVar = match[1]
    if (process.env[envVar] !== undefined) {
      replacements[match[0]] = '`' + process.env[envVar] + '`'
    } else {
      replacements[match[0]] = undefined
    }
  }
  if (missingEnvVars.length > 0) {
    console.warn('The following environment variables are missing in your .env file and will be replaced with "undefined": ' + [...(new Set(missingEnvVars)).values()].join(', '))
  }
  return replacements
}

exports.server = new TestServer()
