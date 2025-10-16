«««
METADATA: document metadata
Title: Design Systems
Author: @mlnck
created: 1701160633786
edited: 1701160633786
category: DESIGN
»»»
<hgroup>
  <h1>Design System</h1>
  <h2>namespaced hierarchy</h2>
</hgroup>

Scalable <mark>User Interface</mark> integrations.

In order to continue fast paced development on multiple projects across a broad spectrum of applications DownQuark has adapted high-level layouts and reusable <mark>Style Guides</mark>. To help counter the the potential confusion inherit with using this approach we have developed a <mark>Design System</mark> that inherits namespaces and can be customized for each individual project.

<small style="display:block;text-align:right">(more information can be found after the inheritence map)</small>

### inheritence map
A visual representation.

Each indentation on the tree shown below extends their parent. This makes it possible for the core, _classless_ styles to be applied as the base to _all_ of the subsequent namespaces.
In other words, each subsequent **Design System** can seamlessly leverage _all_ of the styles defined above it.

<details style="text-wrap:balance"><summary>namespace synopsis</summary>

<mark>downquark</mark>
_A style guide of unparalleled simplicity._
Its captivating styles and fundamental design tokens create the base design across the entirety of our products.

<mark>dq</mark>
_From style guide to design system_
At this level classes are created that embrace the concepts (and syntax) behind _CUBE_ and _SMOL CSS_ methodologies.
<small style="display:inline-block;margin-left:1rem">We refrain from creating new _tokens_ and instead apply those which have been pre-defined to the newly created classes. This helps ensure the cascade of the **downquark** namespace.</small>


<mark>dq-work</mark>
_A precise and focused namespace._
This extends the styles defined within the **dq** namespace.
Creating custom tailored classes and tokens to be applied to the **downquark.work** website.
<small style="display:inline-block;margin-left:1rem">Currently, this is not meant ot be extended or inherited further.</small>

</details>

Each link in the tree below will direct you to the individual styles which have been defined for that level of the hierarchy.

<small>Click on any active namespace to view the <mark>Design System</mark></small>
<pre style="margin-top:-1rem">
  <a href="/html/builds/qurrent/downquark-design-system/namespace/downquark/" target="_blank">[downquark]</a>
  │├──about our namespaced concept
  │├─<a href="/html/builds/qomplete/classless-css/" target="_blank">classless styles</a>
  │├─<a href="/html/builds/qomplete/classless-css/design-system-shell.html" target="_blank">drop-in css</a>
  │└─<a href="/html/builds/qurrent/downquark-design-system/namespace/downquark/tokens/quark.html" target="_blank">non-abstracted design tokens</a>
  │
  └──<a href="/html/builds/qurrent/downquark-design-system/namespace/dq/" target="_blank">[dq]</a>
      │└──high level layout and composition
      │
      ├─┬<a href="/html/builds/qurrent/downquark-design-system/namespace/dq/work/" target="_blank">[work]</a>
      │ └<a href="/html/builds/qurrent/downquark-design-system/namespace/dq/work/tokens.html" target="_blank">[tokens]</a>
      │   └──used on `downquark.work` content website
      │
      └──*upcoming
</pre>
<small style="display:block;text-align:right">names inside <code>[</code>square brackets<code>]</code> depict completed work
<br/>names inside <code>(</code>parenthesis<code>)</code> depict work currently in development</small>

### Definitions
Are **Style Guides** and **Design Systems** different?

By working together the above concepts ensure that the project not only looks good but also functions seamlessly, contributing to the overall experience for all users.

However, each aspect has their own, unique, set of responsibilities.

#### Style Guide
Defines the rules and outlines the vision.

It informs you of such things as the color scheme, the type faces and sizes to use, and how to align the text depending on what part of the page it is on. It's a set of guidelines that ensure a consistent look and feel throughout the application.

#### Design System
Applies the rules and outlines to actual components.

This takes the abstract ideas from the style guide and turns them into tangible, ready-to-use components. It's a more practical and hands-on approach, giving you the building blocks to create consistent and beautiful pages, screens, and other visual elements.

### Documentation
Our initial thoughts.

These links are outdated, but included to give more insight into how the architecture was originally concepted:
- <a href="/html/builds/qurrent/downquark-design-system/" target="_blank">about the design system</a>
- <a href="//qrx.downquark.work/qore/namespace-dq-reusable-high-level-styling" target="_blank">initial blog mention</a>
- <a href="//qrx.downquark.work/qore/an-unofficial-release" target="_blank">follow-up blog mention</a>

---

We always attempt to update the status of projects as they proceed through our development process.

<dq_work-util-parse-markdown
  md="navigation"
  with-class="[ dq-work cube > block ][ post ][ table-selected > default ]" />
  <hr><hr>

<footer>
  <h6>develop the experience</h6>
</footer>