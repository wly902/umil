import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'


function chenckEnter(path, next) {
  let menus_url = store.state.userInfo.menus_url;
  if (menus_url.includes(path)) {
    next()
  } else {
    next('./')
  }
}
Vue.use(Router)
//二级路由
export let indexRoutes = [{
    path: 'banner',
    name: '轮播图管理',
    component: () => import('../pages/banner/banner.vue'),
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      chenckEnter('/banner', next)
    },
  },
  {
    path: 'cate',
    name: '商品分类',
    component: () => import('../pages/cate/cate.vue'),
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      chenckEnter('/cate', next)
    },
  },
  {
    path: 'goods',
    name: '商品管理',
    component: () => import('../pages/goods/goods.vue'),
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      chenckEnter('/goods', next)
    },
  },
  {
    path: 'manage',
    name: '管理员管理',
    component: () => import('../pages/manage/manage.vue'),
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      chenckEnter('/manage', next)
    },
  },
  {
    path: 'member',
    name: '会员管理',
    component: () => import('../pages/member/member.vue'),
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      chenckEnter('/member', next)
    },
  },
  {
    path: 'menu',
    name: '菜单管理',
    component: () => import('../pages/menu/menu.vue'),
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      chenckEnter('/menu', next)
    },
  },
  {
    path: 'role',
    name: '角色管理',
    component: () => import('../pages/role/role.vue'),
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      chenckEnter('/role', next)
    },
  },
  {
    path: 'seckill',
    name: '秒杀活动',
    component: () => import('../pages/seckill/seckill.vue'),
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      chenckEnter('/seckill', next)
    },
  },
  {
    path: 'specs',
    name: '商品规格',
    component: () => import('../pages/specs/specs.vue'),
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      chenckEnter('/specs', next)
    },
  },
]

let router = new Router({
  routes: [{
      path: '/login',
      component: () => import('../pages/login/login.vue')
    },
    {
      path: '/',
      component: () => import('../pages/index/index.vue'),
      children: [{
          path: '',
          component: () => import('../pages/home/home.vue')
        },
        ...indexRoutes
      ]
    }
  ]
})
//登录拦截(全局守卫)
router.beforeEach((to, from, next) => {
  //如果去的是login 直接放行
  if (to.path == '/login') {
    next()
    return
  }
  // 如果前往的不是登录
  // 查看是否登录，如果登录过来，next（），如果没登录就next（login）
  if (store.state.userInfo.token) {
    next();
    return
  }
  next('/login')
})
export default router
