//处理逻辑的
export const actions={
    // 组件触发changeUserInfo
    changeUserInfoAction(context,info){
        context.commit("changeUserInfo",info)
    }
}