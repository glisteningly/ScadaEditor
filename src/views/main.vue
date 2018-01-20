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
      <div id="left_panel" class="tools_panel">
        <tools-panel v-show="isShowEditor"/>
      </div>
      <work-area v-show="isShowEditor"
                 :components="components"
                 :canvasStyle="canvasStyle"
                 @addDropedComp="onAddDropedComp"
                 @activated="onActivate"
                 @compLayoutChanged="onDraggerChanged"/>
      <preview-code v-if="isShowCode" :scadaTemplate="scadaTemplate"/>
      <preview-scada v-if="isShowPreview" :initiated="isSvgViewInitiated" :testData="testBindData"/>
      <div id="right_panel" class="tools_panel">
        <div v-show="(this.currentCompIndex !== -1) && isShowEditor">
          <section id="attr_panel" v-show="isShowAttrPanel">
            <div class="title-label">数据绑定</div>
            <div class="panel-content">
              <template v-for="attr in currentAttrs">
                <div class="ctrl-item">
                  <label class="bind-label">{{attr.label}}</label>
                  <el-row>
                    <el-col :span="24">
                      <el-cascader
                        placeholder="请选择数据点"
                        :visible-arrow="false"
                        :options="options2"
                        :separator="'.'"
                        :clearable="true"
                        @active-item-change=""
                        @change="compValInputChanged"
                        v-model="attr.bind"
                        :props="props"/>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-input class="attr-input"
                                v-model="attr.value"
                                @change="compValInputChanged"/>
                    </el-col>
                    <el-col :span="12"><label class="label-preview">[ 预览值 ]</label></el-col>
                  </el-row>
                </div>
              </template>
            </div>
          </section>
          <section id="layout_panel">
            <div class="title-label">位置尺寸</div>
            <div class="panel-content">
              <el-row>
                <el-col :span="6">
                  <el-input-number :controls=false v-model="curCompX"></el-input-number>
                </el-col>
                <el-col :span="6">
                  <el-input-number :controls=false v-model="curCompY"></el-input-number>
                </el-col>
                <el-col :span="6">
                  <el-input-number :controls=false v-model="curCompW"></el-input-number>
                </el-col>
                <el-col :span="6">
                  <el-input-number :controls=false v-model="curCompH"></el-input-number>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <span>X</span>
                </el-col>
                <el-col :span="6">
                  <span>Y</span>
                </el-col>
                <el-col :span="6">
                  <span>W</span>
                </el-col>
                <el-col :span="6">
                  <span>H</span>
                </el-col>
              </el-row>
            </div>
          </section>
          <section id="param_panel" v-show="isShowCtrlPanel">
            <div class="title-label">组件参数</div>
            <div class="panel-content">
              <template v-for="ctrl in currentCtrls">
                <div class="ctrl-item">
                  <el-row>
                    <el-col :span="6"><label>{{ctrl.label}}</label></el-col>
                    <el-col :span="6">
                      <component
                        :is="getCtrlTyp(ctrl.type)"
                        v-model="ctrl.value"
                        @change="compValInputChanged"
                      />
                    </el-col>
                  </el-row>
                </div>
              </template>
            </div>
          </section>
        </div>
        <section id="test_panel" v-show="isShowPreview">
          <div class="title-label">数据测试</div>
          <div class="panel-content">
            <template v-for="(val1, key1) in testBindData">
              <div class="ctrl-item">
                <label class="bind-label">{{`[ ${key1} ]`}}</label>
                <template v-for="(val2, key2) in val1">
                  <el-row>
                    <el-col :span="6"><label>{{`• ${key2}`}}</label></el-col>
                    <el-col :span="18">
                      <el-input v-model="val1[key2]"/>
                      <!--<label>{{val}}</label>-->
                    </el-col>
                  </el-row>
                </template>
              </div>
            </template>
          </div>
        </section>
      </div>
    </div>
    <div id="bottom_bar"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import scadaGuage from '@/components/Scada/Basic/Guage.vue'
  import scadaLevelbar from '@/components/Scada/Basic/LevelBar.vue'
  import scadaLabel from '@/components/Scada/Basic/Label.vue'
  import Guid from '@/utils/guid'
  import _ from 'lodash'

  const jstoxml = require('jstoxml')
  import ActionBar from './actionBar.vue'
  import ToolsPanel from './toolsPanel.vue'
  import PreviewCode from './previewCode.vue'
  import PreviewScada from './previewScada.vue'
  import WorkArea from './workArea.vue'

  export default {
    components: {
      ActionBar,
      ToolsPanel,
      PreviewCode,
      PreviewScada,
      WorkArea,
      scadaGuage,
      scadaLevelbar,
      scadaLabel
//      scadaSvg,

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
        previewCompName: 'div',
        isSvgViewInitiated: false,
        canvasW: 1200,
        canvasH: 700,
        color1: '#409EFF',
        bindField: 'value',
        testBindData: { datamodel1: { field1: 33, field2: 44 }, datamodel2: { field3: 55, field4: 66 } },
        options2: [{
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
        props: {
          value: 'label',
          children: 'cities'
        }
      }
    },
    methods: {
      addComp(compName, layout = { x: 0, y: 0, width: 100, height: 100 }, attrs = [], params = []) {
        const guid = Guid()
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
        this.components.push({
          id: guid,
          type: compName,
          active: true,
          layout: layout,
          attrs: attrs,
          value: v,
          paramControls: params,
          params: p,
          bind: {}
        })
      },
      onAddDropedComp(d) {
        this.addComp(d.type, d.layout, d.attrs, d.params)
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
          if (clonedComp.type === 'scada-svg') {
            this.addCompSvg(layout, clonedComp.inner)
          } else {
            this.addComp(clonedComp.type, layout, clonedComp.attrs, clonedComp.paramControls)
          }
        }
      },
      onMoveToFront() {
        if (this.currentCompIndex !== -1) {
          const c = this.components[this.currentCompIndex]
          this.components.splice(this.currentCompIndex, 1)
          this.components.push(c)
        }
      },
      onMoveToBack() {
        if (this.currentCompIndex !== -1) {
          const c = this.components[this.currentCompIndex]
          this.components.splice(this.currentCompIndex, 1)
          this.components.unshift(c)
        }
      },
      onActivate(guid) {
        // 同步之前选中组件的数值
        if (this.currentCompIndex !== -1) {
          this.syncCompValues(this.components[this.currentCompIndex])
        }
        this.components.forEach((item) => {
          if (item.guid !== guid) {
            item.active = false
          }
        })
        this.isCompEditing = true
        this.curActivedId = guid
      },
      onDeactivate() {
        this.curActivedId = -1
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
      getTemplate() {
        const comps = []
//        this.syncAllCompValues()
        this.components.forEach((item) => {
          if (item.type === 'scada-svg') {
            const el = document.getElementById(item.id)
            if (!el) {
              return
            }
            const elSvg = el.getElementsByTagName('svg')
            const innerSvg = elSvg[0].innerHTML
            comps.push({
              _name: 'svg',
              _attrs: {
                'x': item.layout.x,
                'y': item.layout.y,
                'width': item.layout.width,
                'height': item.layout.height,
                'viewBox': elSvg[0].getAttribute('viewBox')
              },
              _content: innerSvg
            })
          } else {
            const attrs = {
              'x': item.layout.x,
              'y': item.layout.y,
              'width': item.layout.width,
              'height': item.layout.height
//              ':params': JSON.stringify(item.params).replace(/\"/g, "'")
            }
            if (Object.getOwnPropertyNames(item.params).length > 1) {
              Object.assign(attrs, { ':params': JSON.stringify(item.params).replace(/\"/g, "'") })
            }
            if (Object.getOwnPropertyNames(item.bind).length > 1) {
              Object.assign(attrs, { ':value': JSON.stringify(item.bind).replace(/\"/g, '') })
            }
            comps.push({
              _name: item.type,
              _attrs: attrs
            })
          }
        })
        return comps
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
        this.scadaTemplate = this.$prettyDom(jstoxml.toXML(this.getTemplate()))
      },
      onShowPreview() {
        this.isShowCode = false
        this.isShowEditor = false
        this.isShowPreview = true
//        this.isSvgViewInitiated = false
//        Vue.component('ScadaView', {})
        const compStr = jstoxml.toXML(this.getTemplate())
        const templateStr = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.canvasW} ${this.canvasH}" preserveAspectRatio="xMidYMid meet"
	                          >${compStr}</svg>`
        Vue.component('ScadaView', {
          props: {
            value: {
              type: Object
            }
          },
          template: templateStr,
          components: { scadaGuage, scadaLevelbar, scadaLabel }
        })
//        this.previewCompName = 'ScadaView'
        this.isSvgViewInitiated = true
      },
      handleKeyup(e) {
        switch (e.which) {
          case 8:
          case 46: {
            this.onRemoveCurrentComp()
            break
          }
        }
      },
      addCompSvg(layout = { x: 100, y: 100, width: 400, height: 400 }, svgStr) {
        const guid = Guid()
        this.onActivate(guid)
        this.components.push({
          id: guid,
          type: 'scada-svg',
          active: true,
          layout: layout,
          value: null,
          inner: svgStr
        })
      },
      onActionImportSvg(svgStr) {
        this.addCompSvg({ x: 100, y: 100, width: 400, height: 400 }, svgStr)
      },
      onInputFocus(e) {
        if (e.target.nodeName === 'INPUT') {
          this.isCompEditing = false
        }
      },
      onInputBlur() {
        this.isCompEditing = true
      },
      getCtrlTyp(type) {
        switch (type) {
          case 'Color' :
            return 'el-color-picker'
          case 'Number':
            return 'el-input'
          default:
            return 'el-input'
        }
      },
      onActionSaveDoc() {
        localStorage.setItem('savedComps', JSON.stringify(this.components))
      },
      onActionLoadDoc() {
        this.components = JSON.parse(localStorage.getItem('savedComps'))
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
      curCompX: {
        set(v) {
          if (this.currentCompIndex !== -1) {
            this.components[this.currentCompIndex].layout.x = Math.round(v)
          }
        },
        get() {
          if (this.currentCompIndex !== -1) {
            return this.components[this.currentCompIndex].layout.x
          }
        }
      },
      curCompY: {
        set(v) {
          if (this.currentCompIndex !== -1) {
            this.components[this.currentCompIndex].layout.y = Math.round(v)
          }
        },
        get() {
          if (this.currentCompIndex !== -1) {
            return this.components[this.currentCompIndex].layout.y
          }
        }
      },
      curCompW: {
        set(v) {
          if (this.currentCompIndex !== -1) {
            this.components[this.currentCompIndex].layout.width = Math.round(v)
          }
        },
        get() {
          if (this.currentCompIndex !== -1) {
            return this.components[this.currentCompIndex].layout.width
          }
        }
      },
      curCompH: {
        set(v) {
          if (this.currentCompIndex !== -1) {
            this.components[this.currentCompIndex].layout.height = Math.round(v)
          }
        },
        get() {
          if (this.currentCompIndex !== -1) {
            return this.components[this.currentCompIndex].layout.height
          }
        }
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
    },
    beforeMount() {
    },
    beforeDestroy: function () {
      document.documentElement.removeEventListener('keyup', this.handleKeyup)
      document.documentElement.removeEventListener('focus', this.onInputFocus, true)
      document.documentElement.removeEventListener('blur', this.onInputBlur, true)
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

  .tools_panel {
    font-size: 12px;
    .title-label {
      font-size: 12px;
      background-color: #CCC;
      padding: 6px;
      color: #333;
    }
    .panel-content {
      padding: 6px 6px 12px 6px;
      border-bottom: 1px solid #BBB;
    }
  }

  #left_panel {
    width: 180px;
    flex: 0 0 180px;
    background-color: #EEE;
    border-right: 1px solid #AAA;
  }

  #right_panel {
    width: 250px;
    flex: 0 0 250px;
    background-color: #EEE;
    border-left: 1px solid #AAA;
  }

  #layout_panel {
    .panel-content {
      margin-top: 4px;
    }
    input {
      text-align: center !important;
    }
    .el-col {
      padding: 0 4px;
    }
    .el-col > span {
      padding-top: 4px;
      display: block;
      text-align: center;
    }
  }

  #attr_panel {
    .panel-content {
      padding-top: 0;
    }
  }

  .ctrl-item {
    margin: 4px 4px;
    label {
      display: block;
      margin-top: 6px;
      padding-left: 2px;
    }
    label.bind-label {
      margin-bottom: 6px;
      margin-top: 10px;
    }
    label.label-preview {
      color: #666;
    }
    .attr-input input {
      max-width: 100px !important;
    }
    .el-col {
      margin-bottom: 4px;
    }
    .el-cascader {
      width: 100%;
      margin-bottom: 2px;
    }
  }
</style>
