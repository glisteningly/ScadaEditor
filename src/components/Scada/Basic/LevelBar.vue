<template>
  <svg>
    <defs>
      <linearGradient id="Gradient1" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stop-color="#1e9cd7"/>
        <stop offset="50%" stop-color="#cce0f4"/>
        <stop offset="100%" stop-color="#1e9cd7"/>
      </linearGradient>
    </defs>
    <g>
      <rect
        :fill="params.background"
        id="background"
        width="100%"
        height="100%"
        x="0"
        y="0"/>
      <rect
        :fill="params.fill"
        id="rect74"
        width="100%"
        height="60%"
        :height="value.val1 + '%'"
        x="0"
        y="40%"
        :y="(100-value.val1) + '%'"
      />
      <rect
        style="fill:none;stroke:#005b97;stroke-width:3"
        id="rect76"
        width="100%"
        height="100%"
        x="0"
        y="0"
      />
      <text x="50%" y="55%"
            style="font-size:12px; font-weight: bold; fill:#FFF; text-anchor: middle; text-shadow: 0 0 3px #666;"
      >{{value.val1}}%
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
            val1: 50
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
    computed: {}
  }
</script>

