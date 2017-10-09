<template>
  <el-row :gutter="20">
    <el-col :span="4" class="btn-item">
      <p>添加佐料</p>
      <el-switch v-model="btnGroup.btn1" on-text="" off-text=""></el-switch>
    </el-col>
    <el-col :span="4" class="btn-item">
      <p>添加佐料</p>
      <el-switch v-model="btnGroup.btn2" on-text="" off-text=""></el-switch>
    </el-col>
    <el-col :span="4" class="btn-item">
      <p>添加佐料</p>
      <el-switch v-model="btnGroup.btn3" on-text="" off-text=""></el-switch>
    </el-col>
    <el-col :span="4" class="btn-item">
      <p>添加佐料</p>
      <el-switch v-model="btnGroup.btn4" on-text="" off-text=""></el-switch>
    </el-col>
    <el-col :span="4" class="btn-item">
      <p>添加佐料</p>
      <el-switch v-model="btnGroup.btn5" on-text="" off-text=""></el-switch>
    </el-col>
    <el-col :span="4" class="btn-item">
      <p>添加佐料</p>
      <el-switch v-model="btnGroup.btn6" on-text="" off-text=""></el-switch>
    </el-col>
    <el-col :span="4" class="btn-item">
      <p>添加佐料</p>
      <el-switch v-model="btnGroup.btn7" on-text="" off-text=""></el-switch>
    </el-col>
    <el-col :span="4" class="btn-item">
      <p>添加佐料</p>
      <el-switch v-model="btnGroup.btn8" on-text="" off-text=""></el-switch>
    </el-col>
    <el-col :span="4" class="btn-item">
      <p>添加佐料</p>
      <el-switch v-model="btnGroup.btn9" on-text="" off-text=""></el-switch>
    </el-col>
    <el-col :span="4" class="btn-item">
      <p>添加佐料</p>
      <el-switch v-model="btnGroup.btn10" on-text="" off-text=""></el-switch>
    </el-col>
    <el-col :span="4" class="btn-item">
      <p>添加佐料</p>
      <el-switch v-model="btnGroup.btn11" on-text="" off-text=""></el-switch>
    </el-col>
    <el-col :span="4" class="btn-item">
      <p>添加佐料</p>
      <el-switch v-model="btnGroup.btn12" on-text="" off-text=""></el-switch>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
      return {
        btnGroup: {
          btn1: false,
          btn2: false,
          btn3: false,
          btn4: false,
          btn5: false,
          btn6: false,
          btn7: false,
          btn8: false,
          btn9: false,
          btn10: false,
          btn11: false,
          btn12: false
        }
      }
    },
    mounted() {
      // this.userId = this.$route.query.id || ''
      this.getList()
    },
    methods: {
      getList() {
        // this.$ajax.get('user/detail', this.userId)
        //   .then(res => {
        //     console.log('', res);
        //     this.userDetail = res.data;
        //   })
      }
    }
}
</script>
<style scoped lang="less">
  .btn-item {
    text-align: center;
    margin-bottom: 20px;
    p {
      margin-bottom: 10px;
    }
  }
</style>
