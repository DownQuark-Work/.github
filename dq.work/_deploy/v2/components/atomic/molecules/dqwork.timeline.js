import { LitElement, css, html, nothing } from 'lit'
import { map } from 'lit/directives/map.js';

import classlessSheet from '/styles/_particles/_base/downquark-classless.css' assert { type: 'css' }
import hexSheet from '/styles/atoms/dq/work/hexagon.element.css' assert { type: 'css' }
import timelineSheet from '/styles/molecules/dq/work/timeline.css' assert { type: 'css' }

import '../atoms/dqwork.hexagon.js'

class DqWorkMoleculeTimeline extends LitElement {
  static styles = [
    classlessSheet,
    hexSheet,
    timelineSheet
  ]

  static properties = {
    contentPath: {type:String, attribute: 'content-path'},
    activeFilter: {type:String, attribute: 'filter'},
    _timelineItems: {attribute:false, state:true}, // this may change as we scale to be pulled from the db
    _timelineItemsFiltered: {attribute:false, state:true}
  }

  constructor() {
    super()
    this._timelineItems = []
    this._timelineItemsFiltered = null
    this.activeFilter = null
  }

  handleTimelineItemClick(e,itm) {
    e.preventDefault(); e.stopPropagation()
    if(['BLOG','FORUM'].includes(itm.type)) //open external link
      window.open(itm.url.external, '_blank')
    else
      window.location.search = itm.url.slug
  }
  getCategoryType(cat) {
    if(!cat || cat === 'dq') return 'miscellaneous'
    return cat
  }
  itemAsTile(timelineItem) {
    const formatDate = () => 
      new Date(parseInt(timelineItem.created.timestamp,10)).toISOString()
            .replace(/^\d\d/,'').replace(/T.+/i,'').replace(/-/g,'.')

    const formatTitle = () => {
      return (['BLOG','FORUM'].includes(timelineItem.type)) ? html`<small class="timeline-external-prefix">[${timelineItem.type.toLowerCase()}]</small> ${timelineItem.title}` : html`${timelineItem.title}`
    }
    
    return html`
    <dq_work-atom-hexagon
      @click="${(e)=>{this.handleTimelineItemClick(e,timelineItem)}}"
      as-a="${this.getCategoryType(timelineItem.categories[0])} tile"
    >
      <span slot="tile-date">${formatDate()}</span>
      <mark slot="tile-title">${formatTitle()}</mark>
    </dq_work-atom-hexagon>`
  }
  
  async loadTimelineContent() { // update to an API endpoint when db is in place
    const timelineItemsResponse = await fetch(this.contentPath);
    const timelineItemsJson = await timelineItemsResponse.json();
    this._timelineItems = timelineItemsJson
  }
  handleActiveFilter() {
    if(this.activeFilter === 'clear') {
      this._timelineItemsFiltered = null
      return
    }
    this._timelineItemsFiltered = this._timelineItems.filter(tlItm => tlItm.categories.includes(this.activeFilter))
  }
  connectedCallback() {
    super.connectedCallback();
    this.loadTimelineContent()
  }
  render() {
    this.activeFilter && this.handleActiveFilter()
    return html`
      <style></style>
      <ul class="[ dq-work timeline molecule ][ layout wrapper ]">
        ${map(this._timelineItemsFiltered || this._timelineItems, (itm) => html`<li>${this.itemAsTile(itm)}</li>`)}
      </ul>
    `
  }
}

customElements.define('dq_work-molecule-timeline', DqWorkMoleculeTimeline)