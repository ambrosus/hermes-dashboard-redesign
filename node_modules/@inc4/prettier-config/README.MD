# @inc4/prettier-config
Quickly format your JavaScript files with this easy to install and use Prettier configuration. This configuration is used on our ESLint React configuration, take a look at [eslint-config-react](https://github.com/inc4/eslint-config-react)

## Purpose
[Prettier](https://prettier.io/) is an opinionated code formatter easy to configure and integrate with Code Editors. This configuration aims to quickly install and config JavaScript projects for consistent code style standards.

This package can be used as a stand-alone config or integrated with any linter. If you look to integrate with [ESLint](https://eslint.org/) for React projects take a look at our configuration [eslint-config-react](https://github.com/inc4/eslint-config-react) using this Prettier config

## How to install
```
npm install prettier @inc4/prettier-config
```
## How to use
In your `package.json` add:

```
"prettier": "@inc4/prettier-config"
```
Under script objects
```
"format": "prettier --write \"{,!(node_modules)/**/}*.js\""
```

## Contributing
How to [contribute](/CONTRIBUTING.MD) to this open source library

## License

Copyright © 2021 [INC4](https://www.inc4.net). This library is licensed under the MIT [license](./LICENCE).

## About INC4

INC4 is your team for developing blockchain technologies of any complexity.
Whether you need smart contracts, dApps, DeFi, mining software, wallets, or any other unique DLT solution – we’re at your service, 24/7.

Take a look at our [website](https://www.inc4.net) and [get in touch!](https://www.https://inc4.net/get-in-touch/)