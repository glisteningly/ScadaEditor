<template>
  <collapse-panel label="组件库">
    <div class="panel-subtitle">基础组件</div>
    <div class="comp-list">
      <drag v-for="tool in compTools" class="comp-item" :key="tool.id"
            :transferData="{type:tool.name, config:tool.config, attrs:tool.attrs, params:tool.params }">
        <img class="comp-icon"
             :src="`http://10.0.0.126/static/img/scada/${tool.name}.png`" :alt="tool.type">
      </drag>
    </div>
    <div class="panel-subtitle">扩展组件库1</div>
    <div class="comp-list">
      <drag v-for="tool in compToolsEx" class="comp-item" :key="tool.id"
            :transferData="{type:tool.name, name:tool.name, config:tool.config, attrs:[], params:tool.params }">
        <img class="comp-icon comp-icon-svg"
             :src="tool.imgUrl" :alt="tool.type">
      </drag>
    </div>
  </collapse-panel>
</template>
<script>
  import { Drag } from 'vue-drag-drop'
  import scadaComps from '@/components/Scada/Basic'
  import scadaCompsEx from '@/components/Scada/Extend_1'

  export default {
    components: { Drag },
    props: {},
    data() {
      return {
        compTools: [],
        compToolsEx: []
      }
    },
    computed: {},
    methods: {},
    mounted() {
      this.compTools = scadaComps.tools
      this.compToolsEx = scadaCompsEx.tools
    }
  }
</script>

<style lang="scss">
  .panel-subtitle {
    margin: 4px 0;
    padding: 4px 4px 2px 4px;
    line-height: 16px;
    background-color: #CCC;
  }

  .comp-list {
    margin-bottom: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 56px;
    /*grid-template-rows: repeat(3, 1fr);*/
    grid-column-gap: 2px;
    grid-row-gap: 2px;
    .comp-item {
      font-size: 12px;
      line-height: 52px;
      background-color: #FFF;
      text-align: center;
      cursor: pointer;
      border: 1px solid #DDD;
      color: #20a0ff;
    }
  }

  .collapse-btn {
    float: right;
  }

  .comp-icon {
    width: 100%;
    height: 100%;
  }

  .comp-icon-svg {
    padding: 5px;
  }
</style>
