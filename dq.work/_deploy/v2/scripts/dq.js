// non-component javascript
const DownQuark = (function () {
  let instance;
  // lock this when done
  function createInstance() {
    const retObj = {
      mediate: {
        filterSelection: (filter) => document.querySelector('dq_work-molecule-timeline').setAttribute('filter',filter),
      }
    }
    retObj.appstate = {
      initial_load:true,
    }
    retObj.mediate.contentLoaded = () => {
      if(retObj.appstate.initial_load) {
        document.querySelector('dq_work-molecule-filter')
          .shadowRoot.querySelector('.filter.layout.wrapper')
          .classList.remove('loading')
        retObj.appstate.initial_load = false
      }
    }
    
  return retObj
}
  return { 
    singularity: function () {
      if (!instance) { instance = createInstance(); }
      return instance;
    }
  };
})();