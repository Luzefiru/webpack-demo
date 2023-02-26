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

For more option settings, check the [Configuration | webpack Documentation](https://webpack.js.org/configuration/).

### Creating a Task Runner to `build` Using Webpack

In order to use an `npm` `package.json` `"scripts": {}` script to run webpack instead of typing `npx webpack`, we can add a `"build": "webpack"` `"command": "script"` pair in the `"scripts": {}` object.

```JSON
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  ```

  We can now run webpack with this instead of `npx webpack`:
  
  ```bash
  npm run build
  ```

### Using webpack Modules to Parse CSS

We can use webpack to bundle code beyond `.js` files like `.css` files in conjunction with CSS Preprocessors. First, we install the necessary modules as a Development Dependency.

```bash
npm install --save-dev style-loader css-loader
```

Then, we add a `module:` property to our `webpack.config.js` file with the rules to determine what kind of files (expressed as a Regular Expression) for our loaders to bundle.

```JavaScript
  module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

Finally, we can now `import <file_path>` our `.css` files to be processed and bundled by the loaders in our `index.js` file when we do `npx webpack` or `npm run build` if we setup the npm script from earlier.

```JavaScript
import _ from 'lodash';
import './style.css';
```

### Modules to Parse Image & Font Resources

We have to make sure to include our assets in the `./src/` directory so that webpack can scan it to generate the bundle.

Before we start adding our files, we need to add new rules to the `webpack.config.js` file:

```JavaScript
module: {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i, // select all image file extensions
      type: 'asset/resource', // process them as an 'asset/resource'
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i, // select all typeface file extensions
      type: 'asset/resource', // process them as an 'asset/resource'
    },
  ],
},
```

Now, evertime we refer a file path to an image or a typeface, webpack will add them to the `./dist/` directory and replace the output files' file paths with the output's paths.

```JavaScript
import MyImage from './my-image.png' // bundles & replaces `./my-image.png` with the `./dist` file path
background-image: url(./my-image.png) // in CSS files too
<img src="./my-image.png" /> // and in our ./dist/index.html
```