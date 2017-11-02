<template>
  <el-row>
    <el-col :span="14" :offset="2">
      <el-form ref="formOne" :model="userDetail" label-width="120px">
        <el-form-item label="用户名：">{{ userDetail.userName }}</el-form-item>
        <el-form-item label="手机号：">{{ userDetail.userPhone }}</el-form-item>
        <el-form-item label="邮箱：">{{ userDetail.email }}</el-form-item>
        <el-form-item label="微信号：">{{ userDetail.weixinId }}</el-form-item>
        <el-form-item label="微信昵称：">{{ userDetail.weixinNickName }}</el-form-item>
        <el-form-item label="简介：">{{ userDetail.introduction }}</el-form-item>
        <el-form-item label="角色：">{{ userDetail.roleName }}</el-form-item>  
        <el-form-item label="创建时间：">{{ userDetail.gmtCreate | dateFilter}}</el-form-item>  
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      userId: '',
      userDetail: {}
    }
  },
  created() {
    this.userId = this.$route.query.id || ''
    this.getList()
  },
  methods: {
    getList() {
      this.$ajax.get('user/detail', this.userId)
        .then(res => {
          console.log('', res);
          this.userDetail = res.data;
        })
    }
  }
}
</script>
<style scoped>

</style>
