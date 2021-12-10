# eslint-config-react

ESLint configuration for React Project. Easy to install and configure, it follows the best code standards from airbnb and uses prettier configuration on code format. Integrated with our [prettier configuration](https://github.com/inc4/prettier-config) configuration

## Purpose

This configuration uses airbnb and Prettier configuration plus some extra rules that we find handy for _React_ applications

For more information you can check [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) documentations as well the [airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) and [prettier](https://github.com/prettier/eslint-config-prettier) configurations for more information

This package integrates the Prettier rules with ESLint using our configuration. You can check it at [@inc4/prettier-configuration](https://github.com/inc4/prettier-config)

## How to install

You need ESLint and Prettier installed as development dependencies on your project. You can install them by using **npm** or **yarn**.

#### NPM

```
npm install --save-dev eslint prettier
```

Install all peer dependencies of our configuration, these can be listed by the command:

```
npm info "@inc4/eslint-config-react@latest" peerDependencies
```

If running _npm > v5_ you install them by:

```
npx install-peerdeps --dev @inc4/eslint-config-react
```

If _npm < v5_, Linux/OSX users can run:

```
(
  export PKG=@inc4/eslint-config-react;
  npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
)
```

#### YARN

```
yarn add eslint prettier -D
```

Install the peer dependencies tool, by running:

```
yarn global add install-peerdeps
```

and after that run the following command to install the project's config:

```
install-peerdeps @inc4/eslint-config-react -D
```

## How to use

To configure ESLinter and Prettier you can add to your `package.json`

```
"eslintConfig": {
  "extends": "@inc4/react",
},
"prettier": "@inc4/prettier-config"
```

Or create a `.eslintrc` and `.prettierrc` files and add `extends: "@inc4/react"` and `"@inc4/prettier-config"` respectivally. As an example:

```
<!-- .eslintrc -->
{
  "extends": "@inc4/react"
  <!-- you can edit this configuration as usual, check ESLint docs -->
}

<!-- .prettierrc -->
"@inc4/prettier-config"
```

To use ESLint and Prettier you can add this scripts to your `package.json` file

```
"lint": "eslint ./ --ignore-path .gitignore",
"lint:fix": "npm run lint -- --fix",
"format": "prettier --write \"{,!(node_modules)/**/}*.js\""
```

## Contributing

How to [contribute](/CONTRIBUTING.MD) to this open source library

## License

Copyright © 2021 [INC4](https://www.inc4.net). This library is licensed under the MIT [license](/LICENCE).

## About INC4

INC4 is your team for developing blockchain technologies of any complexity.
Whether you need smart contracts, dApps, DeFi, mining software, wallets, or any other unique DLT solution – we’re at your service, 24/7.

Take a look at our [website](https://www.inc4.net) and [get in touch!](https://www.https://inc4.net/get-in-touch/)
