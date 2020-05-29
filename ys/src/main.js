import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import {
  Button,
  CellGroup,
  Field,
  Icon,
  Tabbar,
  TabbarItem,
  Toast,
  Tabs,
  Tab,
  Search,
  Swipe,
  SwipeItem,
  NavBar,
  Grid,
  GridItem,
  Cell
} from 'vant'

import 'lib-flexible/flexible'

Vue
  .use(Button)
  .use(CellGroup)
  .use(Field)
  .use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Toast)
  .use(Tabs)
  .use(Tab)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(NavBar)
  .use(Grid)
  .use(GridItem)
  .use(Cell)

Vue.config.productionTip = false

//全局前置路由守卫


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
