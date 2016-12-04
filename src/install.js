const niv = require('npm-install-version');
const { targetVersions } = require('../package.json');

targetVersions.forEach((version) => {
	niv.install(`ssim.js@${version}`);
});
