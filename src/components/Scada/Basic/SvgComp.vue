<template>
  <svg width="100%" height="100%" ref="svg" :viewBox="symbolViewBox">
    <use :href="`#${name}`" ref="svgUse"/>
  </svg>
</template>
<script>
  export default {
    name: 'ScadaSvgComp',
    props: {
      name: {
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
      return {
        symbolViewBox: null
      }
    },
    computed: {
      valRotate() {
        return `rotate(${this.params.rotate})`
      }
    },
    methods: {
      initParams() {
        const u = this.$refs.svgUse
        if (!u) {
          return
        }
//        console.log('change')
        u.removeAttribute('filter')
        if (this.params.colorMask && this.params.colorMask !== '') {
          setTimeout(() => {
            u.setAttribute('filter', `url(#${this.params.colorMask})`)
          }, 0)
        }

        if ((this.params.rotate) && (this.params.rotate !== 0) && (this.params.rotate !== '')) {
          if (this.symbolViewBox) {
            const v = this.symbolViewBox.split(' ')
            u.setAttribute('transform', `rotate(${this.params.rotate} ${v[2] / 2} ${v[3] / 2})`)
          }
        } else {
          u.removeAttribute('transform')
        }
      }
    },
    mounted() {
      try {
        const v = document.getElementById(this.name).getAttribute('viewBox')
        this.symbolViewBox = v
      } catch (e) {
        console.log(e + ' svg组件不正确')
      }
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

