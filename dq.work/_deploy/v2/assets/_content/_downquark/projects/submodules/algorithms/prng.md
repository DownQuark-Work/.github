«««
METADATA: document metadata
Title: PRNG
Author: @mlnck
created: 1701160633780
edited: 1701160633780
category: DEVELOPMENT
»»»
<hgroup>
  <h1>PRNG</h1>
  <h2>an algorithmic submodule</h2>
</hgroup>

Browse the <a href="https://github.com/DownQuark-Work/downquark.ventureCore.SubatomicModules/tree/main/_dq/algorithms/procedural-generation/prng" target="_blank">repository</a>.

### why:

Repeatable Randomness.

For most things dealing with Procedural Generation there is a desire for the result to appear to have random elements throughout. While using actual `Math.random` functions would be much more straightforward it comes with a price in the fact that once used, you would be hard pressed to recreate the exact generation. A difficulty that grows with the complexity and length of the randomized token you are using.

A <mark>PRNG</mark>, or _Pseudo Random Number Generator_, has more overhead than using the browser's native methods, but allows for complex tokens (that seem genuinely randomized) to be recreated simply, and as many times as required.

Our <a href="https://github.com/DownQuark-Work/downquark.ventureCore.KnowledgeBase/tree/main/src/Generation">pre-existing generative scripts</a> has a previous version of this feature , but shows a multitude of implementations.

### what:

Obscure Obfuscation.

Many libraries and packages exist and are free for the taking. So what made <mark>DownQuark</mark> decide to create our own?

_Bloat_.

There are cases when a PRNG is required to be much more randomized than the algorithm being used in this implementation. To achieve that level of randomness requires extra resources, code, and development time. If you factor into account that most packages contain multiple alogorithms to choose from then the size of the package begins to grow exponentially.

If your project requires that level of complexity then please, look elsewhere.

For <mark>DownQuark</mark> ~100 lines of code gives us more than we need.

### how:

Simply CLI

Nothing more is required than to run the script with a single argument specifying the minimum length of the generated seed.
```
% deno run prng.seed.ts 75
# 1015134252017141005032262017149750342...
## 83 characters

% deno run prng.seed.ts 100
# 9751342520161597503325201714974934252017141025199900...
## 102 characters
```

Specifying a seed value, or customizing teh algorithm used is also supported.
```
% deno run prng.seed.ts 200 --seed 13
% deno run prng.seed.ts 200 --seed 13 --v3b 13,42
```

### when:

Use this submodule anytime there is a need for a customizable, controllable, amount of output which appears to be random.
- Within our organization, most often this will be used in conjunction with the [seed submodule](/?projects_submodules_iterables_seed)

---

<dq_work-util-parse-markdown
  md="navigation"
  with-class="[ dq-work cube > block ][ post ][ table-selected > project-submodules ]" />
<hr><hr>

<footer>
  <h6>1342</h6>
</footer>