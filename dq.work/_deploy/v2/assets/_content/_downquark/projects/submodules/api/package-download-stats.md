«««
METADATA: document metadata
Title: download stats
Author: @mlnck
created: 1701160633780
edited: 1701160633780
category: DEVELOPMENT
»»»
<hgroup>
  <h1>download stats</h1>
  <h2>an npm submodule</h2>
</hgroup>

Browse the <a href="https://github.com/DownQuark-Work/downquark.ventureCore.SubatomicModules/tree/main/_dq/_run/npm.stats-package.ts" target="_blank">repository</a>.

### why:
Historical Accumulation.

While <a href="https://www.npmjs.com" target="_blank">npmjs</a> allows you to view the download stats concerning a specific package they place limits on how many records they will retrieve and the duration span they will search.

### what:
Far and Wide.

This script allows you to retrieve the total amount of times a package has been downloaded using any starting date.

The results are then returned indexed by both the dates and amount of downloads that occured.

### how:
An Asynchronous Generator.

Using the <a href="https://www.npmjs.com/package/chalk" target="_blank">chalk</a> package:
```
deno run --allow-net api/npm.ts --pkg chalk -- pkgStatsDownloaded
/**
  _pkg: "chalk",
  _totalDownloads: 32430858677,
  range: [ "2013-08-03", "2023-12-12" ],
  daysDownloaded: 3206
*/
```

Using the <a href="https://www.npmjs.com/package/qonsole" target="_blank">qonsole</a> package:
```
  _pkg: "qonsole",
  _totalDownloads: 3878,
  range: [ "2017-09-12", "2023-12-12" ],
  daysDownloaded: 939
```
We can also see that it was most downloaded on May 15, 2019 with 279 instances being recorded
```
"279": [ "2019-05-15" ]
```

### when:
Run this script when you whish to know how many times an npm package has been downloaded from a specific point in time.

---
<dq_work-util-parse-markdown
  md="navigation"
  with-class="[ dq-work cube > block ][ post ][ table-selected > project-submodules ]" />
<hr><hr>

<footer>
  <h6>aggregates ftw</h6>
</footer>