'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
  // function generateSassResourceLoader() {
  //   var loaders = [
  //     cssLoader,
  //     'sass-loader',
  //     {
  //       loader: 'sass-resources-loader',
  //       options: {
  //         // 多个文件时用数组的形式传入，单个文件时可以直接使用 path.resolve(__dirname, '../static/style/common.scss'
  //         resources: path.resolve(__dirname, '../src/scss/_variables.scss')  
  //       }
  //     }
  //     ];
  //     if (options.extract) {
  //       return ExtractTextPlugin.extract({
  //         use: loaders,
  //         fallback: 'vue-style-loader'
  //       })
  //     } else {
  //       return ['vue-style-loader'].concat(loaders)
  //     }
  //   }
    // =========
  // SASS 配置
  // =========
  function resolveResouce(name) {
    return path.resolve(__dirname, '../src/scss/' + name);
  }
  function generateSassResourceLoader() {
    console.log(resolveResouce('_variables.scss'))
    var loaders = [
      cssLoader,
      // 'postcss-loader',
      'sass-loader',
      {
          loader: 'sass-resources-loader',
          options: {
            // Provide path to the file with resources
            resources: resolveResouce('_variables.scss'),

            // Or array of paths
            //resources: [resolveResouce('_variables.scss')]
            // it need a absolute path
            //resources: [resolveResouce('_variables.scss')]
          }
      }
    ];
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateSassResourceLoader(),
    scss: generateSassResourceLoader(),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// .concat({
//   loader: 'sass-resources-loader',
//   options: {
//     resources: path.resolve(__dirname, '../src/scss/my.scss')
//   }
// })

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
