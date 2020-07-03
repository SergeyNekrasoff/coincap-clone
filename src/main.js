import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePageTransition from 'vue-page-transition'
import { 
  Button, 
  Layout, 
  Row, 
  Col, 
  Divider, 
  Menu, 
  Form, 
  Input,
  Radio,
  Checkbox,
  Icon,
  Alert,
  Pagination,
  Modal,
  Card,
  Upload,
  Message,
  Select,
  Spin
} from 'ant-design-vue'
import './assets/styles/antd.css'
import Default from './layouts/Default'
import NoSidebar from './layouts/NoSidebar'
import VueApexCharts from 'vue-apexcharts'

Vue.component('default-layout', Default)
Vue.component('no-sidebar-layout', NoSidebar)
Vue.prototype.$message = Message

Vue.component('apexchart', VueApexCharts)
Vue.component(Button.name, Button)
Vue.use(Layout)
Vue.use(Row)
Vue.use(Col)
Vue.use(Divider)
Vue.use(Menu)
Vue.use(Form)
Vue.use(Input)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Alert)
Vue.use(Pagination)
Vue.use(Modal)
Vue.use(Card)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Spin)

Vue.use(VuePageTransition)

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount('#app')
