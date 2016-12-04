const { join } = require('path');
const niv = require('npm-install-version');
const { targetVersions } = require('../package.json');

const ssim = {};
const results = {};
const base = '../assets/';
const refPath = join(__dirname, base, 'ref.gif');
const lowPath = join(__dirname, base, 'low.gif');

targetVersions.forEach((version) => {
	ssim[version] = niv.require(`ssim.js@${version}`);
});

targetVersions
	.reduce((p, version) =>
		p.then(() =>
			ssim[version](refPath, lowPath).then(({ mssim }) => {
				results[version] = mssim;
			})
		)
	, Promise.resolve())
	.then(() => {
		Object.keys(results).forEach((version) => {
			console.log(`- SSIM @ ${version}: ${results[version]}`);
		});
		console.log('');
	});
