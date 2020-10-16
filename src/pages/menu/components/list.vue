<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
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
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <del-btn @confirm="dele(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../utils/alert";
import { reqMenuDel } from "../../../utils/request";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "menu/reqListAction",
    }),
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //删除数据
    dele(id) {
      //点击删除按钮
      reqMenuDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //刷新列表
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // del(id) {
    //   this.$confirm("是否删除", "删除提示", {
    //     confirmButtonText: "删除",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(() => {
    //       //点击删除按钮
    //       reqMenuDel(id).then((res) => {
    //         if (res.data.code == 200) {
    //           successAlert(res.data.msg);
    //           //刷新列表
    //           this.reqListAction();
    //         } else {
    //           warningAlert(res.data.msg);
    //         }
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除",
    //       });
    //     });
    // },
  },
  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
</style>