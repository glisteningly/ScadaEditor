const jstoxml = require('jstoxml')
import Vue from 'vue'
import scadaGuage from '@/components/Scada/Basic/Guage.vue'
import scadaLevelbar from '@/components/Scada/Basic/LevelBar.vue'
import scadaLabel from '@/components/Scada/Basic/Label.vue'
import scadaPanel from '@/components/Scada/Basic/Panel.vue'

export default {
  getCompStr(components) {
    const comps = []
    const svgDefs = document.getElementById('scada-defs').innerHTML
    comps.push({
      _name: 'defs',
      _content: svgDefs
    })
    components.slice().reverse().forEach((item) => {
      const attrs = {
        'x': item.layout.x + 1,
        'y': item.layout.y + 1,
        'width': item.layout.width - 2,
        'height': item.layout.height - 2
      }
      if ((item.type === 'scada-svg') || (item.type === 'scada-svg-comp')) {
        const el = document.getElementById(item.id)
        if (!el) {
          return
        }
        const elSvg = el.getElementsByTagName('svg')
        const innerSvg = elSvg[0].innerHTML
        if (item.type === 'scada-svg-comp') {
          const vb = elSvg[0].getAttribute('viewBox')
          if (vb) {
            Object.assign(attrs, { 'viewBox': vb })
          }
        }
        comps.push({
          _name: 'svg',
          _attrs: attrs,
          _content: innerSvg
        })
      } else {
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
  getTplStr(components, svgConfig) {
    const compStr = this.getCompStr(components)
    const tplStr = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgConfig.w} ${svgConfig.h}"  preserveAspectRatio="xMidYMid meet"
	                          ><rect width="100%" height="100%" fill="${svgConfig.bgColor}"></rect>${compStr}</svg>`
    return tplStr
  },
  initScadaComp(components, svgConfig = { w: 1000, h: 600, bgColor: '#FFF' }) {
    Vue.component('ScadaView', {
      props: {
        value: {
          type: Object
        }
      },
      template: this.getTplStr(components, svgConfig),
      components: { scadaGuage, scadaLevelbar, scadaLabel, scadaPanel }
    })
  }
}
