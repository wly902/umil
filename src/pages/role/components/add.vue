<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '角色添加' : '角色修改'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="角色名称" required>
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >确 定</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { warningAlert, successAlert } from "../../../utils/alert";
import {
  reqRoleAdd,
  reqRoleDeatil,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../utils/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
     menuList: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      //请求菜单
      reqMenuListAction: "menu/reqListAction",

      // 角色的list
      reqRoleList: "role/reqListAction",
    }),
    // 取消
    cancel(){
      this.info.isshow=false;
    },
    //弹框消失完成
    close() {
       //如果是添加开的弹框，就什么都不做；如果是编辑开的弹框，就清除form
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //数据重置
    empty() {
      this.form = {
        rolename: "",
        menus: "[]",
        status: 1,
      };
      //树形控件设置值
      this.$refs.tree.setCheckedKeys([]);
    },
    //点击添加事件
    add() {
      // 树形控件取值  this.$refs.tree.getCheckedKeys()
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          //list数据要刷新
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取1条数据
    look(id){
      //发请求
      reqRoleDeatil(id).then((res)=>{
        if(res.data.code==200){
          this.form=res.data.list;
          this.form.id=id
          // 树形控件赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        }else{
          warningAlert(res.data.msg)
        }
      })
    },

    // 修改
    update() {
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleUpdate(this.form).then((res)=>{
        if(res.data.code==200){
          successAlert(res.data.msg);

          this.empty();

          this.cancel();

          this.reqRoleList();
        }else{
          warningAlert(res.data.msg)
        }
      })
    },
  },
  mounted() {
    // 如果菜单list没有请求过，就请求一下，如果请求过了，就不用请求了
    if (this.menuList.length == 0) {
      this.reqMenuListAction();
    }
  },
};
</script>
<style scoped>
</style>