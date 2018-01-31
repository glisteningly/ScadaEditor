<template>
  <defs>
    <filter v-for="cf in colorFilters" :id="cf.id" :key="cf.id">
      <feColorMatrix
        type="matrix"
        :values="cf.values"/>
    </filter>
  </defs>
</template>
<script>
  export default {
    props: {},
    data() {
      return {
        colorFilters: [{
          id: 'cf-red',
          values: '1 0 0 0 0 0 0.3 0 0 0 0 0 0.3 0 0 0 0 0 1 0'
        }, {
          id: 'cf-yellow',
          values: '1 0 0 0 0 0 0.8 0 0 0 0 0 0.1 0 0 0 0 0 1 0'
        }, {
          id: 'cf-green',
          values: '-1 0 0 0 0 0 1 0 0 0 0 0 0.3 0 0 0 0 0 1 0'
        }, {
          id: 'cf-blue',
          values: '-3 0 0 0 0 0 0.6 0 0 0 0 0 1 0 0 0 0 0 1 0'
        }, {
          id: 'cf-lightblue',
          values: '0.4 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0 '
        }]
      }
    }
  }
</script>
