const jstoxml = require('jstoxml')
import Vue from 'vue'
import scadaGuage from '@/components/Scada/Basic/Guage.vue'
import scadaLevelbar from '@/components/Scada/Basic/LevelBar.vue'
import scadaLabel from '@/components/Scada/Basic/Label.vue'

export default {
  getCompStr(components) {
    const comps = []
    components.forEach((item) => {
      if (item.type === 'scada-svg') {
        const el = document.getElementById(item.id)
        if (!el) {
          return
        }
        const elSvg = el.getElementsByTagName('svg')
        const innerSvg = elSvg[0].innerHTML
        comps.push({
          _name: 'svg',
          _attrs: {
            'x': item.layout.x,
            'y': item.layout.y,
            'width': item.layout.width,
            'height': item.layout.height
            // 'viewBox': elSvg[0].getAttribute('viewBox')
            // 'transform': elSvg[0].getAttribute('transform')
          },
          _content: innerSvg
        })
      } else {
        const attrs = {
          'x': item.layout.x,
          'y': item.layout.y,
          'width': item.layout.width,
          'height': item.layout.height
//              ':params': JSON.stringify(item.params).replace(/\"/g, "'")
        }
        if (Object.getOwnPropertyNames(item.params).length > 1) {
          Object.assign(attrs, { ':params': JSON.stringify(item.params).replace(/\"/g, "'") })
        }
        if (Object.getOwnPropertyNames(item.bind).length > 1) {
          Object.assign(attrs, { ':value': JSON.stringify(item.bind).replace(/\"/g, '') })
        }
        comps.push({
          _name: item.type,
          _attrs: attrs
        })
      }
    })
    // return comps
    return jstoxml.toXML(comps)
  },
  getTplStr(components, svgSize) {
    const compStr = this.getCompStr(components)
    const tplStr = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgSize.w} ${svgSize.h}" preserveAspectRatio="xMidYMid meet"
	                          >${compStr}</svg>`
    return tplStr
  },
  initScadaComp(components, svgSize = { w: 1000, h: 600 }) {
    Vue.component('ScadaView', {
      props: {
        value: {
          type: Object
        }
      },
      template: this.getTplStr(components, svgSize),
      components: { scadaGuage, scadaLevelbar, scadaLabel }
    })
  }
}
