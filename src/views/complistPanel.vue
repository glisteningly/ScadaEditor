<template>
  <collapse-panel label="页面组件" class="fill-parent-h">
    <div id="complist_panel" v-show="components.length>0" :style="listHeight" :class="{isHide:clientVisable}">
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
      return {
        clientHeight: 0,
        clientVisable: false
      }
    },
    computed: {
      listHeight() {
        return {
          maxHeight: `${this.clientHeight - 38}px`
        }
      }
    },
    methods: {
      compSelected(id) {
        this.$emit('compSelected', id)
      },
      resizePanel() {
        setTimeout(() => {
          this.clientHeight = this.$el.clientHeight
        }, 100)
        this.clientVisable = true
        setTimeout(() => {
          this.clientVisable = false
        }, 100)
      },
      onPanelSizeChang(label) {
        if (label === '组件库') {
          this.resizePanel()
        }
      }
    },
    mounted() {
      this.resizePanel()
      this.$events.on('PanelCollapseChanged', (label) => {
        this.onPanelSizeChang(label)
      })
      this.$events.on('windowResized', this.resizePanel)
    },
    beforeDestroy() {
      this.$events.off('PanelCollapseChanged')
    }
  }
</script>

<style lang="scss">
  @import "../styles/mixin.scss";

  .fill-parent-h {
    flex-grow: 1;
  }

  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  #complist_panel {
    /*max-height: 460px;*/
    overflow-y: auto;
    @include scrollBar;
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

  .isHide {
    display: none;
  }


</style>
