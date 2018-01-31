<template>
  <section>
    <el-dialog
      title="文档设置"
      :visible.sync="dialogVisible"
      @close="$emit('dialogClose')"
      width="30%">
      <div class="setting-item">
        <label class="setting-title">画布设置</label>
        <div class="setting-content">
          <label>宽度: </label>
          <el-input-number :controls=false :max="3000" v-model="canvasConfig.width"
                           style="float: left"></el-input-number>
          <label>高度: </label>
          <el-input-number :controls=false :max="2000" v-model="canvasConfig.height"
                           style="float: left"></el-input-number>
        </div>
        <div class="setting-content">
          <label>背景色: </label>
          <el-color-picker size="small" v-model="canvasConfig.bgColor"/>
        </div>
      </div>
      <div class="setting-item">
        <label class="setting-title">界面设置</label>
        <div class="setting-content">
          <label>背景栅格: </label>
          <el-switch
            v-model="canvasConfig.showGrid">
          </el-switch>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeSettings">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    props: {
      isShowDialog: false,
      config: null
    },
    data() {
      return {
        dialogVisible: false,
        canvasConfig: {
          width: 1000,
          height: 600,
          bgColor: '#FFF',
          showGrid: true
        }
      }
    },
    watch: {
      isShowDialog() {
        this.dialogVisible = this.isShowDialog
      },
      config() {
        this.canvasConfig = Object.assign({}, this.config)
      }
    },
    methods: {
      changeSettings() {
        this.dialogVisible = false
        this.$emit('settingsChanged', this.canvasConfig)
      }
    }
  }
</script>
<style lang="scss">

  .setting-item {
    .setting-title {
      display: block;
      margin-bottom: 10px;
      background: #DDD;
      padding: 2px 0 0 6px
    }
    input {
      max-width: 70px;
      margin-right: 30px;
    }
    .setting-content {
      padding-left: 10px;
      margin-bottom: 10px;
      label {
        display: block;
        float: left;
        margin-right: 4px;
        margin-top: 3px;
      }
      .el-switch {
        margin:4px 0 0 4px
      }
    }
    .el-color-picker--small .el-color-picker__trigger {
      width: 60px !important;
    }
  }
</style>
