<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="角色编号" sortable> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <del-btn @confirm="dele(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  <!-- 分页组件 -->
    <!-- 
    total：设置总数 
    page-size：每页数量 
    有多少页，不用自己计算 

    current-change：当前页码发生了改变，就会触发，参数就是当前的页码
    -->
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="size"
    @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqManageDel} from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      size: "manage/size",
      total: "manage/total",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "manage/reqListAction",
      reqTotalAction: "manage/reqTotalAction",
      changePageAction: "manage/changePageAction",
    }),
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //删除数据
    dele(uid) {
      //点击删除按钮
      reqManageDel(uid).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //刷新列表
          this.reqListAction();
          //重新获取总数
          this.reqTotalAction()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //修改当前的页码
    changePage(e){
      this.changePageAction(e)
    }
  },
  mounted() {
    // 一进来就发送请求
   this.reqListAction();
   //获取list的总数
   this.reqTotalAction()
  },
};
</script>
<style scoped>
</style>