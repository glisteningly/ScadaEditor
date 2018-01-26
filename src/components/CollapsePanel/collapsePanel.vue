<template>
  <section>
    <div class="title-label"><span>{{label}}</span>
      <span class="collapse-btn">
        <i class="el-icon-caret-bottom" v-if="!collapsed" @click="collapsed=true"></i>
        <i class="el-icon-caret-right" v-if="collapsed" @click="collapsed=false"></i>
        </span>
    </div>
    <div class="panel-content" v-show="!collapsed">
      <slot></slot>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'CollapsePanel',
    props: {
      label: {
        type: String
      }
    },
    data() {
      return {
        collapsed: false
      }
    },
    computed: {},
    methods: {},
    mounted() {

    }
  }
</script>

<style lang="scss">
  .tools_panel {
    font-size: 12px;
    color: #333;
    .title-label {
      font-size: 12px;
      background-color: #888;
      border-bottom: 1px solid #CCC;
      padding: 8px 8px 6px 8px;
      color: #FFF;
      span {
        letter-spacing: 1px;
      }
    }
    .panel-content {
      padding: 6px 6px 6px 6px;
      border-bottom: 1px solid #BBB;
    }
  }
</style>
