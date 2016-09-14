import config from '../../config/config';
import cssModulesHook from 'css-modules-require-hook';
import path from 'path';
import sass from 'node-sass';

// Make sure we can render css-modules on the server side
cssModulesHook({
	extensions: ['.scss', '.css'],
	generateScopedName: config.cssModulesScopedName,
	preprocessCss: (css, filename) => {
		return sass.renderSync({
			data: css,
			file: filename,
			// includePaths: [path.resolve(__dirname, '../client/scss')]
		})
			.css
			.toString('utf8');
	},
	rootDir: path.join(__dirname, '../.././')
});

require('./server.js');
