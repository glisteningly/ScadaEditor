<template>
  <div id="workarea">
    <drop id="canvas" :style="canvasStyle" @drop="handleCompDrop">
      <dragger v-for="component in components"
               :id="component.id"
               :key="component.id"
               :active.sync="component.active"
               :w="component.layout.width"
               :h="component.layout.height"
               :x="component.layout.x"
               :y="component.layout.y"
               :ratio="component.layout.ratio"
               class="drag-box"
               :parent="true"
               @activated="$emit('activated', component.id)"
               @init="onDraggerChanged"
               @resizestop="onDraggerChanged"
               @dragstop="onDraggerChanged">
        <component v-if="component.type === 'scada-svg'"
                   :is="'scada-svg'"
                   class="scada-svg-wrapper"
                   :svg="component.innerSvg"
                   :params="component.params"/>
        <component v-else
                   :is="component.type"
                   :value="component.value"
                   :params="component.params"
                   width="100%"
                   height="100%"/>
      </dragger>
    </drop>
  </div>
</template>
<script>
  import Dragger from '../components/Dragger/dragger.vue'
  import { Drop } from 'vue-drag-drop'
  import _ from 'lodash'

  import scadaGuage from '@/components/Scada/Basic/Guage.vue'
  import scadaLevelbar from '@/components/Scada/Basic/LevelBar.vue'
  import scadaLabel from '@/components/Scada/Basic/Label.vue'
  import scadaSvg from '@/components/Scada/Basic/Svg.vue'

  export default {
    components: {
      Dragger, Drop,
      scadaGuage,
      scadaLevelbar,
      scadaLabel,
      scadaSvg
    },
    props: {
      components: null,
      canvasStyle: null
    },
    data() {
      return {}
    },
    computed: {},
    methods: {
      handleCompDrop(data, e) {
        const d = _.cloneDeep(data)
        const r = (d.size.keepRatio) ? (d.size.height / d.size.width) : 0
        const layout = {
          x: e.offsetX,
          y: e.offsetY,
          width: d.size.width,
          height: d.size.height,
          ratio: r
        }
        d.layout = layout
//        this.addComp(d.type, layout, d.attrs, d.params)
        this.$emit('addDropedComp', d)
      },
      onDraggerChanged(guid, x, y, w, h) {
        this.$emit('compLayoutChanged', { guid, x, y, w, h })
      }
    }
  }
</script>
<style lang="scss">
  #workarea {
    flex-grow: 1;
    background-color: #BBB;
    overflow: auto;
  }

  #canvas {
    margin: 10px;
    background-color: #FFF;
    border: 1px solid #999;
    position: relative;
    box-shadow: 1px 1px 5px #999;
    .scada-svg-wrapper {
      width: 100%;
      height: 100%;
    }
  }

  .drag-box {
    border: 1px solid transparent;
  }

  .active {
    border: 1px dashed #43b5ff;
  }
</style>
