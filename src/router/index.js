import Vue from 'vue'
import VueRouter from 'vue-router'
import { NotFoundComponent } from '@/views/NotFoundComponent.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/exchanges',
    meta: { 
      layout: 'no-sidebar',
      title: 'Home | Coincap Clone'
    },
    component: () => import(/* webpackChunkName: "index" */ '../views/index.vue'),
    children: [
      { 
        path: '/exchanges', 
        name: 'Exchanges',
        meta: { 
          title: 'Exchanges | Coincap Clone'
        },
        component: () => import(/* webpackChunkName: "index" */ '../views/dashboard/exchanges/index.vue'),
      },
      {
        path: '/exchanges/:id',
        name: 'exchangeId',
        component: () => import(/* webpackChunkName: "_id" */ '@/views/dashboard/exchanges/_id.vue')
      },
      { 
        path: '/markets', 
        name: 'Markets',
        meta: { 
          title: 'Markets | Coincap Clone'
        },
        component: () => import(/* webpackChunkName: "index" */ '../views/dashboard/markets/index.vue')
      },
      { 
        path: '/markets/:id', 
        name: 'marketsEx',
        component: () => import(/* webpackChunkName: "_id" */ '../views/dashboard/markets/_id.vue')
      }
    ]
  },
  {
    path: '*',
    component: NotFoundComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta && to.meta.title ? to.meta.title : '🔥 Coincap Clone'
  next()
})

export default router