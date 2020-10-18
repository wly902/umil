import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import store from '../store'
import {
  successAlert,
  warningAlert
} from './alert'
import router from '../router'

//开发环境下使用
Vue.prototype.$imgPre = "http://localhost:3000"
let baseUrl = '/api';

// 打包
// Vue.prototype.$imgPre=""
// let baseUrl = "";

//请求拦截  后台 app.js 后端登录拦截打开
axios.interceptors.request.use(req => {
  // console.log("---请求拦截----");
  // console.log(req);
  if (req.url != baseUrl + "/api/userlogin") {
    req.headers.authorization = store.state.userInfo.token;
  }
  return req;
})


//响应拦截
axios.interceptors.response.use(res => {
  console.group("=====本次请求路径是:" + res.config.url)
  console.log(res);
  console.groupEnd()

  //用户掉线了
  if (res.data.msg == '登录已过期或访问权限受限') {
    warningAlert(res.data.msg)
    router.push("/login")
  }

  return res;
})

/************菜单管理*****************/
//添加数据
export const reqMenuAdd = (params) => {
  return axios({
    url: baseUrl + '/api/menuadd',
    method: 'post',
    data: qs.stringify(params)
  })
}
//列表请求
export const reqMenuList = (params) => {
  return axios({
    url: baseUrl + '/api/menulist',
    method: 'get',
    params: {
      istree: true
    }
  })
}

//删除请求
export const reqMenuDel = (id) => {
  return axios({
    url: baseUrl + '/api/menudelete',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}

//1条
export const reqMenuDeatil = (id) => {
  return axios({
    url: baseUrl + '/api/menuinfo',
    method: "GET",
    params: {
      id: id
    }
  })
}

//修改请求
export const reqMenuUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/menuedit',
    method: 'post',
    data: qs.stringify(params)
  })
}
/************角色管理*****************/
//添加
export const reqRoleAdd = (params) => {
  return axios({
    url: baseUrl + '/api/roleadd',
    method: 'post',
    data: qs.stringify(params)
  })
}
//列表
export const reqRoleList = () => {
  return axios({
    url: baseUrl + '/api/rolelist',
    method: "get"
  })
}
//1条
export const reqRoleDeatil = (id) => {
  return axios({
    url: baseUrl + '/api/roleinfo',
    method: 'get',
    params: {
      id: id
    }
  })
}
//修改
export const reqRoleUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/roleedit',
    method: 'post',
    data: qs.stringify(params)
  })
}
//删除
export const reqRoleDel = (id) => {
  return axios({
    url: baseUrl + '/api/roledelete',
    method: "post",
    data: qs.stringify({
      id: id
    })
  })
}
/************管理员*****************/
// 添加
export const reqManageAdd = (params) => {
  return axios({
    url: baseUrl + '/api/useradd',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 管理员总数
export const reqManageCount = () => {
  return axios({
    url: baseUrl + '/api/usercount',
    method: "get"
  })
}

//管理员列表
export const reqManageList = (params) => {
  return axios({
    url: baseUrl + '/api/userlist',
    method: "get",
    params: params
  })
}

// 删除
export const reqManageDel = (uid) => {
  return axios({
    url: baseUrl + '/api/userdelete',
    method: "post",
    data: qs.stringify({
      uid: uid
    })
  })
}

//1条
export const reqManageDetail = (uid) => {
  return axios({
    url: baseUrl + '/api/userinfo',
    method: 'get',
    params: {
      uid: uid
    }
  })
}

//修改
export const reqManageUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/useredit',
    method: 'post',
    data: qs.stringify(params)
  })
}
/*************分类****************/
// 添加
export const reqCateAdd = (params) => {

  let data = new FormData()

  for (let i in params) {
    data.append(i, params[i])
  }

  return axios({
    url: baseUrl + '/api/cateadd',
    method: 'post',
    data: data
  })
}

//列表
export const reqCateList = (params) => {
  return axios({
    url: baseUrl + '/api/catelist',
    method: "get",
    params: params
  })
}

//1条
export const reqCateDetail = (id) => {
  return axios({
    url: baseUrl + '/api/cateinfo',
    method: 'get',
    params: {
      id: id
    }
  })
}

//修改
export const reqCateUpdate = (params) => {
  let data = new FormData()
  for (let i in params) {
    data.append(i, params[i])
  }
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: data
  })
}

