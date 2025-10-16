«««
METADATA: document metadata
Title: n1 grid
Author: @mlnck
created: 1701160633780
edited: 1701160633780
category: DEVELOPMENT
»»»
<hgroup>
  <h1>n1 grid</h1>
  <h2>an iterable submodule</h2>
</hgroup>

Browse the <a href="https://github.com/DownQuark-Work/downquark.ventureCore.SubatomicModules/tree/develop/_dq/iterables/array" target="_blank">repository</a>.

### why:
Small Big O

The typical solution to creating a grid with `(x,y)` cooridinates is to nest one array within another. To even "_walk_" through the cells created this way requires looping through multiple arrays.

### what
Non-nested Arrays.

Our implementation creates a single array and abstracsts the complexity which is minimized when using nested loops into a convenient set of methods contained within  the submodule.

We have extended this functionality to allow the single level grid to "_contain_" nested grids of their own.

### how:
Flat Maths.

Create a new Grid
```
Grid.Create.Config({FILL_CHARACTER:'x'})
console.log('UtilsGrid.: ', Grid.Create.Initial(42,13))
/**
UtilsGrid.:  [
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x",
  ... 446 more items
]
*/
```

Query
```
console.log('Grid.Get.Position(): ', Grid.Get.Position())
console.log('Grid.Set.Position([13,10]): ', Grid.Set.Position([13,10]))
console.log('Grid.Set.Position(69): ', Grid.Set.Position(69))
console.log('Grid.Set.Position(85): ', Grid.Set.Position(85))
/**
Grid.Get.Position():  { _i: 0, _coord: [ 0, 0 ] }
Grid.Set.Position([13,10]):  {
  _i: 433,
  _coord: [ 13, 10 ],
  ADJACENT: {
    N: 391,
    E: 434,
    S: 475,
    W: 432,
    NE: 392,
    NW: 390,
    SE: 476,
    SW: 474
  }
}
Grid.Set.Position(69):  {
  _i: 69,
  _coord: [ 27, 1 ],
  ADJACENT: { N: 27, E: 70, S: 111, W: 68, NE: 28, NW: 26, SE: 112, SW: 110 }
}
Grid.Set.Position(85):  {
  _i: 85,
  _coord: [ 1, 2 ],
  ADJACENT: { N: 43, E: 86, S: 127, W: 84, NE: 44, NW: 42, SE: 128, SW: 126 }
}
*/
```
Navigate
```
console.log('Grid.Set.Position(GRID_DIRECTIONS.SE,2): ', Grid.Set.Position(GRID_DIRECTIONS.SE,2))
console.log('Grid.Set.Position(GRID_DIRECTIONS.S): ', Grid.Set.Position(GRID_DIRECTIONS.S))
console.log('Grid.Get.Position(): ', Grid.Get.Position())
/**
Grid.Set.Position(GRID_DIRECTIONS.SE,2):  {
  _i: 171,
  _coord: [ 3, 4 ],
  ADJACENT: {
    N: 129,
    E: 172,
    S: 213,
    W: 170,
    NE: 130,
    NW: 128,
    SE: 214,
    SW: 212
  }
}
Grid.Set.Position(GRID_DIRECTIONS.S):  {
  _i: 213,
  _coord: [ 3, 5 ],
  ADJACENT: {
    N: 171,
    E: 214,
    S: 255,
    W: 212,
    NE: 172,
    NW: 170,
    SE: 256,
    SW: 254
  }
}
Grid.Get.Position():  {
  _i: 213,
  _coord: [ 3, 5 ],
  ADJACENT: {
    N: 171,
    E: 214,
    S: 255,
    W: 212,
    NE: 172,
    NW: 170,
    SE: 256,
    SW: 254
  }
}
*/
```

