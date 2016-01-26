var taskName = 'index';
var fileName = taskName + '.jsx';

var dest = './www';
var src = './src';

var webpack = require('webpack');

module.exports = {

  taskName : taskName,

  js: {
    src: src + '/jsx/**/*.jsx',
    dest: dest + '/assets/js',
    uglify: true
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