//删除
export const reqCateDel = (id) => {
  return axios({
    url: baseUrl + '/api/catedelete',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}
/************商品规格*****************/
//添加
export const reqSpecsAdd = (params) => {
  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: qs.stringify(params)

  })
}
//总数
export const reqSpecsCount = () => {
  return axios({
    url: baseUrl + '/api/specscount',
    method: 'GET'
  })
}
//删除
export const reqSpecsDel = (id) => {
  return axios({
    url: baseUrl + '/api/specsdelete',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}
//1条
export const reqSpecsDetail = (id) => {
  return axios({
    url: baseUrl + '/api/specsinfo',
    method: 'get',
    params: {
      id: id
    }
  })
}
//修改
export const reqSpecsUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/specsedit',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 分页
export const reqSpecsList = (params) => {
  return axios({
    url: baseUrl + '/api/specslist',
    method: 'get',
    params: params
  })
}
/************商品管理*****************/
//添加
export const reqGoodsAdd = (form) => {
  let data = new FormData();
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + "/api/goodsadd",
    method: "post",
    data: data

  })
}
//总数
export const reqGoodsCount = () => {
  return axios({
    url: baseUrl + '/api/goodscount',
    method: 'GET'
  })
}
//删除
export const reqGoodsDel = (id) => {
  return axios({
    url: baseUrl + '/api/goodsdelete',
    method: 'post',
    data: qs.stringify({id:id})
  })
}
//1条
export const reqGoodsDetail = (id) => {
  return axios({
    url: baseUrl + '/api/goodsinfo',
    method: 'get',
    params: {id:id}
  })
}
//修改
export const reqGoodsUpdate = (form) => {
  let data = new FormData();
  for (let i in form) {
    data.append(i, form[i])
  }
  return axios({
    url: baseUrl + '/api/goodsedit',
    method: 'post',
    data: data
  })
}
// 分页
export const reqGoodsList = (params) => {
  return axios({
    url: baseUrl + '/api/goodslist',
    method: 'get',
    params: params
  })
}
/***********登录***************/
export const reqLogin = (params) => {
  return axios({
    url: baseUrl + '/api/userlogin',
    method: 'post',
    data: qs.stringify(params)
  })
}
/************会员管理****************/
// 列表
export const reqMemberList = () => {
  return axios({
    url: baseUrl + '/api/memberlist',
    method: 'get'
  })
}
// 获取
export const reqMemberDetail = (uid) => {
  return axios({
    url: baseUrl + '/api/memberinfo',
    method: 'get',
    params: {
      uid: uid
    }
  })
}
// 修改
export const reqMemberUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/memberedit',
    method: 'post',
    data: qs.stringify(params)
  })
}
/************轮播图管理**************/
// 添加
export const reqBannerAdd = (params) => {
  let data = new FormData();
  for (let i in params) {
    data.append(i, params[i])
  }

  return axios({
    url: baseUrl + '/api/banneradd',
    method: 'post',
    data: data
  })
}
//列表
export const reqBannerList = () => {
  return axios({
    url: baseUrl + '/api/bannerlist',
    method: 'get'
  })
}
//一条
export const reqBannerDetail = (id) => {
  return axios({
    url: baseUrl + '/api/bannerinfo',
    method: 'get',
    params: {
      id: id
    }
  })
}
//修改
export const reqBannerUpdate = (parmas) => {
  let data = new FormData();
  for (let i in parmas) {
    data.append(i, parmas[i])
  }
  return axios({
    url: baseUrl + '/api/banneredit',
    method: "post",
    data: data
  })
}
//删除
export const reqBannerDel = (id) => {
  return axios({
    url: baseUrl + '/api/bannerdelete',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}
/************活动秒杀****************/
// 添加
export const reqSeckillAdd = (params) => {
  return axios({
    url: baseUrl + '/api/seckadd',
    method: 'post',
    data: qs.stringify(params)
  })
}
//列表
export const reqSeckillList = () => {
  return axios({
    url: baseUrl + "/api/secklist",
    method: 'get'
  })
}
//1条
export const reqSeckillDetail = (id) => {
  return axios({
    url: baseUrl + '/api/seckinfo',
    method: 'get',
    params: {
      id: id
    },
  })
}
//修改
export const reqSeckillUpdate = (params) => {
  return axios({
    url: baseUrl + '/api/seckedit',
    method: 'post',
    data: qs.stringify(params),
  })
}
//删除
export const reqSeckillDel = (id) => {
  return axios({
    url: baseUrl + '/api/seckdelete',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}
