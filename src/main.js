// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import IconSvg from 'as-icon-svg'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import VueHighlightJS from 'vue-highlightjs'
import pretty from 'pretty'
import CollapsePanel from '@/components/CollapsePanel/collapsePanel.vue'
import VueDND from 'awe-dnd'

Vue.use(VueDND)
// import AsUI from './components'

// Vue.use(AsUI)
Vue.use(ElementUI, { locale, size: 'mini' })
// Vue.component('icon-svg', IconSvg)
Vue.component('CollapsePanel', CollapsePanel)
Vue.config.productionTip = false

// 为代码文本提供高亮、缩进
Vue.use(VueHighlightJS)
// 为代码文本格式化
Vue.prototype.$prettyDom = pretty

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
