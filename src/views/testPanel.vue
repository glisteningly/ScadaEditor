<template>
  <section id="test_panel">
    <div class="title-label">数据测试</div>
    <div class="panel-content">
      <template v-for="(val1, key1) in bindData">
        <div class="ctrl-item">
          <label class="bind-label">{{`[ ${key1} ]`}}</label>
          <template v-for="(val2, key2) in val1">
            <el-row>
              <el-col :span="6"><label>{{`• ${key2}`}}</label></el-col>
              <el-col :span="18">
                <el-input v-model="val1[key2]"/>
              </el-col>
            </el-row>
          </template>
        </div>
      </template>
    </div>
  </section>
</template>
<script>
  export default {
    props: {
      bindData: null
    },
    data() {
      return {}
    },
    computed: {},
    methods: {},
    mounted() {
    }
  }
</script>

<style lang="scss">

</style>
