<template>
  <div id="scade_editor">
    <action-bar :isShowCode="isShowCode"
                :isShowPreview="isShowPreview"
                :isShowEditor="isShowEditor"
                @actionSaveDoc="onActionSaveDoc"
                @actionLoadDoc="onActionLoadDoc"
                @actionImportSvg="onActionImportSvg"
                @actionShowEditor="onShowEditor"
                @actionShowPreview="onShowPreview"
                @actionShowCodeView="onShowCodeView"
                @actionRemoveCurrentComp="onRemoveCurrentComp"
                @actionDuplicateCurrentComp="onDuplicateCurrentComp"
                @actionMoveToFront="onMoveToFront"
                @actionMoveToBack="onMoveToBack"/>
    <div class="main">
      <scada-defs/>
      <div id="left_panel" class="tools_panel">
        <tools-panel v-show="isShowEditor"/>
        <complist-panel v-show="isShowEditor"
                        :components="components"
                        @compSelected="onActivate"/>
      </div>
      <preview-code v-if="isShowCode" :scadaTemplate="scadaTemplate"/>
      <preview-scada v-if="isShowPreview" :tplStr="scadaTplStr" :initiated="isSvgViewInitiated"
                     :testData="testBindData"/>
      <work-area v-show="isShowEditor"
                 :components="components"
                 :canvasStyle="canvasStyle"
                 @addDropedComp="onAddDropedComp"
                 @addDropedCompSvg="onAddDropedCompSvg"
                 @activated="onActivate"
                 @compSelCanceled="unSelCurComp"
                 @compLayoutChanged="onDraggerChanged"/>
      <div id="right_panel" class="tools_panel">
        <div v-show="(this.currentCompIndex !== -1) && isShowEditor">
          <attrs-panel v-show="isShowAttrPanel"
                       :compAttrs="currentAttrs"
                       :dataBinds="optionsDemo"
                       @compValInputChanged="compValInputChanged"/>
          <layout-panel v-if="this.currentCompIndex > -1" :layout="components[this.currentCompIndex].layout"/>
          <params-panel v-show="isShowCtrlPanel"
                        :compAttrs="currentCtrls"
                        @compValInputChanged="compValInputChanged"/>
        </div>
        <test-panel v-show="isShowPreview" :bindData="testBindData"/>
      </div>
    </div>
    <div id="bottom_bar"></div>
  </div>
</template>

