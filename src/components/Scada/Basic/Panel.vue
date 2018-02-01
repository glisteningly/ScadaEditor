<template>
  <svg>
    <g>
      <rect
        :fill="params.background || 'none'"
        :stroke="params.stroke || 'none'"
        :stroke-width="params.strokeWidth"
        :rx="params.cornerRadius"
        :ry="params.cornerRadius"
        stroke-position="inside"
        width="96%"
        height="96%"
        x="2%"
        y="2%"/>
    </g>
  </svg>
</template>
<script>
  import ScadaBase from './Base.vue'

  export default {
    extends: ScadaBase,
    name: 'ScadaPanel',
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
            stroke: '#000',
            strokeWidth: 0,
            background: '#CCC',
            cornerRadius: 0
          }
        }
      }
    },
    data() {
      return {}
    },
    computed: {
//      bgColor() {
//        return (this.params.background || 'none')
//      }
    }
  }
</script>

