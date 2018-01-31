<template>
  <div class="svg-defs-container">
    <svg>
      <defs id="scada-defs">
        <color-plate/>
        <defs v-for="symbol in svgSymbols" v-html="symbol.content" :key="symbol.id"></defs>
      </defs>
    </svg>
  </div>
</template>
<script>
  import ColorPlate from '@/components/Scada/SvgColorFilterList.vue'

  export default {
    components: {
      ColorPlate
    },
    props: {
      svgSymbols: null
    },
    data() {
      return {}
    }
  }
</script>
<style lang="scss">
  .svg-defs-container {
    width: 0;
    height: 0;
    z-index: -9999;
  }
</style>

