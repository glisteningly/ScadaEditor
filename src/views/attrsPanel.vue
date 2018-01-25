<template>
  <section id="attr_panel">
    <div class="title-label">数据绑定</div>
    <div class="panel-content">
      <template v-for="attr in compAttrs">
        <div class="ctrl-item">
          <label class="bind-label">{{attr.label}}</label>
          <el-row>
            <el-col :span="24">
              <el-cascader
                placeholder="请选择数据点"
                :options="dataBinds"
                :separator="'.'"
                :clearable="true"
                @active-item-change=""
                @change="compValInputChanged"
                v-model="attr.bind"
                :props="cascaderProps"/>
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
</template>
<script>
  export default {
    props: {
      compAttrs: null,
      dataBinds: null
    },
    data() {
      return {
        cascaderProps: {
          value: 'label',
          children: 'cities'
        }
      }
    },
    computed: {},
    methods: {
      compValInputChanged() {
        this.$emit('compValInputChanged')
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
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
