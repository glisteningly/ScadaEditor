<template>
  <div id="pre_view">
    <div id="scada_container">
      <component id="scada_view" v-if="initiated" :is="previewCompName" :value="testBindData"></component>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      initiated: false,
      tplStr: null,
      testData: {}
    },
    data() {
      return {
        inited: false
      }
    },
    computed: {
      previewCompName() {
        if (!this.initiated) {
          return 'div'
        } else {
          return 'ScadaView'
        }
      },
      testBindData() {
        return this.testData
      }
    },
    methods: {},
    watch: {}
  }
</script>
<style lang="scss">
  #pre_view {
    flex-grow: 1;
    overflow: auto;
  }

  #scada_container {
    margin: 10px auto;
    width: 96%;
  }

  #scada_view {
    width: 100%;
    background-color: #FFF;
    border: 1px solid #999;
    box-shadow: 1px 1px 5px #999;
  }
</style>
