export const state = {
  //用户信息
  // JSON.parse转化成JSON
  userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
}
export const mutations = {
  changeUserInfo(state, info) {
    state.userInfo = info;
    //由于状态层刷新数据会没有，希望数据还在,所以需要本地存储
    // JSON.stringify(info) 转化成字符串

    //如果info是一个{}，那么代表要退出了，如果不是空{}，那就是登录
    if(info.id){
      sessionStorage.setItem('userInfo', JSON.stringify(info))
    }else{
      sessionStorage.removeItem('userInfo')
    }
   
  }
}
export const getters = {
  userInfo(state) {
    return state.userInfo
  }
}
