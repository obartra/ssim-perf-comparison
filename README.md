# SSIM.js Version Performance Comparison

Node script to compare performance between multiple SSIM.js versions. The list of versions used is set on `package.json:targetVersions` and analyzed using [Benchmark.js](https://benchmarkjs.com/) to determine statistical significance.

Performance tests compare SSIM.js output across versions for these two images:

| Reference Image     | Low Resolution Image |
|-------------------- | -------------------- |
| ![](assets/ref.gif) | ![](assets/low.gif)  |

Mean SSIM results are virtually the same between versions; with differences smaller than 1*10^-13 as the following table illustrates:

| Version | Mean SSIM             |
| ------- | --------------------- |
| 1.0.0   | 0.7111885755907164    |
| 2.0.0   | 0.7111885755907540    |

## Setup

If you want to validate the results on your machine install all required dependencies with:

```bash
$ npm install
```

Now you can run the performance benchmarks with `npm start`.

The output will look something like:

```bash
$ npm start

🏁 Running Perf tests...
  - SSIM @ 1.0.0 ✔️
  - SSIM @ 2.0.0 ✔️
  - SSIM @ 2.2.0 ✔️

All tests complete 🎉

  - SSIM @ 1.0.0: 2.44 ops/sec ±21% 🐌
  - SSIM @ 2.0.0: 2.94 ops/sec ±12% 🐌
  - SSIM @ 2.2.0: 37.72 ops/sec ±9% 🏍
```

To validate SSIM.js outputs across versions, run `npm run output`, which will generate:

```bash
$ npm run output

- SSIM @ 1.0.0: 0.7111885755907164
- SSIM @ 2.0.0: 0.711188575590754
- SSIM @ 2.2.0: 0.711188575590754
```
