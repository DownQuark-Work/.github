import { LitElement, css, html, nothing } from 'lit'
import sheet from '/styles/molecules/dq/work/filter.css' assert { type: 'css' }

import '../atoms/dqwork.hexagon.js'

class DqWorkMoleculeFilter extends LitElement {
  static styles = [
    sheet,
    css`
      :host { display: inline-block; }`
  ]

  static properties = {
    _label: {attribute: false},
    _hovercolor: {state:true},
  }

  _selected = {
    blog:false,
    clear:true,
    design:false,
    development:false,
    forum:false,
    foss:false,
    miscellaneous:false,
    stealth:false,
  }

  constructor() {
    super()
  }

  applyFilter(e) {
    for(const selection in this._selected){
      this._selected[selection] = false
    }
    const selectedFilter = e.target.attributes['as-a'].value.split(' ')[0]
    this._selected[selectedFilter] = true
    DownQuark.singularity().mediate.filterSelection(selectedFilter)
    this.requestUpdate()
  }
  showFilterType(e) {
    this._label = e.target.attributes[0].value.split(' ')[0] // e.target.attributes[0].value
    const category = this._label // .split(' ')[0]
    this._hovercolor = `--dq-work-color-feature-category-rollover: var(--dq-work-color-filter-${category}, black);
    --dq-work-color-feature-category-label-text: var(--dq-work-color-header-${category}, black);`
  }

  generateFilterHexagons() {
    return ['development','design','foss','stealth','blog','forum','miscellaneous']
      .map((fltr,indx) => html`<dq_work-atom-hexagon
          @click="${this.applyFilter}" @mouseover="${this.showFilterType}"
          ?selected=${this._selected[fltr]}
          as-a="${fltr} filter"
          style="--dq-work-position-offset-feature-hexagon:${indx}">
        </dq_work-atom-hexagon>`)
  }

  render() {
    return html`
      <style>
        mark {
          --dq-work-color-feature-category-label-text: black;
          ${this._hovercolor};
          background-color: var(--dq-work-color-feature-category-rollover);
          color: var(--dq-work-color-feature-category-label-text);
        }
      </style>
      <div class="[ dq-work filter molecule ][ layout wrapper ][ onload :: loading ]">
        ${this.generateFilterHexagons()}
        <dq_work-atom-hexagon @click="${this.applyFilter}" @mouseover="${this.showFilterType}" ?selected=${this._selected.clear} as-a="clear filter" style="--dq-work-position-offset-feature-hexagon:7"></dq_work-atom-hexagon>
        <mark>${this._label}</mark>
      </div>`
  }
}

customElements.define('dq_work-molecule-filter', DqWorkMoleculeFilter)
