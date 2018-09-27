var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		vendor: ['./src/vendor/vendor.js'],
	},
 
   output: {
       filename: '[name].bundle.js',
       path: __dirname + '/src/vendor/dll/',
       library: '[name]_lib'
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
               
            }
       ]
   },
   plugins: [
       new webpack.DllPlugin({
           path: __dirname +'/src/vendor/dll/[name]-manifest.json',
           name: '[name]_lib'
       })
   ]
};