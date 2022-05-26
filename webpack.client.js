const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const LoadablePlugin = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default

const devMode = process.env.NODE_ENV !== 'production'
const hotMiddlewareScript = `webpack-hot-middleware/client?name=web&path=/__webpack_hmr&timeout=20000&reload=true`
// const styledComponentsTransformer = createStyledComponentsTransformer()

const getEntryPoint = (target) => {
  if (target === 'node') {
    return ['./src/routes/index.tsx']
  }
  return devMode ? [hotMiddlewareScript, './src/index.tsx'] : ['./src/index.tsx']
}

const getConfig = (target) => ({
  mode: devMode ? 'development' : 'production',

  name: target,

  target,

  entry: getEntryPoint(target),

  output: {
    path: path.resolve(__dirname, `dist/${target}`),
    filename: '[name].js',
    publicPath: '/web/',
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },

      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      assets: path.resolve('src/assets/'),
      components: path.resolve('src/components/'),
      hooks: path.resolve('src/hooks/'),
      routes: path.resolve('src/routes/'),
      states: path.resolve('src/states'),
      styles: path.resolve('src/styles/'),
      types: path.resolve('src/types/'),
      utils: path.resolve('src/utils/'),
    },
  },

  plugins:
    target === 'web'
      ? [new LoadablePlugin(), new webpack.HotModuleReplacementPlugin(), new MiniCssExtractPlugin()]
      : [new LoadablePlugin(), new MiniCssExtractPlugin()],

  externals: target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
})

module.exports = [getConfig('web'), getConfig('node')]
