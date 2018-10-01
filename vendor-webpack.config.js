var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		vendor: ['core-js/es6',
				'core-js/es7/reflect',
				'zone.js/dist/zone',
				'@angular/common',
				'@angular/core',
				'@angular/forms',
				'@angular/platform-browser',
				'@angular/platform-browser-dynamic',
				'@angular/router',
				'core-js',
				'rxjs',
                'zone.js']
	},
 
   output: {
       filename: '[name].bundle.js',
       path: __dirname + '/src/vendor/dll/',
       library: '[name]'
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
           name: '[name]'
       })
   ]
};