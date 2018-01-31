<template>
  <div id="bottom_bar">
    <input id="focus-key-hack" type="text">
    <div id="zoom-hint">{{formatTooltip(canvasConfig.zoom)}}</div>
    <div id="zoom-control">
      <el-slider
        v-model="canvasConfig.zoom"
        :min="0.5" :max="2"
        :format-tooltip="formatTooltip"
        :step="0.1">
      </el-slider>
    </div>
    <div id="zoom-label">画布缩放</div>
  </div>
</template>
<script>
  export default {
    props: {
      canvasConfig: {
        type: Object,
        default: function () {
          return {
            zoom: 1
          }
        }
      }
    },
    data() {
      return {}
    },
    computed: {},
    methods: {
      formatTooltip(val) {
        return Math.round(val * 100) + '%'
      }
    }
  }
</script>
<style lang="scss">
  #focus-key-hack {
    position: absolute;
    left: -888px;
    width: 8px;
    height: 8px;
  }

  #zoom-hint, #zoom-label {
    float: right;
    font-size: 12px;
    color: #333;
    margin-top: 1px;
  }

  #zoom-control {
    float: right;
    margin: 3px 15px 0 15px;
    width: 100px;
    .el-slider__runway {
      background-color: #ccc;
      margin: 0;
      .el-slider__bar {
        background-color: #ccc;
      }
      .el-slider__button-wrapper {
        height: 0;
        top: -6px;
        .el-slider__button {
          border-color: #888;
        }
      }
    }
  }
</style>
