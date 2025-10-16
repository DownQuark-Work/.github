<!-- TODO: Make these tables dynamic -->
<style>
  @import "/styles/_namespace/dq/cube.css";
  p.cube.liner{margin:0}
  table.table-navigation {
    --dq-work-color-text-interactive-mark: var(--downquark-color-text-accent);
    display:none;
    & a{
        padding:.125rem .375rem .125rem;
        transition: all 0.25s ease-out;
        &::after {
          content: '➚';
          position:relative;
          left:.125rem;
          top:0;
        }
        &:hover::after {
          left:.25rem;
          top:-.125rem;
        }
    }
    & tbody{ width:100% }
    & td { --downquark-color-text-interactive: var(--downquark-color-text-accent); }
    & mark{
      &::after{border-block-start-width:2.85ch}
      &::before{border-block-end-width:2.85ch}
      &:has(a:hover){
        --downquark-color-text-accent: var(--downquark-color-background-primary);
      }
      & a {
        color: var(--downquark-color-background-primary); transition:none;
        &:hover{ color:var(--dq-work-color-text-interactive-mark); }
      }
    }
  }
  .table-selected {
    &.default .table-default { display:table; }
    &.project-foss .table-project-foss { display:table; }
    &.project-submodules .table-project-submodules { display:table; }
  }
</style>
<table class="[ table-navigation table-default ]">
  <tbody>
    <tr><td><strong><mark><a href="/">downquark</a></mark><strong></td>
      <td><a href="/?about">about</a></td>
      <td><a href="/?contact">contact</a></td>
      <td><a href="/?about_mission-values">statements</a></td>
    </tr>
    <tr><td><strong><mark>projects</mark></strong></td>
      <td><a href="/?projects_stealth">stealth</a></td>
      <td><a href="/?projects_foss">foss</a></td>
      <td><a href="/?projects_submodules_listings">submodules</a></td>
    </tr>
    <tr><td><strong><mark>internals</mark></strong></td>
      <td><a href="/?projects_perpetual/design-system"><b>design system</b></a></td>
      <td><a href="/?about_website">website</a></td>
      <td><a href="/?about_us">"us"</a></td>
    </tr>
  <tbody>
</table>

<table class="[ table-navigation table-project-foss ]">
  <tbody>
    <tr><td><strong><mark><a href="/">downquark</a></mark><strong></td>
      <td colspan="3"><a href="#menu-default">show main menu</a></td>
    </tr>
    <tr><td colspan="4"><p class="[ cube :: liner ]">FOSS</p></td></tr>
    <tr><td><strong><mark>active</mark><strong></td>
      <td><a href="/?projects_active_foss_devqon">devqon</a></td>
      <td><a href="/?projects_active_foss_qanban">qanban</a></td>
      <td>&nbsp;</td>
    </tr>
    <tr><td><strong><mark>queued</mark></strong></td>
      <td><a href="/?projects_queued_foss_mock-my-db">mock my db</a></td>
      <td><a href="/?projects_queued_foss_gui-tui">(G|T)UI</a></td>
    </tr>
    <!--coming soon-->
    <tr style="display:none"><td colspan="4"><p class="[ cube :: liner ]">- gaming</p></td></tr>
    <tr style="display:none"><td><strong><mark>gaming</mark></strong></td>
      <td><a href="/?projects_queued_foss_mock-my-db">mock my db</a></td>
      <td><a href="/?projects_queued_foss_qanban">qanban</a></td>
      <td>&nbsp;</td>
    </tr>
  <tbody>
</table>

<table class="[ table-navigation table-project-submodules ]">
  <tbody>
    <tr><td><strong><mark><a href="/">downquark</a></mark><strong></td>
      <td colspan="3"><a href="#menu-default">show main menu</a></td>
    </tr>
    <tr><td colspan="4"><p class="[ cube :: liner ]">submodules</p></td></tr>
    <tr><td><strong><mark>utilities</mark></strong></td>
      <td><a href="/?projects_submodules_algorithms_prng">PRNG</a></td>
      <td><a href="/?projects_submodules_iterables_seederator">seederator</a></td>
      <td><a href="/?projects_submodules_iterables_n1-grid">n1 grid</a></td>
    </tr>
    <tr><td><strong><mark>procedural</mark></strong></td>
      <td><a href="/?projects_submodules_algorithms_maze_sidewinder">sidewinder</a></td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr><td><strong><mark>packages</mark></strong></td>
      <td><a href="/?projects_submodules_api_package-download-stats">download stats</a></td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <!--coming soon-->
    <tr style="display:none"><td><strong><mark>pwa</mark></strong></td>
      <td><a href="/?projects_submodules_pwa_fat-red-bird">Fat Red Bird</a></td>
      <td><a href="/?projects_submodules_pwa_procedural-mandala">Procedural Mandala</a></td>
      <td>&nbsp;</td>
    </tr>
  <tbody>
</table>