«««
METADATA: document metadata
Title: dq.work
Author: @mlnck
created: 1701160645786
edited: 1701160645786
»»»
<hgroup>
  <h1>downquark.work</h1>
  <h2>the site</h2>
</hgroup>

Perpetually in flux.

This website can be thoughtt of as an ever changing, constantly adapting, _Prototype In Progress_.
It was created to be a dynamic platform that could support showcasing multiple future products of <mark>_**DownQuark**_.</mark>

It prioritizes fluidity and adaptability, over typings; quickly creating static content takes precedence over minimization and uglification.

Although only <a href="https://qrx.downquark.work/qore/build-less-island-making-the-right-choice">briefly mentioned</a> on our blog, the decision was not made on a whim. A key factor in the decision is that we will be required to make rapid adjustments to showcase new product launches efficiently. 

We chose the shortest route to help remove the potential of creating incidental bottlenecks.
We simply omitted those aspects. Which at this point is typing and testing.

Testing may not be applied to this static website but rest assured all products and deliverables will be thouroughly validated and can assist in shoring up any shortcomings.

With typescript off the table that left an opening to violate most everything that has become standard over the past few years.

There's no way that opportunity was going to be missed.

### a native embrace

_**DownQuark.work**_ &nbsp;went buildless

There is no <mark>package.json</mark>, no need for `yarn` or `npm`.
This site has no code that is being compiled, no code that is even being transpiled.

Utilizing the current state of <mark>native</mark> web technologies has resulted in:
- Using only `css` for styling while applying `sass` like features such as: 
  - importing and consolidating multiple files
  - writing nested selectors
- Incorporating the <mark>importmap</mark> script type allowed for:
  - webcomponents using <a href="lit.dev" target="_blank">lit</a>
  - extendable directive libraries to create additional functionality within the webcomponents

We will continue to monitor the site's behavior as more products are created, and more integrations are applied.

#### enhancements
website pipelime
 
 Follow the link to to view the [_task list_](?about_website-tasks) for DownQuark.work

---

<dq_work-util-parse-markdown
  md="navigation"
  with-class="[ dq-work cube > block ][ post ][ table-selected > default ]" />
  <hr><hr>

<footer>
  <h6>buildless build</h6>
</footer>