<template>
  <collapse-panel label="组件参数">
    <template v-for="ctrl in compAttrs">
      <div class="ctrl-item">
        <el-row>
          <el-col :span="6"><label>{{ctrl.label}}</label></el-col>
          <el-col :span="10">
            <component
              :is="getCtrlTyp(ctrl.type)"
              v-model="ctrl.value"
              :placeholder="ctrl.hint"
              @change="compValInputChanged">
              <el-option v-if="ctrl.type === 'Enum'"
                         v-for="item in ctrl.opts"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </component>
          </el-col>
        </el-row>
      </div>
    </template>
  </collapse-panel>
</template>
<script>
  export default {
    props: {
      compAttrs: null
    },
    data() {
      return {}
    },
    computed: {},
    methods: {
      getCtrlTyp(type) {
        switch (type) {
          case 'Color' :
            return 'el-color-picker'
          case 'Number':
            return 'el-input'
          case 'Int':
            return 'el-input-number'
          case 'Enum':
            return 'el-select'
          default:
            return 'el-input'
        }
      },
      compValInputChanged() {
        this.$nextTick(() => {
          this.$emit('compValInputChanged')
        })
      }
    },
    mounted() {
    }
  }
</script>

<style lang="scss">

</style>
