<template>
  <collapse-panel label="页面组件">
    <div id="complist_panel" v-show="components.length>0">
      <div class="page-list">
        <div v-for="comp in components"
             :key="comp.id"
             class="page-item"
             :class="{isActive:comp.active}"
             @click="compSelected(comp.id)"
             v-dragging="{ item: comp, list: components, group: 'comp' }">
          {{comp.label}}
        </div>
      </div>
    </div>
  </collapse-panel>
</template>
<script>
  export default {
    components: {},
    props: {
      components: null
    },
    data() {
      return {}
    },
    computed: {},
    methods: {
      compSelected(id) {
        console.log(id)
        this.$emit('compSelected', id)
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  #complist_panel {
    max-height: 460px;
    overflow-y: auto;
  }

  .page-list {
    background-color: #FFF;
    border: 1px solid #888;
    border-bottom: none;
    .page-item {
      border-bottom: 1px solid #888;
      padding: 4px 4px 2px 8px;
    }
  }

  .isActive {
    background-color: rgba(67, 181, 255, 0.3);
  }


</style>
