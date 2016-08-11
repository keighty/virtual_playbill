module.exports = {
  entry: './src/main.js',
  output: {
    path: './public/javascripts',
    filename: 'bundled.js',
  },
  devServer: {
    inline: true,
    contentBase: './src',
    port: 8100,
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
}
