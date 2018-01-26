<template>
  <svg v-html="svg" width="100%" height="100%" ref="svgWrap"></svg>
</template>
<script>
  export default {
    name: 'ScadaSvg',
    props: {
      svg: {
        type: String
      },
      params: {
        type: Object,
        default: function () {
          return {
            rotate: 0
          }
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      valRotate() {
        return `rotate(${this.params.rotate})`
      }
    },
    methods: {
      initParams() {
        const s = this.$el.getElementsByTagName('svg')
        const strVb = s[0].getAttribute('viewBox')
        if (strVb) {
//        console.log(t)
          const v = strVb.split(' ')
          const g = this.$el.getElementsByTagName('g')
          if (g) {
            g[0].setAttribute('transform', `rotate(${this.params.rotate} ${v[2] / 2} ${v[3] / 2})`)
          }
        }
      }
    },
    mounted() {
      this.initParams()
    },
    watch: {
      params() {
//        console.log('params changed!')
        this.initParams()
      }
    }
  }
</script>
<style>
  svg {
    width: 100%;
    height: 100%;
  }

  text {
    pointer-events: none;
    user-select: none;
  }

</style>

