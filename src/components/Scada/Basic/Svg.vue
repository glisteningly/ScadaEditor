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
            rotate: 0,
            colorMask: ''
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
        if (this.params.colorMask && this.params.colorMask !== '') {
          s[0].setAttribute('filter', `url(#${this.params.colorMask})`)
        } else {
          s[0].removeAttribute('filter')
        }
        if (this.params.rotate !== 0) {
          const strVb = s[0].getAttribute('viewBox')
          if (strVb) {
//            console.log(this.params.rotate)
            const v = strVb.split(' ')
            const g = this.$el.getElementsByTagName('g')
            if (g) {
              g[0].setAttribute('transform', `rotate(${this.params.rotate} ${v[2] / 2} ${v[3] / 2})`)
            }
          }
        } else {
          const g = this.$el.getElementsByTagName('g')
          if (g) {
            g[0].removeAttribute('transform')
          }
        }
      }
    },
    mounted() {
      this.initParams()
    },
    watch: {
      params() {
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

