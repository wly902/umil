// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// 1.引入css
import './assets/css/reset.css'

// 2.comments里公共组件的整合
import "./components"
// 3.路由组件
// 4.数据交互
// 5.过滤器
import './filters'

// 6.引入vuex,并挂载到根实例上
import store from './store'

// 7.引入element-ui,且二次封装弹框
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