Create Subgrids
```
console.log('Grid.Create.SubGrid([10,10],[13,12])): ', Grid.Create.SubGrid([10,10],[13,12]))
console.log('Grid.Create.SubGrid({X:13,Y:4},{X:18,Y:9})): ', Grid.Create.SubGrid({X:13,Y:4},{X:18,Y:9}))
console.log('Grid.Create.SubGrid(181,396)): ', Grid.Create.SubGrid(181,396))
/**
Grid.Create.SubGrid([10,10],[13,12])):  {
  subGridBoundaries: { index: [ 430, 517 ], coord: [ [ 10, 10 ], [ 13, 12 ] ] },
  subGridDimensions: { w: 4, h: 3 },
  subGridIndexes: [
    430, 431, 432, 433,
    472, 473, 474, 475,
    514, 515, 516, 517
  ],
  subGridPerimeter: {
    applied: [
      517, 516, 515, 514,
      475, 472, 433, 432,
      431, 430
    ],
    isolated: [
      11, 10, 9, 8, 7,
       4,  3, 2, 1, 0
    ]
  }
}
Grid.Create.SubGrid({X:13,Y:4},{X:18,Y:9})):  {
  subGridBoundaries: { index: [ 181, 396 ], coord: [ [ 13, 4 ], [ 18, 9 ] ] },
  subGridDimensions: { w: 6, h: 6 },
  subGridIndexes: [
    181, 182, 183, 184, 185, 186, 223,
    224, 225, 226, 227, 228, 265, 266,
    267, 268, 269, 270, 307, 308, 309,
    310, 311, 312, 349, 350, 351, 352,
    353, 354, 391, 392, 393, 394, 395,
    396
  ],
  subGridPerimeter: {
    applied: [
      396, 395, 394, 393, 392,
      391, 354, 349, 312, 307,
      270, 265, 228, 223, 186,
      185, 184, 183, 182, 181
    ],
    isolated: [
      35, 34, 33, 32, 31, 30, 29,
      24, 23, 18, 17, 12, 11,  6,
       5,  4,  3,  2,  1,  0
    ]
  }
}
Grid.Create.SubGrid(181,396)):  {
  subGridBoundaries: { index: [ 181, 396 ], coord: [ [ 13, 4 ], [ 18, 9 ] ] },
  subGridDimensions: { w: 6, h: 6 },
  subGridIndexes: [
    181, 182, 183, 184, 185, 186, 223,
    224, 225, 226, 227, 228, 265, 266,
    267, 268, 269, 270, 307, 308, 309,
    310, 311, 312, 349, 350, 351, 352,
    353, 354, 391, 392, 393, 394, 395,
    396
  ],
  subGridPerimeter: {
    applied: [
      396, 395, 394, 393, 392,
      391, 354, 349, 312, 307,
      270, 265, 228, 223, 186,
      185, 184, 183, 182, 181
    ],
    isolated: [
      35, 34, 33, 32, 31, 30, 29,
      24, 23, 18, 17, 12, 11,  6,
       5,  4,  3,  2,  1,  0
    ]
  }
}
*/
```

Get values
```
console.log('Grid Cells: ', Grid.Get.Cells())
console.log('Grid Perimeter: ', Grid.Get.Perimiter())
/**
Grid Cells:  [
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x", "x",
  "x", "x", "x", "x",
  ... 446 more items
]
Grid Perimeter:  [
  545, 544, 543, 542, 541, 540, 539, 538, 537, 536, 535, 534,
  533, 532, 531, 530, 529, 528, 527, 526, 525, 524, 523, 522,
  521, 520, 519, 518, 517, 516, 515, 514, 513, 512, 511, 510,
  509, 508, 507, 506, 505, 504, 503, 462, 461, 420, 419, 378,
  377, 336, 335, 294, 293, 252, 251, 210, 209, 168, 167, 126,
  125,  84,  83,  42,  41,  40,  39,  38,  37,  36,  35,  34,
   33,  32,  31,  30,  29,  28,  27,  26,  25,  24,  23,  22,
   21,  20,  19,  18,  17,  16,  15,  14,  13,  12,  11,  10,
    9,   8,   7,   6,
  ... 6 more items
]
*/
```

Set values
```
Grid.Set.Cells({location:[6,9],value:['aBc',[1,2,3]]})
Grid.Set.Cells({location:[[3,3]],value:'xyz'})
Grid.Set.Cells({location:[[3,3],[4,3],[1,1]],value:[' 1  ',' 1  ',' 1  ']})
Grid.Set.Cells({location:[{X:3,Y:3},{X:2,Y:3},{X:1,Y:1}],value:['  1 ',' 2  ',' 3  ']})
```

View Grid: `console.log('Grid.Render(): ', Grid.Render())`
```
xxxxxxaBcxx1,2,3xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
x 3  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xx 2    1  1  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
### when:
Use this when you would typically create a multi-dimensional array.

> See this in action with the _procedurally generated_ [sidewinder](/?projects_submodules_algorithms_maze_sidewinder) maze below.

---
<dq_work-util-parse-markdown
  md="navigation"
  with-class="[ dq-work cube > block ][ post ][ table-selected > project-submodules ]" />
<hr><hr>

<footer>
  <h6>flattened dimensions</h6>
</footer>