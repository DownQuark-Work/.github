«««
METADATA: document metadata
Title: Technical
Author: @mlnck
created: 1701160633786
edited: 1701160633786
note: INTEGRATE THIS: https://tina.io/ -- still needs to be auto-published to blog though
»»»
<hgroup>
  <h1>tasks</h1>
  <h2>downquark.work</h2>
</hgroup>

Following is a list of the enhancements planned for <mark>downquark.work</mark>

#### out of alpha
Complete the items, remove the suffix.

The remaining items center around making updates regarding storing and displaying content. Currently, everything is statically created as needed. The content is unordered, stored accross several static files, and in many instances, they are at least partially duplicated.
<section style="display:flex; justify-content:space-evenly">
  <ul id="visuals" class="list list--bare"> <!-- enable checkboxes with: `checked="checked"` -->
    <li><label for="v1"><input id="v1" name="checkbox" type="checkbox" disabled> Update <a href="https://www.khroma.co/generator" target="_blank">color pallet</a> </label></li>
    <li><label for="v2"><input id="v2" name="checkbox" type="checkbox" disabled> add image support </label></li>
  </ul>
  <ul id="content-management" class="list list--bare"> <!-- enable checkboxes with: `checked="checked"` -->
    <li><label for="cm1"><input id="cm1" name="checkbox" type="checkbox" disabled> Implement Local CMS  </label></li> <a href="https://tina.io/docs/" target="_blank">tina?</a>
    <ul class="list list--bare">
      <li><label for="cm3"><input id="cm3" name="checkbox" type="checkbox" disabled> Determine CMS </label></li>
      <li><label for="cm4"><input id="cm4" name="checkbox" type="checkbox" disabled> Integrate BE db </label></li>
      <li><label for="cm5"><input id="cm5" name="checkbox" type="checkbox" disabled> Integrate FE  with site </label></li>
    </ul>
  </ul>

  <ul id="dry-content" class="list list--bare" style="display:inline"> <!-- enable checkboxes with: `checked="checked"` -->
    <li><label for="dc1"><input id="dc1" name="checkbox" type="checkbox" disabled> Dynamic Sidebar Tiling </label></li>
    <ul class="list list--bare">
      <li><label for="dc3"><input id="dc3" name="checkbox" type="checkbox" disabled> Query Social Databases </label></li>
      <li><label for="dc4"><input id="dc4" name="checkbox" type="checkbox" disabled> Query Local CMS </label></li>
      <li><label for="dc5"><input id="dc5" name="checkbox" type="checkbox" disabled> Output JSON file </label></li>
    </ul>
  </ul>
</section>

Completing the above will _officially_ allow the removal of the `-alpha` from this site's release versoin.

#### roadmap
Check back often

This area will be updated as additional enhancements are concepted.

<!-- Display when complete
<a href="https://s.icepanel.io/zjLjAbxB4miCCo/a7ZU" target="_blank">ice panel</a>
<i frame src="https://s.icepanel.io/zjLjAbxB4miCCo/a7ZU" height="800" width="1200" title="mlnck's organization - mlnck's landscape" style="border-radius: 16px; border: none"></i frame>
-->
---

<dq_work-util-parse-markdown
  md="navigation"
  with-class="[ dq-work cube > block ][ post ][ table-selected > default ]" />
  <hr><hr>

<footer>
  <h6>buildless build</h6>
</footer>