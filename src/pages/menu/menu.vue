<template>
  <div>
    <el-button type="primary" style="margin: 20px 0" @click='willAdd'>添加</el-button>

    <!-- 表格 -->
    <v-list @edit='edit'></v-list>

    <!-- 添加 -->
    <v-add :info='info' ref='add'></v-add>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  props: [],
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
        info:{
            isshow:false,
            //添加还是编辑，真为添加
            isAdd:true
        }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    //编辑
    edit(id){
      this.info.isshow=true;
      this.info.isAdd=false
      //获取菜单详情
       this.$refs.add.look(id)
    },
    //添加
    willAdd(){
        this.info.isshow=true;
        this.info.isAdd=true
      
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>