<script>
  import Guid from '@/utils/guid'
  import _ from 'lodash'
  import axios from 'axios'
  import compParamsConfig from '@/components/Scada/config'

  import ScadaVueTpl from '@/utils/scadaVueTpl'
  import ActionBar from './actionBar.vue'
  import ToolsPanel from './toolsPanel.vue'
  import PreviewCode from './previewCode.vue'
  import PreviewScada from './previewScada.vue'
  import WorkArea from './workArea.vue'
  import LayoutPanel from './layoutPanel.vue'
  import AttrsPanel from './attrsPanel.vue'
  import ParamsPanel from './paramsPanel.vue'
  import TestPanel from './testPanel.vue'
  import ComplistPanel from './complistPanel.vue'
  import ScadaDefs from './scadaDefs.vue'

  export default {
    components: {
      ActionBar,
      ToolsPanel,
      PreviewCode,
      PreviewScada,
      WorkArea,
      LayoutPanel,
      AttrsPanel,
      ParamsPanel,
      TestPanel,
      ComplistPanel,
      ScadaDefs
    },
    data() {
      return {
        components: [],
        curActivedId: -1,
        scadaTemplate: '',
        isShowCode: false,
        isShowPreview: false,
        isShowEditor: true,
        isCompEditing: false,
        isSvgViewInitiated: false,
        scadaTplStr: null,
        canvasW: 1000,
        canvasH: 600,
        color1: '#409EFF',
        bindField: 'value',
        testBindData: { datamodel1: { field1: 33, field2: 44 }, datamodel2: { field3: 55, field4: 66 } },
        optionsDemo: [{
          label: 'datamodel1',
          cities: [{
            value: 'field1',
            label: 'field1'
          }, {
            value: 'field2',
            label: 'field2'
          }]
        }, {
          label: 'datamodel2',
          cities: [{
            value: 'field3',
            label: 'field3'
          }, {
            value: 'field4',
            label: 'field4'
          }]
        }],
        compLabelState: {}
      }
    },
    methods: {
      addComp(compName, label,
              layout = { x: 0, y: 0, width: 100, height: 100, ratio: 0 },
              attrs = [], params = [], innerSvg) {
        const guid = Guid()
        const newLabel = this.getCompLabel(label)
        this.onActivate(guid)
        const v = {}
        attrs.forEach((attr) => {
          attr.bind = []
          Object.assign(v, { [attr.name]: attr.value })
        })
        const p = {}
        params.forEach((param) => {
          Object.assign(p, { [param.name]: param.value })
        })
        const newComp = {
          id: guid,
          label: newLabel,
          type: compName,
          active: true,
          layout: layout,
          attrs: attrs,
          value: v,
          paramControls: params,
          params: p,
          bind: {}
        }
        if (innerSvg) {
          Object.assign(newComp, { innerSvg })
        }
//        this.components.push(newComp)
        this.components.unshift(newComp)
      },
      getCompLabel(label) {
        if (this.compLabelState[label]) {
          this.compLabelState[label] += 1
        } else {
          Object.assign(this.compLabelState, { [label]: 1 })
        }
        return label + `-${this.compLabelState[label]}`
      },
      onAddDropedComp(d) {
        this.addComp(d.type, d.config.label, d.layout, d.attrs, d.params)
      },
      onAddDropedCompSvg(d) {
        if (d.config.rotatable) {
          d.params.push(Object.assign({}, compParamsConfig.rotateParam))
        }
        if (d.config.colorMask) {
          d.params.push(Object.assign({}, compParamsConfig.colorMaskParam))
        }
        try {
          axios.get(d.config.compSource).then((response) => {
            this.addComp('scada-svg', d.config.label, d.layout, [], d.params, response.data)
          })
        } catch (e) {
          console.log(e)
        }
      },
      addStaticSvg(layout = { x: 200, y: 200, width: 300, height: 300 }, svgStr) {
        const params = [Object.assign({}, compParamsConfig.rotateParam)]
        this.addComp('scada-svg', '导入svg', layout, [], params, svgStr)
      },
      onRemoveCurrentComp() {
        if (this.isCompEditing) {
          const index = _.findIndex(this.components, { id: this.curActivedId })
          if (index >= 0) {
            this.components.splice(index, 1)
          }
        }
      },
      onDuplicateCurrentComp() {
        const index = _.findIndex(this.components, { id: this.curActivedId })
        if (index >= 0) {
          const clonedComp = _.cloneDeep(this.components[index])
          const layout = clonedComp.layout
          layout.x += 10
          layout.y += 10
          const i = clonedComp.label.lastIndexOf('-')
          const newLabel = (i > -1) ? clonedComp.label.slice(0, i) : clonedComp.label
          this.addComp(clonedComp.type, newLabel, layout, clonedComp.attrs, clonedComp.paramControls, clonedComp.innerSvg)
        }
      },
      onMoveToFront() {
        if (this.currentCompIndex !== -1) {
          const c = this.components[this.currentCompIndex]
          this.components.splice(this.currentCompIndex, 1)
//          this.components.push(c)
          this.components.unshift(c)
        }
      },
      onMoveToBack() {
        if (this.currentCompIndex !== -1) {
          const c = this.components[this.currentCompIndex]
          this.components.splice(this.currentCompIndex, 1)
//          this.components.unshift(c)
          this.components.push(c)
        }
      },
      onActivate(guid) {
        // 同步之前选中组件的数值
        if (this.currentCompIndex !== -1) {
          this.syncCompValues(this.components[this.currentCompIndex])
        }
        this.components.forEach((item) => {
//          if (item.guid === guid) {
//            item.active = true
//          } else {
//            item.active = false
//          }
          item.active = (item.id === guid)
        })
        this.isCompEditing = true
        this.curActivedId = guid
      },
//      onResizing(x, y, w, h) {
//        if (this.currentCompIndex !== -1) {
//          this.components[this.currentCompIndex].layout.width = w
//          this.components[this.currentCompIndex].layout.height = h
//          this.components[this.currentCompIndex].layout.x = x
//          this.components[this.currentCompIndex].layout.y = y
//        }
//      },
//      onDragging(x, y, w, h) {
//        if (this.currentCompIndex !== -1) {
//          this.components[this.currentCompIndex].layout.x = x
//          this.components[this.currentCompIndex].layout.y = y
//        }
//      },
      onDraggerChanged(d) {
        const index = _.findIndex(this.components, { id: d.guid })
        if (index !== -1) {
          this.components[index].layout.x = d.x
          this.components[index].layout.y = d.y
          this.components[index].layout.width = d.w
          this.components[index].layout.height = d.h
        }
      },
      unSelCurComp() {
        if (this.currentCompIndex !== -1) {
          this.components[this.currentCompIndex].active = false
        }
        this.curActivedId = -1
      },
      onShowEditor() {
        this.isShowPreview = false
        this.isShowCode = false
        this.isShowEditor = true
      },
      onShowCodeView() {
        this.isShowPreview = false
        this.isShowEditor = false
        this.isShowCode = true
        this.scadaTemplate = this.$prettyDom(ScadaVueTpl.getCompStr(this.components))
      },
      onShowPreview() {
        this.isShowCode = false
        this.isShowEditor = false
        this.isShowPreview = true
        ScadaVueTpl.initScadaComp(this.components, { w: this.canvasW, h: this.canvasH })
        this.isSvgViewInitiated = true
      },
      moveCompPos(direction) {
        if (this.currentCompIndex !== -1) {
          switch (direction) {
            case 'up':
              this.components[this.currentCompIndex].layout.y -= 1
              break
            case 'down':
              this.components[this.currentCompIndex].layout.y += 1
              break
            case 'left':
              this.components[this.currentCompIndex].layout.x -= 1
              break
            case 'right':
              this.components[this.currentCompIndex].layout.x += 1
              break
          }
        }
      },
      handleKeyup(e) {
//        console.log(e.which)
        switch (e.which) {
          case 37: {
            this.moveCompPos('left')
            break
          }
          case 39: {
            this.moveCompPos('right')
            break
          }
          case 38: {
            this.moveCompPos('up')
            break
          }
          case 40: {
            this.moveCompPos('down')
            break
          }
          case 8:
          case 46: {
            this.onRemoveCurrentComp()
            break
          }
        }
      },
      onActionImportSvg(svgStr) {
        this.addStaticSvg({ x: 100, y: 100, width: 400, height: 400 }, svgStr)
      },
      onInputFocus(e) {
        if (e.target.nodeName === 'INPUT') {
          this.isCompEditing = false
        }
      },
      onInputBlur() {
        this.isCompEditing = true
      },
      onWindowResized() {
        this.$events.emit('windowResized')
      },
      onActionSaveDoc() {
        const saveSlot = {
          curActivedId: this.curActivedId,
          componentList: this.components
        }
        localStorage.setItem('saveSlot', JSON.stringify(saveSlot))
      },
      onActionLoadDoc() {
        const saveSlot = JSON.parse(localStorage.getItem('saveSlot'))
        if (saveSlot) {
          this.components = saveSlot.componentList
          this.curActivedId = saveSlot.curActivedId
        }
      },
      syncCompValues(comp) {
        const p = {}
        const v = {}
        const b = {}
        if (comp.paramControls) {
          comp.paramControls.forEach((param) => {
            Object.assign(p, { [param.name]: param.value })
          })
          comp.params = p
        }
        if (comp.attrs) {
          comp.attrs.forEach((attr) => {
            if (attr.bind.length > 0) {
              let bindStr = `${this.bindField}`
              attr.bind.forEach((f) => {
                bindStr += `.${f}`
              })
              Object.assign(b, { [attr.name]: bindStr })
            }
            Object.assign(v, { [attr.name]: attr.value })
          })
          comp.bind = b
          comp.value = v
        }
      },
      syncAllCompValues() {
        this.components.forEach((comp) => {
          this.syncCompValues(comp)
        })
      },
      compValInputChanged() {
        if (this.currentCompIndex !== -1) {
          this.syncCompValues(this.components[this.currentCompIndex])
        }
      }
    },
    computed: {
      canvasStyle() {
        return {
          width: this.canvasW + 'px',
          height: this.canvasH + 'px'
        }
      },
      currentCompIndex() {
        return _.findIndex(this.components, { id: this.curActivedId })
      },
      currentCtrls: {
        get() {
          if (this.currentCompIndex !== -1) {
            return this.components[this.currentCompIndex].paramControls
          } else {
            return []
          }
        }
      },
      currentAttrs: {
        get() {
          if (this.currentCompIndex !== -1) {
            return this.components[this.currentCompIndex].attrs
          } else {
            return []
          }
        }
      },
      isShowCtrlPanel() {
        if (this.currentCompIndex !== -1) {
          if (this.components[this.currentCompIndex].paramControls) {
            if (this.components[this.currentCompIndex].paramControls.length > 0) {
              return true
            }
          }
        }
        return false
      },
      isShowAttrPanel() {
        if (this.currentCompIndex !== -1) {
          if (this.components[this.currentCompIndex].attrs) {
            if (this.components[this.currentCompIndex].attrs.length > 0) {
              return true
            }
          }
        }
        return false
      }
    },
    created: function () {
    },
    mounted() {
      document.documentElement.addEventListener('keyup', this.handleKeyup)
      document.documentElement.addEventListener('focus', this.onInputFocus, true)
      document.documentElement.addEventListener('blur', this.onInputBlur, true)
      window.addEventListener('resize', this.onWindowResized)
    },
    beforeMount() {
    },
    beforeDestroy: function () {
      document.documentElement.removeEventListener('keyup', this.handleKeyup)
      document.documentElement.removeEventListener('focus', this.onInputFocus, true)
      document.documentElement.removeEventListener('blur', this.onInputBlur, true)
      window.removeEventListener('resize', this.onWindowResized)
    },
    watch: {}
  }
</script>

<style lang="scss">
  @import "../styles/mixin.scss";

  #scade_editor {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #DDD;
  }

  #bottom_bar {
    width: 100%;
    height: 24px;
    background-color: #EEE;
    border-top: 1px solid #AAA;
    padding: 4px;
  }

  .main {
    width: 100%;
    display: flex;
    flex-grow: 1;
  }

  #left_panel {
    display: flex;
    width: 180px;
    flex: 0 0 180px;
    flex-direction: column;
    background-color: #EEE;
    border-right: 1px solid #AAA;
  }

  #right_panel {
    width: 250px;
    flex: 0 0 250px;
    background-color: #EEE;
    border-left: 1px solid #AAA;
  }
</style>
