import { LitElement, css, html, nothing } from 'lit'
import sheet from '/styles/atoms/dq/work/hexagon.path.css' assert { type: 'css' }

class DqWorkAtomHexagonPath extends LitElement {
  static styles = [
    sheet,
    css`
      :host { display: inline-block; }`
  ]

  static properties = {
    preset: {attribute: 'as-a', type:String},
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <div class="[ dq-work atom ][ hex path ] [ ${this.preset} ]"></div>
    `
  }
}

customElements.define('dq_work-atom-hexagon_path', DqWorkAtomHexagonPath)
