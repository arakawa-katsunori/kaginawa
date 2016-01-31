const taskName = 'index';
const fileName = taskName + '.jsx';

const dest = './www';
const src = './src';

const webpack = require('webpack');

module.exports = {

  taskName : taskName,

  js: {
    src: src + '/jsx/**/*.jsx',
    dest: dest + '/assets/js',
    uglify: false
  },

  sass: {
    src: src + '/sass/**/!(_)*.sass',
    dest: dest + '/assets/css',
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    minify: true
  },

  jade: {
    src: src + '/jade/**/!(_)*.jade',
    dest: dest + '/html',
    options: {pretty: false}
  },

  copy: {
    src: src + '/assets/**/*',
    dest: dest + '/assets'
  },

  webpack: {
    entry: src + '/jsx/' + fileName,
    output: {
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      modulesDirectories: ['node_modules', 'bower_components'],
      alias: {
      }
    },
    devtool: 'source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])
      ),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.ProvidePlugin({
          jQuery: 'jquery',
          jquery: 'jquery',
          $: 'jquery'
      })
    ],
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react']
          }
        }
      ]
    }
  }
}
