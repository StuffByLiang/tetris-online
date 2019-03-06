# Quick start

## Prerequisites

You must download `git` and `node.js` to begin development
* https://nodejs.org/en/download/
* https://git-scm.com/downloads/

## Install

To begin development, you must install required dependencies (run the commands in the project's root directory)

```bash
npm install
npm install --only=dev
```

Additionally, also install `webpack`

```bash
npm i -g webpack webpack-cli
```

## Developing Features

To incorporate your own changes, edit files under scripts and then compile them by typing the following command and the project's root directory. All changes under `/scripts` will be autocompiled into `/dist/bundle.js`

```bash
webpack
```

## Writing content

Visit `new.html` in the root directory on the browser to play the game. Make sure you run webpack beforehand.
