<template>
  <div id="scade_editor">
    <div id="top_bar">
      <el-row>
        <el-col :span="3">
          <div>
            <el-dropdown size="medium" @command="handleMenuCommand">
              <el-button plain size="small" @click="" icon="el-icon-menu">文档</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="save">保存</el-dropdown-item>
                <el-dropdown-item command="load">读取</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button plain size="small" @click="" icon="el-icon-setting"></el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <div>
            <div class="upload-btn-wrapper">
              <el-button type="prime" size="small" icon="el-icon-plus">导入svg</el-button>
              <input type="file" name="myfile" @change="onImportSvg" ref="uploadSvg"/>
            </div>
          </div>
        </el-col>
        <el-col :span="15">
          <div>
            <!--<el-button type="prime" size="small" @click="addCompSvg(demoSvg)" icon="el-icon-plus">测试svg</el-button>-->
            <el-button-group>
              <el-button plain size="small" @click="showEditor" :class="{isActiveBtn: isShowEditor}">
                <i class="el-icon-edit-outline"></i> 设计
              </el-button>
              <el-button plain size="small" @click="showPreview" :class="{isActiveBtn: isShowPreview}">
                <i class="el-icon-view"></i> 预览
              </el-button>
              <el-button plain size="small" @click="showCodeView" :class="{isActiveBtn: isShowCode}">
                <> 代码
              </el-button>
            </el-button-group>
            <el-button-group>
              <el-button plain type="danger" size="small" @click="removeCurrentComp" icon="el-icon-delete"></el-button>
              <el-button plain size="small" @click="duplicateCurrentComp" icon="el-icon-plus"></el-button>
            </el-button-group>
            <el-button-group>
              <el-button plain size="small" @click="moveToFront" icon="el-icon-upload2"></el-button>
              <el-button plain size="small" @click="moveToBack" icon="el-icon-download"></el-button>
            </el-button-group>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button plain size="small" @click="" icon="el-icon-news">数据源</el-button>
          <el-button plain type="primary" size="small" @click="" icon="el-icon-upload">发布</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="main">
      <div id="left_panel" class="tools_panel">
        <div v-show="isShowEditor">
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
        </div>
      </div>
      <div id="pre_code" v-show="isShowCode">
        <pre v-highlightjs="scadaTemplate"><code class="html"></code></pre>
      </div>
      <div id="pre_view" v-show="isShowPreview">
        <div id="scada_container">
          <component :is="previewCompName" id="scada_view" :value="testBindData"></component>
        </div>
      </div>
      <div id="workarea" v-show="isShowEditor">
        <drop id="canvas" :style="canvasStyle" @drop="handleCompDrop">
          <dragger v-for="component in components"
                   :id="component.id"
                   :key="component.id"
                   :active.sync="component.active"
                   :w="component.layout.width"
                   :h="component.layout.height"
                   :x="component.layout.x"
                   :y="component.layout.y"
                   class="drag-box"
                   :parent="true"
                   @activated="onActivate(component.id)"
                   @deactivated="onDeactivate"
                   @init="onDraggerChanged"
                   @resizestop="onDraggerChanged"
                   @dragstop="onDraggerChanged">
            <component v-if="component.type === 'scada-svg'"
                       :is="'scada-svg'"
                       class="scada-svg-wrapper"
                       v-html="component.inner"/>
            <component v-else
                       :is="component.type"
                       :value="component.value"
                       :params="component.params"
                       width="100%"
                       height="100%"/>
          </dragger>
        </drop>
      </div>
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
                                @change="compValInputChanged"
                      />
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
            <!--<template v-for="ctrl in currentCtrls">-->
            <div class="ctrl-item">
              <el-row>
                <el-col :span="6"><label>field1</label></el-col>
                <el-col :span="18">
                  <el-input v-model="testBindData.datamodel1.field1"/>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6"><label>field2</label></el-col>
                <el-col :span="18">
                  <el-input v-model="testBindData.datamodel1.field2"/>
                </el-col>
              </el-row>
            </div>

            <!--</template>-->
          </div>
        </section>
      </div>
    </div>
    <div id="bottom_bar"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Dragger from '../components/Dragger/dragger.vue'
  import scadaGuage from '@/components/Scada/Basic/Guage.vue'
  import scadaLevelbar from '@/components/Scada/Basic/LevelBar.vue'
  import scadaLabel from '@/components/Scada/Basic/Label.vue'
  import scadaSvg from '@/components/Scada/Basic/Svg.vue'
  //  import svgStr from '@/api/getSvg2'
  import Guid from '@/utils/guid'
  import _ from 'lodash'
  // 代码高亮样式
  import '@/assets/css/highlight/default.css'
  import '@/assets/css/highlight/Atom-One-Light.css'
  import { Drag, Drop } from 'vue-drag-drop'
  import scadaComps from '@/components/Scada/Basic'

  const jstoxml = require('jstoxml')

  export default {
    components: { Dragger, scadaGuage, scadaLevelbar, scadaLabel, scadaSvg, Drag, Drop },
    data() {
      return {
        components: [],
        curActivedId: -1,
        scadaTemplate: '',
        isShowCode: false,
        isShowPreview: false,
        isShowEditor: true,
//        demoSvg: svgStr,
        isCompEditing: false,
        previewCompName: 'div',
        canvasW: 1200,
        canvasH: 700,
        compTools: [],
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
      addComp(compName, layout = { x: 0, y: 0, width: 100, height: 100 }, attrs, params) {
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
      handleCompDrop(data, e) {
        const d = _.cloneDeep(data)
        const layout = {
          x: e.offsetX,
          y: e.offsetY,
          width: d.size.width,
          height: d.size.height
        }
        this.addComp(d.type, layout, d.attrs, d.params)
      },
      removeCurrentComp() {
        if (this.isCompEditing) {
          const index = _.findIndex(this.components, { id: this.curActivedId })
          if (index >= 0) {
            this.components.splice(index, 1)
          }
        }
      },
      duplicateCurrentComp() {
        const index = _.findIndex(this.components, { id: this.curActivedId })
        if (index >= 0) {
          const clonedComp = _.cloneDeep(this.components[index])
          const layout = clonedComp.layout
          layout.x += 10
          layout.y += 10
          this.addComp(clonedComp.type, layout, clonedComp.attrs, clonedComp.paramControls)
        }
      },
      moveToFront() {
        if (this.currentCompIndex !== -1) {
          const c = this.components[this.currentCompIndex]
          this.components.splice(this.currentCompIndex, 1)
          this.components.push(c)
        }
      },
      moveToBack() {
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
      onDraggerChanged(guid, x, y, w, h) {
        const index = _.findIndex(this.components, { id: guid })
        if (index !== -1) {
          this.components[index].layout.x = x
          this.components[index].layout.y = y
          this.components[index].layout.width = w
          this.components[index].layout.height = h
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
      showEditor() {
        this.isShowPreview = false
        this.isShowCode = false
        this.isShowEditor = true
      },
      showCodeView() {
        this.isShowPreview = false
        this.isShowEditor = false
        this.isShowCode = true
        this.scadaTemplate = this.$prettyDom(jstoxml.toXML(this.getTemplate()))
      },
      showPreview() {
        this.isShowCode = false
        this.isShowEditor = false
        this.isShowPreview = true
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
        this.previewCompName = 'ScadaView'
      },
      handleKeyup(e) {
//        console.log(e.which)
        switch (e.which) {
          case 8:
          case 46: {
            this.removeCurrentComp()
            break
          }
        }
      },
      addCompSvg(svg) {
        const guid = Guid()
        this.onActivate(guid)
        this.components.push({
          id: guid,
          type: 'scada-svg',
          active: true,
          layout: { x: 200, y: 200, width: 400, height: 400 },
          value: null,
          inner: svg
        })
      },
      onImportSvg(e) {
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
//          console.log(e.target.result)
          this.addCompSvg(e.target.result)
          this.$refs.uploadSvg.value = ''
        }
        reader.readAsText(files[0])
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
//      // 参数值改变
//      paramValChanged() {
//        if (this.currentCompIndex !== -1) {
//          const p = {}
//          this.components[this.currentCompIndex].paramControls.forEach((param) => {
//            Object.assign(p, { [param.name]: param.value })
//          })
//          this.components[this.currentCompIndex].params = p
//        }
//      },
//      // 属性值改变
//      attrValChanged() {
//        if (this.currentCompIndex !== -1) {
//          const v = {}
//          this.components[this.currentCompIndex].attrs.forEach((attr) => {
//            Object.assign(v, { [attr.name]: attr.value })
//          })
//          this.components[this.currentCompIndex].value = v
//        }
//      },
//      // 绑定改变
//      attrBindChanged() {
//        if (this.currentCompIndex !== -1) {
//          const b = {}
//          this.components[this.currentCompIndex].attrs.forEach((attr) => {
//            if (attr.bind !== '') {
//              Object.assign(b, { [attr.name]: `${this.bindField}.${attr.bind}` })
//            }
//          })
//          this.components[this.currentCompIndex].bind = b
//        }
//      },
      handleMenuCommand(cmd) {
        switch (cmd) {
          case 'save':
            localStorage.setItem('savedComps', JSON.stringify(this.components))
            break
          case 'load':
            this.components = JSON.parse(localStorage.getItem('savedComps'))
            break
          default:
            break
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
            console.log(attr.bind)
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
//      window.addEventListener('keyup', this.handleKeyup)
    },
    mounted() {
      document.documentElement.addEventListener('keyup', this.handleKeyup)
      document.documentElement.addEventListener('focus', this.onInputFocus, true)
      document.documentElement.addEventListener('blur', this.onInputBlur, true)
      this.compTools = scadaComps.tools
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

  #top_bar {
    width: 100%;
    height: 54px;
    background-color: #EEE;
    border-bottom: 1px solid #AAA;
    padding: 10px;
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
    width: 180px;
    background-color: #EEE;
    border-right: 1px solid #AAA;
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
  }

  #right_panel {
    width: 250px;
    /*flex-basis: 200px;*/
    background-color: #EEE;
    border-left: 1px solid #AAA;
    /*flex-grow: 1;*/
  }

  #workarea {
    flex-grow: 1;
    background-color: #BBB;
    overflow: auto;
    //    @include scrollBar;
  }

  #pre_code {
    flex-grow: 1;
    padding-bottom: 6em;
    background-color: #fafafa;
    overflow: auto;
    /*height: 100px;*/
  }

  #canvas {
    margin: 10px;
    background-color: #FFF;
    border: 1px solid #999;
    /*width: 1200px;*/
    /*height: 700px;*/
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
    /*box-sizing: content-box;*/
    border: 1px dashed #43b5ff;
  }

  code {
    font-size: 0.8rem;
    min-height: 600px;
    user-select: text;
  }

  pre {
    margin: 0;
  }

  #layout_panel {
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

  .tools_panel {
    font-size: 12px;
    .title-label {
      font-size: 12px;
      background-color: #cccccc;
      padding: 6px;
      color: #333;
    }
    .panel-content {
      padding: 12px 6px 12px 6px;
      border-bottom: 1px solid #CCC;
    }
  }

  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }

  .upload-btn-wrapper input[type=file] {
    /*font-size: 100px;*/
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    height: 28px;
    width: 100px
  }

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

  .isActiveBtn {
    color: #409EFF;
  }

  .comp-icon {
    width: 100%;
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
