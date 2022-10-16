# define-orbit

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

> Wrapper for integrating OrbitDB into Vue

This introduces factory functions to easily use the **[OrbitDB](https://github.com/orbitdb/orbit-db)** - _serverless_, _distributed_, _peer-to-peer database_ in the **[Vue](https://vuejs.org/)** framework.

## Install

```bash
npm i define-orbit
```

## Usage

```ts
// store creation
import { defineLog } from 'define-orbit';

export const useMyEventLog = defineLog({name:'database-name'})

// use in "setup" functions
const myEventlog = useMyEventLog()
```

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
