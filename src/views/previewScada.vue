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
//      previewCompName: 'div',
      initiated: false,
      testData: {}
    },
    data() {
      return {
//        previewCompName: 'div'
//        testBindData: { datamodel1: { field1: 33, field2: 44 }, datamodel2: { field3: 55, field4: 66 } }
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
//        return { datamodel1: { field1: 33, field2: 44 }, datamodel2: { field3: 55, field4: 66 } }
        return this.testData
      }
    },
    methods: {}
  }
</script>
<style lang="scss">
  #pre_view {
    flex-grow: 1;
    overflow: auto;
  }

  #scada_container {
    margin: 20px auto;
    width: 95%;
  }

  #scada_view {
    width: 100%;
    background-color: #FFF;
    border: 1px solid #999;
    box-shadow: 1px 1px 5px #999;
  }
</style>
