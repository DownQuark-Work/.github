«««
METADATA: document metadata
Title: Seederator
Author: @mlnck
created: 1701160633780
edited: 1701160633780
category: DEVELOPMENT
»»»
<hgroup>
  <h1>seederator</h1>
  <h2>an iterable submodule</h2>
</hgroup>

Browse the <a href="https://github.com/DownQuark-Work/downquark.ventureCore.SubatomicModules/tree/develop/_dq/iterables/seed" target="_blank">repository</a>.


### why:
Algorithmic Automation.

When creating _Procedurally Generated_ content you are almost guaranteed to have random (or _pseudo-random_) values apply various behaviors while the code is executing. These behaviors could consist of anything from choosing a direction, to defining floating point values to be used in a three dimensional coordinate system; from returning a single boolean to populating a full length markovian narrative; or anything else a developer can dream up.

As complexity increases the ability to manage, iterate, and parse correct return values can become cumbersome. This utility is acts as a helper when addressing those issues.

### what:
Invisible Iteration.

Once instantiated <mark>Seederator's</mark> methods can be called without worry about whether or not it will interface with your current project. The logic applied interacts solely with the randomized string value, and a _primitive value_ is returned.

Although each project is unique, this utility leverages the underlying commanalities to allow for a cleaner codebase and easier develoment cycle.

### how:
Results with a Grain of Salt

Simply register one or more named pointers:
`const curPointer = Pointer.registerSeedPointer('_BASE_SEED_POINTER')`
And you can instantly see the results:
`console.log('curPointer: ', curPointer)`
```
/*
curPointer:  {
  autoAdvance: true,
  indx: 0,
  name: "_BASE_SEED_POINTER",
  seedIndex: [Getter/Setter],
  _seedIndex: 13
}
*/
```

When `autoAdvance` is `true` the following code is applied:
```
Object.defineProperty(seedPointer, 'seedIndex',{set(indx) { this._seedIndex = indx }})
  Object.defineProperty(seedPointer, 'seedIndex',{get()
    { if(this.autoAdvance) this._seedIndex += 1; return this._seedIndex }})

  seedPointersIndexMap.push({pointerName})
  SeedPointersMap.set((seedPointersIndexMap.at(-1) as {pointerName:string}), seedPointer)
  
  registerAsCurrentPointer &&
    Parse.setCurrentPointer((seedPointer as SeedPointerType))
  return SeedPointersMap.get(seedPointersIndexMap.at(-1) as {pointerName:string})
}
```
The above allows the pointer to be incremented each time it is accessed. By simply logging the current position, the index has updated.
```
console.log('curPointer.seedIndex: ', curPointer.seedIndex)
console.log('curPointer.seedIndex: ', curPointer.seedIndex)
console.log('curPointer.seedIndex: ', curPointer.seedIndex)
console.log('Pp>',Parser.parseSeedAtPos())
console.log('Pp>',Parser.parseSeedAtPos())
console.log('curPointer.seedIndex: ', curPointer.seedIndex)
/**
curPointer.seedIndex:  14
curPointer.seedIndex:  15
curPointer.seedIndex:  16
Pp> 5
Pp> 0
curPointer.seedIndex:  19
*/
```

We can also retrieve a variety of values based which is determined by the seeded string.
```
console.log('opt selection: ',Parser.parseOptionWithSeedValue(['a','b','c','d','e','f','g']))
console.log('opt selection: ',Parser.parseOptionWithSeedValue({RANGE:[13,42]}))
console.log('opt selection: ',Parser.parseOptionWithSeedValue('BOOL'))
console.log('opt selection: ',Parser.parseOptionWithSeedValue('DIR'))
/**
opt selection:  e
opt selection:  27
opt selection:  true
opt selection:  NORTH
*/
```

### when:
Use this submodule when you wish to have the ability to effortlessly iterate over a string of numbers.

If the `auto-increment` option is set to `true` this iterator will automatically use the current iteration value as as key when applying conditional logic.

Note: If using the [PRNG Utility](/?projects_submodules_algorithms_prng) <mark>Seederator</mark> is ready to run right out of the box.

---
<dq_work-util-parse-markdown
  md="navigation"
  with-class="[ dq-work cube > block ][ post ][ table-selected > project-submodules ]" />
<hr><hr>

<footer>
  <h6>the mightiest oak</h6>
</footer>