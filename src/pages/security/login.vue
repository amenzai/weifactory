<template>
  <div class="wrap">
    <div class="container">
      <el-form :model="form" :rules="rules" ref="loginForm" label-position="left" class="login-container" @keyup.enter.native="submitForm('loginForm')">
        <h2 class="title">系统登录</h2>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名/手机号" id="userName"></el-input>
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
            <el-button type="text" class="fl-l" @click="setPassword">忘记密码？</el-button>
            <el-button type="text" @click="$router.push('/security/register')">注册新用户</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="设置新密码" :visible.sync="modifyDialog.visible" :close-on-click-modal="false">
      <el-form ref="modifyForm" :model="modifyDialog.data" label-width="100px" :rules="modifyDialog.rules">
        <el-form-item prop="phoneNumber" label="手机号：">
          <el-input v-model="modifyDialog.data.phoneNumber" placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="validateCode">
          <el-col :span="11">
            <el-input v-model="modifyDialog.data.validateCode" placeholder="短信验证码" :disabled="!smsDis"></el-input>
          </el-col>
          <el-col class="line" :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-button type="primary" @click="sendCode" :loading="smslogining" :disabled="smsDis">{{smsText}}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item prop="password" label="新密码：">
          <el-input type="password" v-model="modifyDialog.data.password" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item prop="enpassword" label="确认密码：">
          <el-input type="password" v-model="modifyDialog.data.enpassword" placeholder="确认密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit('modifyForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
export default {
  data() {
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.modifyDialog.data.enpassword !== '') {
          this.$refs.modifyForm.validateField('enpassword')
        }
        callback()
      }
    }
    var checkPass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.modifyDialog.data.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      logining: false,
      form: {
        username: '', //  admin
        password: '' //  123456
        // rememberMe: false
      },
      smslogining: false,
      smsText: '获取验证码',
      smsDis: false,
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      },
      modifyDialog: {
        visible: false,
        data: {
          phoneNumber: '',
          validateCode: '',
          password: '',
          enpassword: ''
        },
        rules: {
          password: [
            {
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
              message: '长度不少于八位字符包含数字和字母',
              trigger: 'blur'
            },
            {
              validator: checkPass,
              trigger: 'blur'
            }
          ],
          enpassword: [
            {
              validator: checkPass2,
              trigger: 'blur'
            }
          ],
          phoneNumber: [
            {
              required: true,
              message: '请输入手机号码',
              trigger: 'blur'
            },
            {
              pattern: /^1[34578]\d{9}$/,
              message: '手机号码格式不正确',
              trigger: 'blur'
            }
          ],
          validateCode: [
            {
              required: true,
              message: '请输入短信验证码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 6,
              message: '长度6个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    }
  },
  mounted() {
    document.getElementById('userName').focus()
    this.$storage.session.clear()
    // this.$cookie.delete('AUID');
  },
  methods: {
    submitForm(formName) {
      if (!this.$validateForm(formName)) {
        return
      }
      this.logining = true
      setTimeout(() => {
        this.logining = false
      }, 3000)
      // console.log(this.$refs[formName].validate())
      this.$http
        .post('register/login', this.form)
        .then(res => {
          this.logining = false
          const userData = res.data || {}
          this.$store.commit('UPDATE_USER', userData)
          this.$store.commit('UPDATE_USERID', userData.userId)
          this.$router.push('/home')
        })
        .catch(() => {
          this.logining = false
        })
    },
    sendCode() {
      let valid = false
      this.$refs.modifyForm.validateField('phoneNumber', msg => {
        if (msg !== this.modifyDialog.data.phoneNumber && !msg) {
          valid = true
        }
      })
      if (!valid) {
        return false
      }
      this.smslogining = true
      const send = {
        cell: this.modifyDialog.data.phoneNumber
      }
      this.$http
        .post('register/smsCode', send)
        .then(res => {
          this.smslogining = false
          this.smsDis = true
          var count = 120
          var ret = setInterval(() => {
            --count
            if (count === 0) {
              this.smsDis = false
              this.smsText = '获取验证码'
              clearInterval(ret)
            } else {
              this.smsText = '重新发送(' + count + 's)'
            }
          }, 1000)
        })
        .catch(() => {
          this.smslogining = false
        })
    },
    setPassword() {
      this.$refs['modifyForm'] && this.$resetForm('modifyForm')
      this.modifyDialog.visible = true
    },
    submit(formName) {
      if (!this.$validateForm(formName)) {
        return
      }
      this.$http
        .post('register/updatePw', this.modifyDialog.data)
        .then(res => {
          this.modifyDialog.visible = false
          this.$message.success(res.message)
        })
        .catch(() => {})
    }
  }
}
</script>
<style scoped lang="less">
.wrap {
  width: 100%;
  height: 100%;
  background-image: url(../../common/images/bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
}
.container {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.login-container {
  position: absolute;
  top: 50%;
  right: 0;
  width: 320px;
  margin-top: -147px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  padding: 35px 35px 15px 35px;
  background: rgba(255, 255, 255, 0.5);
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
