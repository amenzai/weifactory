<template>
  <div @keyup.enter="submitForm('loginForm')">
    <el-form :model="form" :rules="rules" ref="loginForm" label-position="left" class="demo-ruleForm login-container">
      <h2 class="title">系统登录</h2>
      <!-- <el-form-item label="">
        <el-select clearable placeholder="请选择" v-model="form.demo">
          <el-option label="经济效益优先模式" value="1"></el-option>
          <el-option label="速率优先模式" value="2"></el-option>
          <el-option label="采收期确定模式" value="3"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名" size="large"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="密码" size="large"></el-input>
      </el-form-item>
      <!-- <el-form-item required>
        <el-col :span="11">
          <el-form-item prop="captcha">
            <el-input v-model="form.captcha" placeholder="验证码" size="large"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">&nbsp;</el-col>
        <el-col :span="11">
          <img class="weui-vcode-img" :src="verifyImage" height="32" @click="loadVerify" />
        </el-col>
      </el-form-item> -->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submitForm('loginForm')" :loading="logining" size="large">立即登录</el-button>
      </el-form-item>
      <el-form-item>
        <!-- <el-col :span="8">
          <el-checkbox v-model="form.rememberMe" class="remember">保持登录</el-checkbox>
        </el-col> -->
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
      // verifyImage: this.$appconfig.captcha,
      form: {
        username: '', //  admin
        password: '' //  123456
        // captcha: '',
        // rememberMe: false
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
    window.sessionStorage.clear();
    // this.$cookie.delete('AUID');
  },
  methods: {
    submitForm(formName) {
      let valid = false;
      this.$refs[formName].validate((v) => {
        valid = v
      });
      if (!valid) {
        return false;
      }
      this.logining = true;
      window.sessionStorage.clear();
      // console.log(this.$refs[formName].validate())
      const that = this;
      this.$ajax.post('register/login', this.form).then(function(response) {
        console.log('login', response)
        that.logining = false;
        if (response.success) {
          // that.getBtnPerms();
          window.sessionStorage.setItem('menuType', 1);
          var user = JSON.stringify(response.data);
          that.$store.commit('UPDATE_USER', user);
          that.$store.commit('UPDATE_USERID', response.data.userId);
          const url = window.sessionStorage.getItem('url') || '';
          if (url !== '' && url.indexOf('register') < 0 && url.indexOf('findpwd') < 0) {
            that.$store.commit('UPDATE_URL', '');
            that.$router.push(url)
          } else {
            that.$router.push('/home')
          }
        } else {
          that.$message.error(response.message);
          // that.loadVerify();
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
    // loadVerify() {
    //   // const index = this.verifyImage.indexOf('?');
    //   // let imageUrl = this.verifyImage;
    //   // if (index > -1) {
    //   //   imageUrl = this.verifyImage.substr(0, index)
    //   // }
    //   // this.verifyImage = imageUrl + '?t=' + new Date().getTime()
    // },
    // getBtnPerms() {
    //   // btnPerms().then(res => {
    //   //   if (res.success) {
    //   //     var perms = res.data;
    //   //     window.sessionStorage.setItem('btn-perms', JSON.stringify(perms));
    //   //   }
    //   // })
    // }
  }
}
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
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
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
