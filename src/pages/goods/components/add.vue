<template>
  <div class="add">
    <el-dialog
      :title="info.isAdd ? '商品添加' : '商品修改'"
      :visible.sync="info.isshow"
      @closed="close"
      @opened="opened"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="一级分类">
          <el-select
            v-model="form.first_cateid"
            @change="changeFirst"
            placeholder="请选择"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>

        <!-- 原生 上传文件 start-->
        <!-- 如果添加成功之后，再次添加上一次的文件，就不会再出发change；如果要解决这个bug,我们就在弹框消失的时候，将input也销毁 -->
        <el-form-item label="图片" v-if="form.pid != 0">
          <div class="my-upload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt="" />
            <input
              v-if="info.isshow"
              class="my-input"
              type="file"
              @change="getFile"
            />
          </div>
        </el-form-item>
        <!-- 原生 上传文件 end-->

        <!-- element-ui 上传文件 start -->
        <!-- <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="getFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item> -->

        <!-- element-ui 上传文件 end -->

        <el-form-item label="商品规格">
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="changeSpecs"
          >
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option
              v-for="item in goodsAttrList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>

        <el-form-item label="商品描述">
          <!-- 富文本 -->
          <div id="editor" v-if='info.isshow'></div>
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
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import {
  reqCateList,
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdate,
} from "../../../utils/request";
import { warningAlert, successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      //图片地址
      imgUrl: "",
      //二级分类的list
      secondCateList: [],
      //商品属性list
      goodsAttrList: [],
    };
  },
  computed: {
    ...mapGetters({
      // 商品分类的list
      cateList: "cate/list",
      //   商品规格的list
      specsList: "specs/list",
    }),
  },
  methods: {
    //弹框打开完成
    opened() {
      //富文本
      // 节点加载完成，对话框动画还在执行，动画完善之后再创建
      this.editor = new E("#editor");
      this.editor.create();
    },
    ...mapActions({
      // 请求商品分类的list
      reqCateList: "cate/reqListAction",
      //   商品规格list
      reqSpecsList: "specs/reqListAction",
      // 商品管理的list
      reqListAction: "goods/reqListAction",
      //商品管理的count
      reqTotalAction: "goods/reqTotalAction",
    }),

    // 一级分类变了，二级分类也改变
    changeFirst() {
      //一级改变，二级为空
      this.form.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        //二级分类list
        this.secondCateList = res.data.list;
      });
    },

    //获取文件
    getFile(e) {
      let file = e.target.files[0];
      console.log(file);

      //1.大小不超过2M 1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件不能超过2M");
        return;
      }

      //2.是图片
      let imgExtArr = [".jpg", ".png", ".jpeg", ".gif"];
      let extname = file.name.slice(file.name.lastIndexOf(".")); //'.jpg'
      if (!imgExtArr.some((item) => item == extname)) {
        warningAlert("文件格式不正确");
        return;
      }

      //URL.createObjectURL() 可以通过文件生成一个地址
      this.imgUrl = URL.createObjectURL(file);

      //将文件保存在form.img
      this.form.img = file;
    },

    // getFile2(e) {
    //   let file = e.raw;

    //   //URL.createObjectURL() 可以通过文件生成一个地址
    //   this.imgUrl = URL.createObjectURL(file);

    //   //将文件保存在form.img
    //   this.form.img = file;
    // },
    //商品规格发生改变，计算属性的数组
    changeSpecs() {
      //商品规格变了，商品属性先置空
      this.form.specsattr = [];

      this.getAttrsArr();
    },
    //获得商品属性数组
    getAttrsArr() {
      // this.form.specsid 颜色 1
      // 在specsList中找到 找到哪一条数据的id和当前this.form.specsid是一样的。
      let obj = this.specsList.find((item) => item.id == this.form.specsid);
      // 把这条数据的attrs赋值给goodsAttrList;
      this.goodsAttrList = obj.attrs;
    },
    //取消
    cancel() {
      this.info.isshow = false;
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
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      //图片地址
      this.imgUrl = "";
      //二级分类的list
      this.secondCateList = [];
      //商品属性list
      this.goodsAttrList = [];
    },
    //获得二级分类list

    //点击了添加按钮
    add() {
      //   console.log(this.form);
      //将富文本编辑器的内容取出来给form.description
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsAdd(data).then((res) => {
        if (res.data.code == 200) {
          //成功
          successAlert(res.data.msg);

          //数据重置
          this.empty();

          //弹框消失
          this.cancel();

          //list数据要刷新
          this.reqListAction();
          this.reqTotalAction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //获取菜单详情 （1条）
    look(id) {
      //发请求
      reqGoodsDetail(id).then((res) => {
        if (res.data.code == 200) {
          // form没有ID
          this.form = res.data.list;
          //   补ID
          this.form.id = id;
          //   需要去请求二级分类的list
          this.getSecondList();
          //图片
          this.imgUrl = this.$imgPre + this.form.img;
          // 商品属性从字符串转为[]
          this.form.specsattr = JSON.parse(this.form.specsattr);
          //   获取商品属性的数组
          this.getAttrsArr();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改
    update() {
      this.form.description = this.editor.txt.html();
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsUpdate(data).then((res) => {
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
  mounted() {
    //如果商品一级分类没有请求过，就请求一次
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
    //由于商品规格模块使用了分页。商品管理需要所有的商品规格不要分页，所以多传一个参数，去判断是否要分页
    this.reqSpecsList(true);
    //如果规格的list没有请求，就请求一次(商品规格没有分页)
    // if (this.specsList.length == 0) {
    //   this.reqSpecsList();
    // }
  },
};
</script>
<style lang="stylus" scoped>
.my-upload {
  width: 150px;
  height: 150px;
  border: 1px dashed #ccc;
  position: relative;
}

.my-upload h3 {
  text-align: center;
  line-height: 150px;
  font-size: 30px;
  font-weight: 400;
}

.my-upload .my-input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  opacity: 0;
}

.my-upload .img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

/* element-ui */
.add >>>.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>