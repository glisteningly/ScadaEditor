import Vue from 'vue'

export default {
  AddSvgComp(name, svgStr) {
    Vue.component('name', {
      template: svgStr,
      props: {
        options: {}
      },
      data() {
        return {
        }
      },
      methods: {}
    })
  }
}
