<template>
  <div>
    <el-dialog :visible.sync="info.isshow" @closed="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号" required>
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="昵称" required>
          <el-input v-model="form.nickname"></el-input>
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
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMemberDetail, reqMemberUpdate } from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  methods: {
    ...mapActions({
      reqListAction: "member/reqListAction",
    }),

    //取消
    cancel() {
      this.info.isshow = false;
    },
    //编辑取消
    close() {
      this.info.isshow = false;
    },
 
    //数据重置
    empty() {
      this.form = {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },

    //获取菜单详情(1条)
    look(uid) {
      reqMemberDetail(uid).then((res) => {
        
        
        if (res.data.code == 200) {
          //这时候form是没有id
          this.form = res.data.list;
          // console.log(this.form.password);
          this.upw=this.form.password;
          //密码是加密的，需重置密码
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //修改
    update() {
      // console.log(this.form);
      if(this.form.password==''){
        this.form.password=this.upw
      }
      reqMemberUpdate(this.form).then((res) => {
      
        console.log(this.form.password); //[]
        if (res.data.code == 200) {
          console.log(res.data.list);
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>