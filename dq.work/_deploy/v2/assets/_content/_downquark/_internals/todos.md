«««
METADATA: nested page metadata
Title: Todo Internal
Author: @mlnck
created: 1694997815134
edited: 1694997815134
»»»

<details><summary>todos</summary>

Bring ~~It~~ 'Em Out of Archival
> Only much, much better

## (G|T)UI

_**AND**_

### Sub-Module FlatND
> Flat n-dimension(s)
> > FINALLY FOUND A FITTING NAME FOR IT!!!

This time though:a
> we make it _**∞**_

Inspired by:
```text
This is a really cool idea:
- https://cate.cero-ai.com/

May steal it and rebuild in Tauri or some shit.

Because why the fuck would you choose electron?!:
- https://github.com/0-AI-UG/cate/blob/25107706c02d76e28f74415abc6da76662310350/package.json#L85
```
We make it like
- _Miro_ / _Eraser_ / etc.
  - infinitely scrollable
- _Warp_
  - as many windows as you want
  - all nice and grouped/organized however you see fit

**BUT**; we do it _WITHOUT_ electron!
> boom!

We keep everything that is rendered in a _**single**_ terminal window.
- more efficient than anything else
- no excess overhead
  - should be doable using only ~~python/ .cs~~ `.rs`
    - _**DECISION MADE**_ using `.rs`
-  _**OK - MAYBE DECISION NOT MADE**_ -- just for initial development speed `.py` _MAY_ be the best bet
  - And probably will be
  - But the `.rs` examples below are much better for solid references than curses/etc. (you|we)'ll figure it out.
    - _**SEE :: **_[\(g|t\)ui brainrain](./brainrain.gtui.md) for full reasoning
      - not as efficient as a bash only project
      - but better than electron (or even tauri for that matter)
      - and probably on par with vanila rust (if not slightly better)


### -> -> [READ THIS FIRST](./brainrain.gtui.application.md) <- <-
> _**It took me a bit to articulate what problem this solves.**_

The above header link explains it.
- the below are still valid points
- the above just gives context to why you would want the below to be balid points.


### ↓ Implementation ideation follows ↓

1. to begin with
  - there will be no `GUI`
    - _only_ a `TOML` file that will be parsed to control
      - layout
      - titles
      - content
        - etc
1. how?
  - all _windows_, _views_, _scrollables_, _screens_, _whatever-the-hell-we-calls-them_ will be "snap-shotted" into a static file on whenever the view is
    - moved/scrolled/updated/whatever
  - we will have to figure this out, will probably be an overlapping tile-like system
    - coordinates will be defined by what is present in the `TOML`
  - we will also need to figure out the navigation (and UI for it)
    - how to:
      - switch window groups
      - switch tabs in window groups
      - navigate the infinite scroll area
        - etc
    - but again, that's a no-biggie thing
1. why? :: (here's where it gets cool)
  - access to _all_ native functions
    - bash/zsh/fish/whatever-shell-user-using
    - user does not have to learn anything new
    - user does not have to jump through any hoops because the shell wrapper doesn't support a native command / or intercepts it / etc
  - (on command) threads; not processes
    - each new window/view/group/etc can:
      - have its own thread if desired (defined in the `TOML`)
      - share a thread with other windows/views/groups/etc
        - I'd tentatively make this the default, only create a new thread if the `TOML` specifies one
    - regardless, the thread can be spun up/disposed of as needed without losing any state
      - a process would have to persist:
        - across sessions
        - in memory
        - in the language of an external wrapper
      - the thread _DOES NOT_
        - spin it up
        - get the information
        - handle the information
        - sayonara thready-boy
  - ability to _scope_ variables
    - global access to all previously defined (base) variables automatically exist
      - it's a native shell:
        - `echo $PATH` in any window/view/scrollable/group/etc will work like it always has
      - then each variable defined within a given scope
        - variables can be defined
          - statically through the `TOML` or
          - dynamically at runtime using flags defined in the `TOML`
            - TODO: figure out a way to make it dynamic after runtime without the flags
        - these variables will just have a (pre|suf)fix added to them as the script runs
        - these variables can be persistent or ephemeral
          - when views/change &&|| scrollables occur
            - persistent scoped variables are stored in the snapshot files
            - ephemeral scoped variables are not stored in the `TOML` and are lost
    - by default:
      - `SCROLLABLE` variables are persistent
      - `WINDOW_GROUP` variables are persistent _only_ to the windows inside the group
      - `WINDOW` variables are persistent _only_ to the window tabs they contain
      - `WINDOW_TAB` variables are ephemeral and available only to the window tab they are defined in
        - _ALL_ of the above can be overridden if specified in the `TOML`
3. after the completion of the `TUI` above
  - then we can wrap a `GUI`
    - but it'll be strictly `Rust`, `tauri`, or `WASM`
    - just a shell that will create the `TOML` file that is referenced by the `TUI`

---

## Then:

### complete:

#### for `alpha launch`
1. blogs post should be queried
1. [gh-readme](https://dev.to/jacktt/creating-dynamic-readmemd-file-388o) should be dynamic
1. page content

##### _nice-to-haves_
1. real url rewrites
1. integrated forum posts
1. filter nuances
1. timeline tiles fade in as offset to top
  - use css "_proc-gen_" for timing, and opacity?

#### for `0.1.0-alpha`
1. statically create <input type="checkbox" checked="checked" disabled /> blog
1. <input type="checkbox" checked="checked" disabled /> make tiles work
1. <input type="checkbox" checked="checked" disabled />make filter work
1. <input type="checkbox" checked="checked" disabled />add 1st level of animation
1. <input type="checkbox" disabled />complete landing page content creation
  - refactor content to multiple pages
1. <input type="checkbox" checked="checked" disabled /> make routing - decide between
  1. <input type="checkbox" checked="checked" disabled />hash url &amp; target

#### after launch

1. convert blog and forum links to become dynamic
1. create dynamic internal pages as well (automatic link creation for `.md` files)
1. forum links (phase 2)
1. rewrite url
    - the most desirable
    - should not be too difficult after implementation of the above
</details>
