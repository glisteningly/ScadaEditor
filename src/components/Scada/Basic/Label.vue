<template>
  <svg>
    <g>
      <rect
        :fill="bgColor"
        width="100%"
        height="100%"
      />
      <text x="50%" y="55%" alignment-baseline="middle"
            :fill="params.fill"
            :font-size="params.fontSize"
            :font-family="fontFamily"
            style="text-anchor: middle"
      >{{labelText}}
      </text>
    </g>
  </svg>
</template>
<script>
  import ScadaBase from './Base.vue'

  export default {
    extends: ScadaBase,
    name: 'ScadaLabel',
    props: {
      value: {
        type: Object,
        default: function () {
          return {
            val1: '9999'
          }
        }
      },
      params: {
        type: Object,
        default: function () {
          return {
            fill: '#333',
            background: '#FFF',
            fontSize: 24,
            fontFamily: 'default'
          }
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      labelText() {
        return (this.value.val1 || '[LABEL]')
      },
      bgColor() {
        return (this.params.background || 'none')
      },
      fontFamily() {
        switch (this.params.fontFamily) {
          case 'lcdmono':
            return "'lcdmono2', Arial, sans-serif"
          default:
            return 'Arial, sans-serif'
        }
      }
    }
  }
</script>

