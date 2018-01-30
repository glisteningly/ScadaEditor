<template>
  <defs>
    <defs v-html=""></defs>
  </defs>
</template>
<script>
  export default {
    props: {
      svgSymbols: null
    },
    data() {
      return {
        colorFilters: [{
          id: 'cf-green',
          values: '-1 0 0 0 0 0 1 0 0 0 0 0 0.3 0 0 0 0 0 1 0'
        }, {
          id: 'cf-blue',
          values: '-3 0 0 0 0 0 0.6 0 0 0 0 0 1 0 0 0 0 0 1 0'
        }]
      }
    }
  }
</script>
