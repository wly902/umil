<template>
  <div>
    <el-container class="index">
      <el-aside class="left" width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          router
          unique-opened
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 是目录 -->
            <el-submenu :index="item.id + ''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="i.url"
                  >{{ i.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <!-- 菜单 -->
            <el-menu-item v-else :index="item.url">{{
              item.title
            }}</el-menu-item>
          </div>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header class="header">
          <div class="header-com">
            <h3>{{ userInfo.username }}</h3>
            <el-button type="danger" @click="logOut">退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb
            v-if="$route.name"
            separator-class="el-icon-arrow-right"
          >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction: "changeUserInfoAction",
      //退出登录
      logOut() {
        //状态层的值清除
        this.changeUserInfoAction({});
        //跳转回登录页面
        this.$router.push("/login");
      },
    }),
  },
  mounted() {},
};
</script>
<style scoped>
.index {
  width: 100vw;
  height: 100vh;
}
.left {
  background: #545c64;
}
.header {
  height: 300px;
  background: cornflowerblue;
}
.header-com {
  float: right;
}
.header-com h3 {
  float: left;
  line-height: 60px;
  font-weight: 400;
}
.header-com .el-button {
  float: left;
  margin-top: 10px;
}
</style>