const { join } = require('path');
const niv = require('npm-install-version');
const Benchmark = require('benchmark');
const { targetVersions } = require('../package.json');

const results = {};
const ssim = {};
const base = '../assets/';
const refPath = join(__dirname, base, 'ref.gif');
const lowPath = join(__dirname, base, 'low.gif');

targetVersions.forEach((version) => {
	ssim[version] = niv.require(`ssim.js@${version}`);
});

const suite = new Benchmark.Suite('ssim', {
	async: true,
	defer: true,
	onCycle({ target }) {
		console.log(`  - ${target.name} ✔️`);
		results[target.name] = {
			rme: Math.round(target.stats.rme),
			count: target.count,
			hz: target.hz.toFixed(2)
		};
	},
	onStart,
	onError,
	onComplete
});

targetVersions.forEach((version) => {
	suite.add(`SSIM @ ${version}`, {
		defer: true,
		fn(deferred) {
			ssim[version](refPath, lowPath).then(() => deferred.resolve());
		}
	});
});

suite.run({
	defer: true,
	async: true
});

function onStart() {
	console.log('🏁 Running Perf tests...');
}

function onError(err) {
	console.error('🤦', err);
}

function onComplete() {
	console.log('\nAll tests complete 🎉\n');
	const fastest = this.filter('fastest').map('name');
	const slowest = this.filter('slowest').map('name');

	Object.keys(results).forEach((name) => {
		const { rme, hz } = results[name];
		let icon = '';

		if (fastest.includes(name)) {
			icon = '🏍';
		} else if (slowest.includes(name)) {
			icon = '🐌';
		}
		console.log(`  - ${name}: ${hz} ops/sec ±${rme}% ${icon}`);
	});
	console.log('');
}
