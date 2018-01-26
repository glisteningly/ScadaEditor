<template>
  <collapse-panel label="位置尺寸" id="layout_panel">
      <el-row>
        <el-col :span="6">
          <el-input-number :controls=false v-model="compLayout.x"></el-input-number>
        </el-col>
        <el-col :span="6">
          <el-input-number :controls=false v-model="compLayout.y"></el-input-number>
        </el-col>
        <el-col :span="6">
          <el-input-number :controls=false v-model="compLayout.width" @change="ratioSyncW"></el-input-number>
        </el-col>
        <el-col :span="6">
          <el-input-number :controls=false v-model="compLayout.height" @change="ratioSyncH"></el-input-number>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div>X</div>
        </el-col>
        <el-col :span="6">
          <div>Y</div>
        </el-col>
        <el-col :span="6">
          <div><span v-if="layout.ratio>0">[ </span>W</div>
        </el-col>
        <el-col :span="6">
          <div>H<span v-if="layout.ratio>0"> ]</span></div>
        </el-col>
      </el-row>
  </collapse-panel>
</template>
<script>
  export default {
    props: {
      layout: { x: 0, y: 0, width: 0, height: 0, ratio: 0 }
    },
    data() {
      return {}
    },
    computed: {
      compLayout: {
        get() {
          return this.layout
        },
        set(v) {
          this.layout = v
        }
      }
    },
    methods: {
      ratioSyncW() {
        this.$nextTick(() => {
          if (this.layout.ratio > 0) {
            this.compLayout.height = Math.round(this.compLayout.width * this.layout.ratio)
          }
        })
      },
      ratioSyncH() {
        this.$nextTick(() => {
          if (this.layout.ratio > 0) {
            this.compLayout.width = Math.round(this.compLayout.height / this.layout.ratio)
          }
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
  #layout_panel {

    input {
      text-align: center !important;
    }
    .el-col {
      padding: 0 4px;
    }
    .el-col > div {
      padding-top: 4px;
      text-align: center;
    }
  }
</style>
