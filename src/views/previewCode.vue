<template>
  <div id="pre_code">
    <pre v-highlightjs="scadaTemplate"><code class="html"></code></pre>
  </div>
</template>
<script>
  // 代码高亮样式
  import '@/assets/css/highlight/default.css'
  import '@/assets/css/highlight/Atom-One-Light.css'

  export default {
    props: {
      scadaTemplate: ''
    },
    data() {
      return {}
    },
    computed: {},
    methods: {}
  }
</script>
<style lang="scss">
  #pre_code {
    flex-grow: 1;
    /*padding-bottom: 6em;*/
    background-color: #fafafa;
    overflow: auto;
    /*height: 100px;*/
  }

  code {
    font-size: 0.8rem;
    min-height: 600px;
    user-select: text;
  }

  pre {
    margin: 0;
  }
</style>
