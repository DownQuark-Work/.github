«««
METADATA: document metadata
Title: DevQon
Author: @mlnck
created: 1702795619518
edited: 1702795619518
category: FOSS
»»»
<hgroup>
  <h1>DevQon</h1>
  <h2>the missing link</h2>
</hgroup>

DownQuark's Singularity.

Let's face facts. <mark>DownQuark</mark> has an approach that almost encourages things to get out of hand. And probably pretty quickly.
We need a way to keep track of all of the moving pieces.
But more importantly, we _must_ be able to effortlessly navigate the sprawl we have intentionally created.

It will be imperative that we can go from documenting an archived feature, to creating a new design for a stealth project, and then tackle that bug that popped up at the end of the day because the front nonce key being sent by the frontend was causing a failure with the CQRS aggregated write database.

... okay, so that is a bit extreme, but hopefully it gets the point across.
Shortened from <mark>Developer Qonsole</mark> _**DevQon**_ aims to do just that.

### solution thievery
The solution came when browsing other open source software. Spinning up projects that looked interesting, we eventually hit upon [dashy](//www.dashy.to).

While the problem that Dashy solves is only slightly related to the one <mark>DownQuark</mark> faced, the idea and execution of their solution made it a hard product to forget about.

As <mark>DownQuark</mark> was able to more fully define the issues that wished to solve, the more we realized that Dashy's solution would be perfect for us.
We only required a full code rewrite from the ground up.

Follow this rewrite at  [github](https://github.com/DownQuark-Work/downquark.applicationFoss.DevQon) repository.

### what the diff?
If it's so similar, why the overhaul?

The answer is simple. Dashy is created to monitor previously deployed, currently active applications.
While <mark>DownQuark</mark> is focused on code that may only be allowed to be on a users local filesystem.

Theirs looks out, ours looks in.

### what's next
Qanban integration

Our [Qanban Board](/?projects_active_foss_qanban) <mark>FOSS</mark> project was the second part of the solution.
We plan to make that the first installed _**Implementation**_ for the <mark>DevQon</mark> platform.

Stay up to date with all progress by viewing the [repo](https://github.com/DownQuark-Work/downquark.applicationFoss.QanbanBoard).
Well, at least it's the current way to stay up with all people of the class.

---

We always attempt to update the status of projects as they proceed through our development process. But we make no guarantees. In this instance please refer to the form link above for the most accurate information.

<dq_work-util-parse-markdown
  md="navigation"
  with-class="[ dq-work cube > block ][ post ][ table-selected > project-foss ]" />
<hr/><hr/>

<footer>
  <h6>downquark devqon -> dqdq</h6>
</footer>