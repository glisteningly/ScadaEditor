<template>
  <div id="workarea" @mousedown.stop="onCancle">
    <drop id="canvas" :style="canvasStyle" @drop="handleCompDrop" ref="canvas" class="grid-bg">
      <dragger v-for="component in components.slice().reverse()"
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
        <component v-else-if="component.type === 'scada-svg-comp'"
                   :is="'scada-svg-comp'"
                   class="scada-svg-wrapper"
                   :name="component.name"
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
  import scadaSvgComp from '@/components/Scada/Basic/SvgComp.vue'

  export default {
    components: {
      Dragger, Drop,
      scadaGuage,
      scadaLevelbar,
      scadaLabel,
      scadaSvg,
      scadaSvgComp
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
        if (!data) {
          return
        }
        const canvasX = document.getElementById('canvas').offsetLeft
        const canvasY = document.getElementById('canvas').offsetTop
        const scrollX = document.getElementById('workarea').scrollLeft
        const scrollY = document.getElementById('workarea').scrollTop
        const d = _.cloneDeep(data)
        const r = (d.config.keepRatio) ? (d.config.height / d.config.width) : 0
        const layout = {
          x: e.clientX - canvasX + scrollX,
          y: e.clientY - canvasY + scrollY,
          width: d.config.width,
          height: d.config.height,
          ratio: r
        }
        d.layout = layout
        if (d.config.compType) {
          if (d.config.compType === 'svg') {
            this.$emit('addDropedCompSvg', d)
            return
          }
        }
        this.$emit('addDropedComp', d)
      },
      onDraggerChanged(guid, x, y, w, h) {
        this.$emit('compLayoutChanged', { guid, x, y, w, h })
      },
      onCancle() {
        this.$emit('compSelCanceled')
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
    svg {
      position: absolute;
    }
  }

  .active {
    border: 1px dashed #43b5ff;
  }

  .grid-bg{
    background: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202%202%22%3E%3Cpath%20d%3D%22M1%202V0h1v1H0v1z%22%20fill-opacity%3D%22.05%22%2F%3E%3C%2Fsvg%3E");
    background-size: 16px 16px;
    /*background-color: #f2f2f2;*/
    transition: background-color 0.2s ease-in-out;
  }
</style>
