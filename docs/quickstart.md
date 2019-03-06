# Quick start

## Prerequisites

You must download `git` and `node.js` to begin development
* https://nodejs.org/en/download/
* https://git-scm.com/downloads/

## Clone repository

First clone the tetris-online repository on github

```bash
git clone https://github.com/StuffByLiang/tetris-online.git
```

## Install

To begin development, you must install required dependencies (run the commands in the project's root directory)

```bash
npm install
npm install --only=dev
```

Additionally, also install `webpack` and `docsify`

```bash
npm i -g webpack webpack-cli docsify-cli
```

## Developing Features

To incorporate your own changes, edit files under scripts and then compile them by typing the following command and the project's root directory. All changes under `/scripts` will be autocompiled into `/dist/bundle.js`

```bash
webpack
```

## Checking the documentation

Check the documentation! Run the following code and then in your browser visit http://localhost:3001

```bash
npm run docs
```

## Writing content

Visit `new.html` in the root directory on the browser to play the game. Make sure you run webpack beforehand.
