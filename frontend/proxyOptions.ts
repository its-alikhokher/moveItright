// Default configuration
let webserver_port = 8000;

// Try to load sites configuration if available
try {
	const path = require('path');
	const fs = require('fs');
	const configPath = path.resolve(__dirname, '../../../sites/common_site_config.json');

	if (fs.existsSync(configPath)) {
		const common_site_config = require(configPath);
		webserver_port = common_site_config.webserver_port || 8000;
	}
} catch (error) {
	// Use default port if config loading fails
	console.warn('Using default port 8000 for proxy configuration');
}

export default {
	'^/(app|api|assets|files|private)': {
		target: `http://127.0.0.1:${webserver_port}`,
		ws: true,
		router: function(req) {
			const site_name = req.headers.host.split(':')[0];
			return `http://${site_name}:${webserver_port}`;
		}
	}
};
