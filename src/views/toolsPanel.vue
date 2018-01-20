<template>
  <section>
    <div class="title-label">基础组件</div>
    <div class="panel-content">
      <div class="comp-list">
        <drag v-for="tool in compTools" class="comp-item" :key="tool.id"
              :transferData="{type:tool.name, size:tool.defaultSize, attrs:tool.attrs, params:tool.params }">
          <img class="comp-icon"
               :src="`http://10.0.0.126/static/img/scada/${tool.name}.png`" :alt="tool.type">
        </drag>
      </div>
    </div>
  </section>
</template>
<script>
  import { Drag } from 'vue-drag-drop'
  import scadaComps from '@/components/Scada/Basic'

  export default {
    components: { Drag },
    props: {
//      compTools: []
    },
    data() {
      return {
        compTools: []
      }
    },
    computed: {},
    methods: {},
    mounted() {
      this.compTools = scadaComps.tools
    }
  }
</script>

<style lang="scss">
  .comp-list {
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

  .comp-icon {
    width: 100%;
  }
</style>
