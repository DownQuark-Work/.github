import { LitElement, html } from 'lit'
import sheet from '/styles/atoms/dq/work/hexagon.css' assert { type: 'css' }

class DqWorkAtomHexagon extends LitElement {
  static styles = [sheet]

  static properties = {
    _hex: {state: true},
    pubAttr: {type: Number, attribute: 'pub-attr', reflect: true},
    data: {attribute: false},
  }

  constructor() {
    super()
    this._hex = 0
    this.pubAttr = -1
    this.data = {}
  }

  updateDataAndPubAttr() {
    this.pubAttr = Date.now()
    setTimeout(()=>{ // dom will not update
      this.data.something = 'nothing'
    },1000)
  }

  updateHex() { // this will update dom with this.data
    this._hex = this._hex - 1
  }

  render() {
    return html`
    <h2>https://lit.dev/docs/templates/expressions/ - - THIS IS WHAT TO PASS INTO THE HTML ELEMENT</h2>
      <h3><slot></slot></h3>
      <ul>
        <li>https://lit.dev/docs/templates/directives/</li>
        <li>https://lit.dev/docs/templates/custom-directives/</li>
        <li>https://lit.dev/docs/components/properties/#property-options</li>
        <li>https://lit.dev/docs/templates/expressions/</li>
        <li>https://lit.dev/docs/composition/mixins/</li>
        <li>https://lit.dev/docs/composition/controllers/</li>
        <li>https://lit.dev/docs/localization/overview/</li>
        <li>https://lit.dev/docs/api/LitElement/#LitElement/lifecycle</li>
        
      </ul>
      <p>${this.pubAttr} || ${this.data?.something||'anon'}</p>
      <p>TODO: Add in the properties to support all layouts and dynamically ${this._hex} adjust the nested elements (image and span for shadow)</p>
      <button @click="${this.updateDataAndPubAttr}">hex test</button>
      <button @click="${this.updateHex}">update hex</button>
      <div>
        <style>
          .dq-work.element.hex {
            --dq-work-url-img-bg-element-hex: url(https://as2.ftcdn.net/v2/jpg/05/53/37/39/1000_F_553373973_S2whM9g0osk2g1WYtiqdk8mFv5ZgBqqA.jpg)
          }
        </style>
        <div class="[ dq-work hex element ] [ enable > img shadow border ]">
          <div class="[ img top ]"></div>
          <div class="[ img bottom ]"></div>
          <span class="[ shadow ]"></span>
        </div>
      </div>
    `
  }
}

customElements.define('dq_work-atom-hexagon', DqWorkAtomHexagon)