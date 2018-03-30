<template>
  <div>
    <el-form :model="form" :rules="rules" ref="loginForm" label-position="left" class="login-container" @keyup.enter.native="submitForm('loginForm')">
      <h2 class="title">系统登录</h2>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名" id="userName"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submitForm('loginForm')" :loading="logining">立即登录</el-button>
      </el-form-item>
      <el-form-item>
        <!-- <el-checkbox v-model="form.rememberMe" class="remember">保持登录</el-checkbox> -->
        <el-col :span="24" style="text-align:right;">
        <el-button type="text" @click="$router.push('/register')">注册新用户</el-button>
        <!-- <el-button type="text">忘记密码？</el-button> -->
      </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logining: false,
      form: {
        username: "", //  admin
        password: "" //  123456
        // rememberMe: false
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    document.getElementById("userName").focus();
    window.sessionStorage.clear();
    // this.$cookie.delete('AUID');
  },
  methods: {
    submitForm(formName) {
      if (!this.$validateForm(formName)) {
        return;
      }
      this.logining = true;
      setTimeout(() => {
        this.logining = false;
      }, 3000);
      // console.log(this.$refs[formName].validate())
      this.$ajax
        .post("register/login", this.form)
        .then(res => {
          this.logining = false;
          const userData = res.data;
          this.$store.commit("UPDATE_USER", userData);
          this.$store.commit("UPDATE_USERID", userData.userId);
          this.$router.push("/home");
        })
        .catch(() => {
          this.logining = false;
        });
    }
  }
};
</script>
<style scoped lang="less">
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 60px auto;
  width: 420px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .title {
    margin-bottom: 20px;
    text-align: center;
    color: #505458;
    font-size: 16px;
  }
  .weui-vcode-img {
    cursor: pointer;
    width: 90px;
  }
}
</style>
