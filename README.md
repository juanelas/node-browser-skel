[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Skeleton for both Node.js and native JS modules

Clone this repo to your desired project directory (`my-project` in the following example), unlink the git and remove unnecessary files.

## For Javascript sources

```bash
git clone https://github.com/juanelas/node-browser-skel.git my-project
cd my-project
rm -rf .git dist/.gitignore test/browser/.gitignore types/.gitignore .package-lock.json README.md INSTRUCTIONS.md src/index.ts
```

## For Typescript

```bash
git clone https://github.com/juanelas/node-browser-skel.git my-project
cd my-project
rm -rf .git dist/.gitignore test/browser/.gitignore types/.gitignore .package-lock.json README.md INSTRUCTIONS.md src/index.js
```

## Init your project

Edit `package.json` to suit your needs and initialize the project with:

```console
npm i
npm update -D
npm run build
git init
git add -A
git commit -a -m "ready to work"
```

A new JS/Typescript project is created with the following structure.

```text
.
├── build/
│   ├── build.docs.js
│   ├── build.dts.js
│   ├── rollup.config.js
│   └── rollup.tests.config.js
├── dist/
│   ├── index.browser.bundle.iife.js
│   ├── index.browser.bundle.mod.js
│   ├── index.browser.mod.js
│   ├── index.browser.mod.js.map
│   ├── index.node.cjs.js
│   ├── index.node.cjs.js.map
│   ├── index.node.esm.js
│   └── index.node.esm.js.map
├── .git/
│   └── ...
├── .github/
│   └── workflows/
│       └── nodejs.yml
├── node_modules/
│   └── ...
├── src/
│   ├── index.js
│   └── index.ts
├── templates/
│   ├── readme-template.md
│   └── tests-template.html
├── test/
│   ├── browser/
│   │   ├── .gitignore
│   │   ├── index.html
│   │   └── tests.js
│   └── test1.js
├── types/
│   └── index.d.ts
├── .vscode/
│   ├── launch.json
│   └── settings.json
├── .gitignore
├── INSTRUCTIONS.md
├── LICENSE
├── .npmignore
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

If you code with javascript you will also have the `src/index.js` instead of `src/index.ts`.

Now you are ready to bundle IIFE, ESM and CJS modules with the corresponding declaration files for TypeScript. Code follows [JavaScript Standard](https://standardjs.com) style. The bundles are created with [Rollup](https://rollupjs.org).

## Document your project

The `README.md` file of your project will be created during the build process, DO NOT EDIT it; edit `./templates/readme-template.md` instead. The API reference documentation will be automatically added to the end of the `README.md`.
> The API ref is created from the JS Doc in the browser generated file `./dist/index.browser.mod.js`. Don't forget to build your JS first.

After editing `./templates/readme-template.md`, you can build your `README.md` as:

```console
npm run build:docs
```

## Write JS/TS code and build for node.js and browser javascript

Write your code in ES6 using file `./src/index.js` (javascript project) or `./src/index.ts` (typescript). Consider editing the @module JSON Doc tag to meet your module name and update the module description (or just remove them if your project is not a module).

```javascript
/**
 * My module description. Please update with your module data. YOU HAVE TO MANUALLY DO IT!
 * @module my-package-name
 */
```

You can use string variable `process.env.BROWSER` to create specific code for native JS or Node. For example:

```javascript
if (process.env.BROWSER === 'true') {
  // browser specific code here
} else {
  // node.js specific code here
}
```

Once your source code is ready, you can build the final browser/node files (the node.js specific code will be stripped from the browser final files and vice versa) as:

```console
npm run build:js
```

Final browser/node files include an ESM file, a bundle minified ESM file, and a bundle minified IIFE file for browsers; and a CJS module for node. There are also map files for enhanced debug.

```text
dist/
├── index.browser.bundle.iife.js
├── index.browser.bundle.mod.js
├── index.browser.mod.js
├── index.browser.mod.js.map
├── index.node.cjs.js
├── index.node.cjs.js.map
├── index.node.esm.js
└── index.node.esm.js.map
```

A file with Typescript definition types can also be built to `./types/index.d.ts` with :

```console
npm run build:dts
```

> If you are programming in Javascript and not Typescript, consider using JS Doc with your exports. If the JS doc includes typing in the documentation, the created types definition file will honour the JS doc typing instead of using `any` everywhere.

## Create and run tests for node.js and browser

Mocha/Chai tests are created using Node.js common js format and should be placed in directory `./test/`. You can create separate test files but follow the instructions in `./test/test1.js`.

You can run tests in Node.js with:

```console
npm test
```

The script run mocha tests with nyc (istambul) code coverage report, so that you have an idea of what portions of your code are not tested.

Browser tests are built from the node.js ones:

```console
npm run build:browserTests
```

Don't forget rebuilding after adding/modifying a test.

> Opening the browser tests requires a local live server to serve `./test/browser/index.html`. With VSCode, you can use the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and just right click over the file and `Open with Live Server`; although any other server solution should be fine.

## Build all in one step

You can just go through all the build steps in one step:

```console
npm run build
```

## GitHub Actions

If you use github as the repository for your project, a workflow file is included in `.github/workflows/nodejs.yml`. The flow basically runs and test your code in the latest NodeJs versions. It is commented out, but you could uncomment a section that, when a NPM version change is detected, publishes the package to the NPM registry and to Coveralls.io for checking/publishing the code coverage.

For the publication process to work, you would need first to get a token from NPM (login->click you profile icon->Auth tokens->Create New Token) and then add it as a secret with name `NPM_TOKEN` to your github repository (once logged in tgithub, go to your repository web page, Settings tab->Secrets->Add a new secret). You should also sign in to Coveralls.io and add there your github project.

If you are uncertain or just not interested, just remove the `.github` directory.
