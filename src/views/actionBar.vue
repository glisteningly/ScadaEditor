<template>
  <section>

    <div id="top_bar">
      <el-row>
        <el-col :span="3">
          <div>
            <el-dropdown size="medium" @command="handleMenuCommand">
              <el-button plain size="small" @click="" icon="el-icon-menu">文档</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="open">打开</el-dropdown-item>
                <el-dropdown-item command="download">另存为</el-dropdown-item>
                <!--<el-dropdown-item command="save">暂存</el-dropdown-item>-->
                <!--<el-dropdown-item command="load">读取暂存</el-dropdown-item>-->
              </el-dropdown-menu>
            </el-dropdown>
            <el-button plain size="small" @click="$emit('actionSettings')" icon="el-icon-setting">设置</el-button>
          </div>
        </el-col>
        <el-col :span="4">
          <div>
            <el-button-group>
              <el-button plain size="small" @click="$emit('actionShowEditor')" :class="{isActiveBtn: isShowEditor}">
                <i class="el-icon-edit-outline"></i> 设计
              </el-button>
              <el-button plain size="small" @click="$emit('actionShowPreview')" :class="{isActiveBtn: isShowPreview}">
                <i class="el-icon-view"></i> 预览
              </el-button>
              <el-button plain size="small" @click="$emit('actionShowCodeView')" :class="{isActiveBtn: isShowCode}">
                <i class="el-icon-tickets"></i> 代码
              </el-button>
            </el-button-group>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="upload-btn-wrapper">
            <el-button type="prime" size="small" icon="el-icon-plus">导入svg</el-button>
            <input type="file" name="myfile" @change="onImportSvg" ref="uploadSvg"/>
          </div>
        </el-col>
        <el-col :span="11">
          <div>
            <el-button-group>
              <el-button plain type="danger" size="small" @click="$emit('actionRemoveCurrentComp')"
                         icon="el-icon-delete"></el-button>
              <el-button plain size="small" @click="$emit('actionDuplicateCurrentComp')"
                         icon="el-icon-plus"></el-button>
            </el-button-group>
            <el-button-group>
              <el-button plain size="small" @click="$emit('actionMoveToFront')" icon="el-icon-upload2"></el-button>
              <el-button plain size="small" @click="$emit('actionMoveToBack')" icon="el-icon-download"></el-button>
            </el-button-group>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button plain type="primary" size="small" @click="" icon="el-icon-upload" class="fl-right">发布</el-button>
          <el-button plain size="small" @click="" icon="el-icon-news" class="fl-right" style="margin-right: 6px;">数据源
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="openDialogVisible"
      width="30%">
      <span>当前编辑内容将被放弃，是否继续?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="loadDoc">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    props: {
      isShowCode: false,
      isShowPreview: false,
      isShowEditor: true,
      comps: null
    },
    data() {
      return {
        openDialogVisible: false,
        loadType: ''
      }
    },
    computed: {},
    methods: {
      loadDoc() {
        this.openDialogVisible = false
        if (this.loadType === 'storage') {
          this.$emit('actionLoadDoc')
        } else {
          this.$emit('actionOpenDoc')
        }
      },
      handleMenuCommand(cmd) {
        switch (cmd) {
          case 'save':
            this.$emit('actionSaveDoc')
            break
          case 'load':
            if (this.comps.length > 0) {
              this.loadType = 'storage'
              this.openDialogVisible = true
            } else {
              this.$emit('actionLoadDoc')
            }
            break
          case 'download':
            this.$emit('actionDownload')
            break
          case 'open':
            if (this.comps.length > 0) {
              this.loadType = 'file'
              this.openDialogVisible = true
            } else {
              this.$emit('actionOpenDoc')
            }
            break
          default:
            break
        }
      },
      onImportSvg(e) {
        const files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          const svgStr = e.target.result
          this.$emit('actionImportSvg', svgStr)
          this.$refs.uploadSvg.value = ''
        }
        reader.readAsText(files[0])
      }
    }
  }
</script>
<style lang="scss">
  #top_bar {
    width: 100%;
    height: 54px;
    flex: 0 0 54px;
    background-color: #EEE;
    border-bottom: 1px solid #AAA;
    padding: 10px;
    z-index: 999;
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, .15);
  }

  .isActiveBtn {
    color: #409EFF;
    border-bottom-color: #409EFF;
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

  .el-dropdown-menu {
    left: 5px;
    width: 170px;
    border: 1px solid #AAA;
  }
</style>
