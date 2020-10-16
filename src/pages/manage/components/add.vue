<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="80px">

         <el-form-item label="所属角色">
          <el-select
            v-model="form.roleid"
            placeholder="请选择上级菜单"
          >
            <el-option label="请选择" disabled value=""></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqManageAdd,
  reqManageDetail,
  reqManageUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqRoleListAction: "role/reqListAction",
      reqManageList: "manage/reqListAction",
      reqTotalAction:"manage/reqTotalAction",
    }),

    //取消
    cancel() {
      this.info.isshow = false;
    },
    //编辑取消
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //数据重置
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },

    //顶级菜单
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },

    //点击去请求
    add() {
      // console.log(this.form);
      reqManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);

          //去掉
          this.cancel();

          //内容清空
          this.empty();

          //列表刷新
          this.reqManageList();

          //重新获取总数
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取菜单详情(1条)
    look(uid) {
      reqManageDetail(uid).then((res) => {
        if (res.data.code == 200) {
          //这时候form是没有id
          this.form = res.data.list;
          //密码是加密的，需重置密码
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //修改11111
    update() {
      // console.log(this.form);
      reqManageUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
   mounted() {
    //如果没有请求过角色管理的数据，就请求一次，如果请求过了，就不用请求了
    if(this.roleList.length==0){
      this.reqRoleListAction()
    }
  },
};
</script>
<style scoped>
</style>