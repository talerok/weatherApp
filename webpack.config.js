var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('webpack-parallel-uglify-plugin'); // плагин минимизации

module.exports = {
    entry: {
        'app': './src/main.ts'
      },
   output:{
       path: path.resolve(__dirname, './public'),    
       publicPath: '/public/',
       filename: "[name].js"       
   },
   resolve: {
    extensions: ['.ts', '.js']
  },
   module:{
       rules:[   
           {
               test: /\.ts$/, 
               use: [{
					loader: 'awesome-typescript-loader',
					options: { configFileName: path.resolve(__dirname, 'tsconfig.json') }
               }, 
					'angular2-template-loader'
			   ]
               
            },
			{
               test: /\.html$/, 
               use: {
					loader: 'raw-loader',
               } 
               
            },
			{
               test: /\.less$/, 
               use: [{
					loader: 'raw-loader' 
				}, {
					loader: 'less-loader' 
				}]
            }
       ]
   },
   plugins: [
    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core/,
        path.resolve(__dirname, 'src'), 
      {} 
    ),
	new webpack.DllReferencePlugin({
	   context: '.',
	   manifest: require('./src/vendor/dll/vendor-manifest.json'),
	   name: 'vendor.js'
    }),
    new UglifyJSPlugin({
		uglifyJS: {
      }	
	}),
  ]
}