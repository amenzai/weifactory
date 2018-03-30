<style lang="less">
.reg-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 60px auto;
  width: 420px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  .title {
    margin-bottom: 20px;
    text-align: center;
    color: #505458;
    font-size: 16px;
  }
  .remember {
    margin-bottom: 30px;
  }
}
</style>
<template>
  <div>
    <el-form :model="form" :rules="rules" ref="regForm" label-position="left" label-width="0px" class="reg-container" @keyup.enter.native="submitForm('regForm')">
      <h2 class="title">用户注册</h2>
      <el-form-item>
        <el-radio-group v-model="form.roleId">
          <el-radio :label="2">普通用户</el-radio>
          <el-radio :label="4">专家</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="userName">
        <el-input v-model="form.userName" placeholder="用户名" @blur="checkUserName"></el-input>
      </el-form-item>
      <el-form-item prop="userPassword">
        <el-input type="password" v-model="form.userPassword" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="enpassword">
        <el-input type="password" v-model="form.enpassword" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item prop="userEmail">
        <el-input v-model="form.userEmail" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="userPhone">
        <el-input v-model="form.userPhone" placeholder="手机"></el-input>
      </el-form-item>
      <el-form-item required>
        <el-col :span="11">
          <el-form-item prop="codeNum">
            <el-input v-model="form.codeNum" placeholder="短信验证码" :disabled="!smsDis"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">&nbsp;</el-col>
        <el-col :span="11">
          <el-button type="primary" @click="sendCode" :loading="smslogining" :disabled="smsDis">{{smsText}}</el-button>
        </el-col>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submitForm('regForm')" :loading="logining">马上注册</el-button>
      </el-form-item>
      <el-form-item style="text-align:right;">
        已有账号？
        <el-button type="text" @click="$router.push('/login')">请登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.enpassword !== "") {
          this.$refs.regForm.validateField("enpassword");
        }
        callback();
      }
    };
    var checkPass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      logining: false,
      smslogining: false,
      smsText: "获取验证码",
      smsDis: false,
      form: {
        roleId: 2,
        userName: "",
        userPassword: "",
        enpassword: "",
        userEmail: "",
        userPhone: "",
        codeNum: ""
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 8,
            message: "长度不少于八位字符",
            trigger: "blur"
          }
        ],
        userPassword: [
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
            message: "长度不少于八位字符包含数字和字母",
            trigger: "blur"
          },
          {
            validator: checkPass,
            trigger: "blur"
          }
        ],
        enpassword: [
          {
            validator: checkPass2,
            trigger: "blur"
          }
        ],
        userEmail: [
          {
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        userPhone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur"
          }
        ],
        codeNum: [
          {
            required: true,
            message: "请输入短信验证码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 6,
            message: "长度6个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      if (!this.$validateForm(formName)) {
        return;
      }
      this.logining = true;
      this.$ajax
        .post("register/doRegister", this.form)
        .then(res => {
          this.logining = false;
          if (this.form.roleId === 4) {
            this.$router.push("/home/expert/audit");
          } else {
            this.$alert("注册成功，马上登陆！", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push("/login");
              }
            })
          }
        })
        .catch(() => {
          this.logining = false;
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    sendCode() {
      let valid = false;
      this.$refs.regForm.validateField("userPhone", msg => {
        if (msg !== this.form.userPhone && !msg) {
          valid = true;
        }
      });
      if (!valid) {
        return false;
      }
      this.smslogining = true;
      const send = {
        cell: this.form.userPhone
      };
      this.$ajax
        .post("register/smsCode", send)
        .then(res => {
          this.smslogining = false;
          this.smsDis = true;
          var count = 120;
          var ret = setInterval(() => {
            --count;
            if (count === 0) {
              this.smsDis = false;
              this.smsText = "获取验证码";
              clearInterval(ret);
            } else {
              this.smsText = "重新发送(" + count + "s)";
            }
          }, 1000);
        })
        .catch(() => {
          this.smslogining = false;
        });
    },
    checkUserName() {
      if (this.form.userName) {
        this.$ajax
          .get("user", this.form.userName)
          .then(res => {
            console.log(res.data);
          })
          .catch(() => {
            this.form.userName = "";
          });
      }
    }
    // loadVerify() {
    //   const index = this.verifyImage.indexOf('?');
    //   let imageUrl = this.verifyImage;
    //   if (index > -1) {
    //     imageUrl = this.verifyImage.substr(0, index)
    //   }
    //   this.verifyImage = imageUrl + '?t=' + new Date().getTime()
    // }
  }
};
</script>
