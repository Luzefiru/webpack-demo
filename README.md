# webpack-test
A test repository to practice the different functionalities of webpack to implement module bundling in my future projects.

## Before webpack

Developers need to explicitly type out what modules they needed in their `index.html`'s `<script src="module_url">` to be able to use them in their actual `index.js` files.

This is extremely repetitive and can lead to a lot of bugs when attempting to manage packages in a very large codebase.

Alternatively, we can store the `npm` modules inside the website's local file, but it will create performance issues and unnecessarily large files just to implement functionaltiies.

## After webpack

We can let webpack generate a [dependency graph](https://webpack.js.org/concepts/dependency-graph/) to create an optimized bundle where scripts can be executed in the correct order, while removing the need to implicitly add multiple scripts to our `index.html`. Instead, all we need is to import the webpack-generated `main.js` file inside the `/dist/` directory.

### Using Custom `webpack.config.js` Files

In order to set the current project's webpack to execute options from a preset file, we have to create a `webpack.config.js` file in the project's root directory together with `package.json` and `node_modules`.

Each of the `--option`s can now be set inside the `module.exports` object using `option: argument` pairs. Here's an example:

```JavaScript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

In order to set webpack to run with it everytime we do `npx webpack`, we first have to run;

```bash
npx webpack --config webpack.config.js
```