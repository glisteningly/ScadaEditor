<template v-html="svg" v-once class="scada-svg-editor">
</template>
<script>
  export default {
    name: 'ScadaSvg',
    props: {
      svg: {
        type: String
      }
    },
    data() {
      return {}
    },
    computed: {}
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

  .scada-svg-editor {
    width: 100%;
    height: 100%;
  }
</style>

