# define-orbit

> Template to kickstart creating a Node.js module using TypeScript and VSCode

Inspired by [node-module-boilerplate](https://github.com/sindresorhus/node-module-boilerplate)

## Features

- [Semantic Release](https://github.com/semantic-release/semantic-release)
- [Issue Templates](https://github.com/vyachean/define-orbit/tree/main/.github/ISSUE_TEMPLATE)
- [GitHub Actions](https://github.com/vyachean/define-orbit/tree/main/.github/workflows)
- [Codecov](https://about.codecov.io/)
- [VSCode Launch Configurations](https://github.com/vyachean/define-orbit/blob/main/.vscode/launch.json)
- [TypeScript](https://www.typescriptlang.org/)
- [Husky](https://github.com/typicode/husky)
- [Lint Staged](https://github.com/okonet/lint-staged)
- [Commitizen](https://github.com/search?q=commitizen)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Getting started

### Set up your repository

**Click the "Use this template" button.**

Alternatively, create a new directory and then run:

```bash
curl -fsSL https://github.com/vyachean/define-orbit/archive/main.tar.gz | tar -xz --strip-components=1
```

Replace `FULL_NAME`, `GITHUB_USER`, and `REPO_NAME` in the script below with your own details to personalize your new package:

```bash
FULL_NAME="John Smith"
GITHUB_USER="johnsmith"
REPO_NAME="my-cool-package"
sed -i.mybak "s/vyachean/$GITHUB_USER/g; s/define-orbit\|define-orbit/$REPO_NAME/g; s/Vyacheslav Baranov/$FULL_NAME/g" package.json package-lock.json README.md
rm *.mybak
```

### Add NPM Token

Add your npm token to your GitHub repository secrets as `NPM_TOKEN`.

### Add Codecov integration

Enable the Codecov GitHub App [here](https://github.com/apps/codecov).

**Remove everything from here and above**

---

# define-orbit

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> My awesome module

## Install

```bash
npm install define-orbit
```

## Usage

```ts
import { myPackage } from 'define-orbit';

myPackage('hello');
//=> 'hello from my package'
```

## API

### myPackage(input, options?)

#### input

Type: `string`

Lorem ipsum.

#### options

Type: `object`

##### postfix

Type: `string`
Default: `rainbows`

Lorem ipsum.

[build-img]:https://github.com/vyachean/define-orbit/actions/workflows/release.yml/badge.svg
[build-url]:https://github.com/vyachean/define-orbit/actions/workflows/release.yml
[downloads-img]:https://img.shields.io/npm/dt/define-orbit
[downloads-url]:https://www.npmtrends.com/define-orbit
[npm-img]:https://img.shields.io/npm/v/define-orbit
[npm-url]:https://www.npmjs.com/package/define-orbit
[issues-img]:https://img.shields.io/github/issues/vyachean/define-orbit
[issues-url]:https://github.com/vyachean/define-orbit/issues
[codecov-img]:https://codecov.io/gh/vyachean/define-orbit/branch/main/graph/badge.svg
[codecov-url]:https://codecov.io/gh/vyachean/define-orbit
[semantic-release-img]:https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-release-url]:https://github.com/semantic-release/semantic-release
[commitizen-img]:https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen-url]:http://commitizen.github.io/cz-cli/