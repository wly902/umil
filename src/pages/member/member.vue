<template>
  <div>
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
      //获取菜单详情
       this.$refs.add.look(id)
    },
  },
  mounted() {
   
  },
};
</script>
<style scoped>
</style>