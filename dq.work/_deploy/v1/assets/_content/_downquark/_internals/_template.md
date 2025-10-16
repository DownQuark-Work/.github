«««
METADATA: document metadata
Title: TheTemplate
Author: @mlnck
created: 1701160633786
edited: 1701160633786
category: TEMPLATE
»»»
<hgroup>
  <h1>page heading</h1>
  <h2>page sub-heading</h2>
</hgroup>

First letter of first sentence has decoration

Above should be short. This can be longer.

### main content header
First letter of first sentence has decoration

Above should be short. This can be longer.

The below (starting at `---` and ending at the closing _footer_ tag) should be left as-is.
The caveat is that the `table-selected-default` can currently be updated to accept:
&nbsp;&nbsp;&nbsp;&nbsp; - `table-selected-project-foss`
&nbsp;&nbsp; - The options will increase as more menus (_stealth_, _submodules_, _archived_, etc) become available.
> NOTE: remember to update `./_template.md` for each _new_ menu type
---

<dq_work-util-parse-markdown
  md="navigation"
  with-class="[ dq-work cube > block ][ post ][ table-selected > default ]" />
<hr><hr>

<footer>
  <h6>qlever footer qontent</h6>
</footer>