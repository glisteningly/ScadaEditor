<template>
  <svg>
    <g>
      <rect
        :fill="fill"
        width="100%"
        height="100%"
      />
      <text x="50%" y="50%" alignment-baseline="middle"
            style="font-size:14px; font-weight: bold; fill:#000000; text-anchor: middle;"
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
            val1: 'label'
          }
        }
      },
      fill: {
        default: 'none'
      }
    },
    data() {
      return {}
    },
    computed: {
      labelText() {
        return (this.value.val1 || '[LABEL]')
      }
    }
  }
</script>

