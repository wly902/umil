<template>

<el-button type="danger" @click='del'>删除</el-button>
</template>
<script>

export default {
 
  methods: {
   del(){
        this.$confirm("是否删除", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
           this.$emit("confirm")
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
   }
  }
 
};
</script>
<style scoped>
</style>