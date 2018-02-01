<template>
  <svg>
    <g>
      <rect
        :fill="params.background"
        width="100%"
        height="100%"
        x="0"
        y="0"/>
      <rect
        :fill="params.fill"
        width="100%"
        height="60%"
        :height="barHeight"
        x="0"
        y="40%"
        :y="barY"
      />
      <rect
        style="fill:none;stroke:#005b97;stroke-width:3"
        width="100%"
        height="100%"
        x="0"
        y="0"
      />
      <text x="50%" y="55%"
            style="font-size:12px; font-weight: bold; fill:#FFF; text-anchor: middle; text-shadow: 0 0 3px #666;"
      >{{ labelNum }}
      </text>
    </g>
  </svg>
</template>
<script>
  import ScadaBase from './Base.vue'

  export default {
    extends: ScadaBase,
    name: 'ScadaLevelbar',
    props: {
      value: {
        type: Object,
        default: function () {
          return {
            val1: 0
          }
        }
      },
      params: {
        type: Object,
        default: function () {
          return {
            fill: '#43b5ff',
            background: '#CCC'
          }
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      labelNum() {
        return (this.value.val1 || 0) + '%'
      },
      barHeight() {
        return (this.value.val1 || 0) + '%'
      },
      barY() {
        return (100 - (this.value.val1 || 0)) + '%'
      }
    }
  }
</script>

