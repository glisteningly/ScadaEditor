<template>
  <svg v-html="svg" width="100%" height="100%" :transform="valRotate"></svg>
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

