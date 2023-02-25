const bundlePath = '../dist/server/entry-server.js';

import(bundlePath).then((pkg) => {
	console.log(pkg.render);

	console.log(pkg.render());
});
