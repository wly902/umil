<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="菜单名称" required >
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单"  required>
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changePid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type == 1">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option
              v-for="item in icons"
              :key="item"
              :label="item"
              :value="item"
            >
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexRoutes"
              :key="item.indexRoutes"
              :label="item.name"
              :value="'/' + item.path"
            >
            </el-option>
          </el-select>
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
import { indexRoutes } from "../../../router/index";
import {
  reqMenuAdd,
  reqMenuDeatil,
  reqMenuUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      //路由
      indexRoutes: indexRoutes,

      form: {
        pid: 0,
        title: "",
        icon: "",
        url: "",
        type: 1,
        status: 1,
      },
      icons: [
        "el-icon-user",
        "el-icon-star-off",
        "el-icon-goods",
        "el-icon-video-camera",
        "el-icon-camera",
      ],
    };
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

    //取消
    cancel() {
      this.info.isshow = false;
    },
    //编辑取消
    close(){
          if(!this.info.isAdd){
        this.empty()
      }
    },
    //数据重置
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
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
      reqMenuAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);

          //去掉
          this.cancel();

          //内容清空
          this.empty();

          //列表刷新
          this.reqListAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取菜单详情(1条)
    look(id) {
      reqMenuDeatil(id).then((res)=>{
        if(res.data.code==200){
          //这时候form是没有id
          this.form=res.data.list;
          this.form.id=id
        }else{
          warningAlert(res.data.msg)
        }
      })
    },

    //修改
    update() {
      // console.log(this.form);
      reqMenuUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
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