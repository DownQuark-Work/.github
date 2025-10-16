import { LitElement, css, html, nothing } from 'lit'
// import sheet from '/styles/atoms/dq/work/hexagon.css' assert { type: 'css' }

import './dqwork.hexagon.element.js'
import './dqwork.hexagon.path.js'

class DqWorkAtomHexagon extends LitElement {
  static styles = [
    // sheet,
    css`
      :host { display: inline-block; }
    `
  ]

  static properties = {
    /** HTML Element */
    override: {attribute: 'with-overrides', type:Boolean},
    preset: {attribute: 'as-a', type:String},
    selected: {type:Boolean, reflect:true},
    // css custom props
    bgImg: {attribute: 'hex-img', type:String},
    border: {attribute: 'hex-border', type:String}, // as shorthand : 3px dashed blue
    fill:   {attribute: 'hex-color', type:String},
    shadow: {attribute: 'hex-shadow', type:String}, // as shorthand :  0 0 2px rgba(0,0,0,0.6)
    width:  {attribute: 'hex-width', type:String},

    /** Clip Path */
  }

  constructor() {
    super()
  }

  renderTileContent(){
    if(this.preset && !!~this.preset.indexOf('tile'))
      return html`<slot name="tile-date" slot="tile-date-inner">...</slot>
                  <slot name="tile-title" slot="tile-title-inner">...</slot>`
  }
  loadHexagonElement(){
    return html`
      <dq_work-atom-hexagon_element
        ${this.override && 'with-overrides'}
        as-a=${this.preset}
        hex-border=${this.border}
        hex-color=${this.fill}
        hex-img=${this.bgImg}
        hex-shadow=${this.shadow}
        hex-width=${this.width}
        ?selected=${this.selected}
      >
        ${this.renderTileContent()}
      </dq_work-atom-hexagon_element>`
  }

  loadHexagonPath(){
    return html`
      <dq_work-atom-hexagon_path
          as-a=${this.preset.replace('visual ','')}
      >Loading</dq_work-atom-hexagon_path>`
  }

  render() {
    return html`
      <div>
        ${ (this.preset && !!~this.preset.indexOf('visual'))
          ? this.loadHexagonPath() : this.loadHexagonElement() }
      </div>
    `
  }
}

customElements.define('dq_work-atom-hexagon', DqWorkAtomHexagon)
