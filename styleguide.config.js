const loaders = require('loaders');


module.exports = {
	components: 'src/index.js',
	defaultExample: true,
	webpackConfig: {
		module: {
			loaders: loaders.all,
		},
	},
	showCode: false,
	showSidebar: false,
	styleguideDir: 'public',
};
