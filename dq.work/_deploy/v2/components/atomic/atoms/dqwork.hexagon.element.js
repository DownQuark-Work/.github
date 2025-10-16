import { LitElement, css, html, nothing } from 'lit'
import sheet from '/styles/atoms/dq/work/hexagon.element.css' assert { type: 'css' }

class DqWorkAtomHexagonElement extends LitElement {
  static styles = [
    sheet,
    css`
      :host { display: inline-block; }`
  ]

  static properties = {
    override: {attribute: 'with-overrides', type:Boolean},
    preset: {attribute: 'as-a', type:String},
    selected: {type:Boolean, reflect:true},
    // css custom props
    bgImg: {attribute: 'hex-img', type:String},
    border: {attribute: 'hex-border', type:String}, // as shorthand : 3px dashed blue
    fill:   {attribute: 'hex-color', type:String},
    shadow: {attribute: 'hex-shadow', type:String}, // as shorthand :  0 0 2px rgba(0,0,0,0.6)
    width:  {attribute: 'hex-width', type:String},
  }
  
  static presetProps = {
    _preset: false,
    _category: null,
    _type: null,    
  }

  // auto format data for ease of use when preset is defined
  set preset(val)  {
    if(val) {
      this._preset = true
      const [c,t] = val.split(' ')
      this._category = c
      this._type = t
    } else {
      this._preset = false
      this._category = null
      this._type = null
    }
  }
  get preset() {
    return this._preset ? {
      category: this._category,
      type: this._type
    } : false
  }

  constructor() {
    super()
  }

  configureCustomProps() {
    let customProps = ''

    if(this._preset){
      customProps += `--dq-work-color-fill-element-hex: var(--dq-work-color-${this._type}-${this._category}, black);`
      customProps += `--dq-work-size-width-element-hex: var(--dq-work-size-width-element-hex-${this._type}-${this._category}, 1rem);`

      if(this._type === 'filter'){
        customProps += `--dq-work-color-fill-element-hex-filters-hover: var(--dq-work-color-${this._type}-${this._category}, black);`
        customProps += '--dq-work-width-border-element-hex:1px;'
        customProps += '--dq-work-style-border-element-hex:solid;'
        customProps += '--dq-work-color-border-element-hex:gray;'
      }
      if(!this.override) return html`<style>
        .dq-work.element.hex{${customProps};}
        .dq-work.atom.position{--dq-work-color-fill-element-hex: var(--dq-work-color-${this._type}-${this._category}, black);}
      </style>`
    }
    
    if(this.border) {
      const [bw, bs, bc] = this.border.split(' ')
      if(bw && bw !== '.') customProps += `--dq-work-width-border-element-hex: ${bw};`
      if(bs && bs !== '.') customProps += `--dq-work-style-border-element-hex: ${bs};`
      if(bc && bc !== '.') customProps += `--dq-work-color-border-element-hex: ${bc};`
    }
    if(this.fill) customProps += `--dq-work-color-fill-element-hex: ${this.fill};`
    if(this.shadow) {
      const [hOffset, vOffset, blur, spread, color] = this.shadow.split(' ')
      customProps += `--dq-work-blur-shadow-element-hex: ${hOffset || '0'} ${vOffset || '0'} ${blur || '0'} ${spread || '0'};`
      if(color) customProps += `--dq-work-color-shadow-element-hex: ${color};`
    }
    if(this.width) customProps += `--dq-work-size-width-element-hex: ${this.width};`
    return html`<style>.dq-work.element.hex{${customProps}}</style>`
  }

  imageEnabled() {
    return html`
      <style>.dq-work.element.hex {--dq-work-url-img-bg-element-hex: url(${this.bgImg})}</style>
      <div class="[ img top ]"></div><div class="[ img bottom ]"></div>
    `
  }
  shadowEnabled() {
    return html`<span class="[ shadow ]"></span>`
  }

  //this doesn't work (yet) but shows the thought process - clicks only happen when the element is of certain types
  isInteractive(e) {
    if(!this._preset) return
    if(this._type === 'tile') return // tiles are handled within their respective molecules

    switch (e.type) {
      case 'click':
        // console.log('e.type triggered: ', e.type)
        // console.log('this.fill: ', this.fill)
    }
    // console.log('e: ', e)
  }
  withPreset() { // adds custom classes and/or overrides for presets
    if(!this._preset) return ' '
    let ret = ' ][ preset > '+this._category+' '+this._type
    if(this._type === 'filter') ret += ' border'
    return ret
  }
  renderTileHoverElement() {
    return html`<span class="[ dq-work atom ][ preset tile :: content ]">
      <slot name="tile-date-inner">...</slot>
      <slot name="tile-title-inner">...</slot>
    </span>`
  }
  render() {
    return html`
      ${this.configureCustomProps()}
      <div @click="${(e)=>{this.isInteractive(e)}}" class="[ dq-work atom ][ layout > position ]">
        <div
          class="
            [ dq-work atom ][ hex element${this.withPreset()} ]
            [ enable > ${this.bgImg ? 'img' : ''}
              ${this.shadow ? 'shadow' : ''}
              ${this.border ? 'border' : ''}
            ]"
            ?selected=${this.selected}
            >
          ${this.bgImg && this.imageEnabled()}
          ${this.shadow && this.shadowEnabled()}
        </div>
        ${this._type === 'tile' ? this.renderTileHoverElement() : nothing}
      </div>
    `
  }
}

customElements.define('dq_work-atom-hexagon_element', DqWorkAtomHexagonElement)
