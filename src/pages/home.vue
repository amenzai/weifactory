<template>
  <div class="layout clearfix">
    <div class="layout-menu-left">
      <div class="layout-logo-left cursor" @click="$router.push('/home')">
        <img :src="siteParam.logo" alt="logo" height="60">
      </div>
      <el-menu default-active="0" class="el-menu-vertical-demo" :unique-opened="true">
        <el-submenu :index="mainIndex + ''" v-for="(item,mainIndex) in menus" :key="mainIndex">
          <template slot="title">
            <span>
              <i class="el-icon-setting"></i>{{ item.name }}</span>
          </template>
          <el-menu-item :index="mainIndex + '-' + index" v-for="(child,index) in item.children" :key="index">
            <router-link :to="child.url">{{ child.name }}</router-link>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="layout-main">
      <div class="layout-header">
        <div class="layout-nav">
          <h1 class="title fl-l">{{ siteParam.weifactoryName }}</h1>
          <el-dropdown @command="handleClick" trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-my-user"></i>
              {{userData.userName}}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="modify">修改密码</el-dropdown-item>
              <el-dropdown-item command="modifyUser">修改账户信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="layout-content">
        <div class="layout-breadcrumb" v-show="$route.matched[1].name !== 'index'">
          <h2 class="subtitle">{{ $route.matched[0].meta.title }} / {{ $route.matched[1].meta.title }}</h2>
        </div>
        <div class="layout-content-main">
          <transition name="fade" mode="out-in">
            <div v-loading.lock="$store.state.loading" element-loading-text="加载中,请稍候.">
              <router-view></router-view>
            </div>
          </transition>
        </div>
        <div class="layout-copy">
          {{ siteParam.copyRight }}
        </div>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="modifyPwd.visible" :close-on-click-modal="false">
      <el-form :model="modifyPwd.data" :rules="modifyPwd.rules" label-width="120px" ref="modifyPwdForm">
        <el-form-item label="旧密码" prop="oldPwd">
          <el-input v-model="modifyPwd.data.oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="modifyPwd.data.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="newPassword2">
          <el-input v-model="modifyPwd.data.newPassword2" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifySubmit('modifyPwdForm')">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改用户信息" :visible.sync="modifyDialog.visible" :close-on-click-modal="false">
      <el-form ref="modifyForm" :model="modifyDialog.data" label-width="100px" :rules="modifyDialog.rules">
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="modifyDialog.data.userName" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="userPhone">
          <el-input v-model="modifyDialog.data.userPhone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="11">
            <el-form-item prop="codeNum">
              <el-input v-model="modifyDialog.data.codeNum" placeholder="短信验证码" :disabled="!smsDis"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-button type="primary" @click="sendCode" :loading="smslogining" :disabled="smsDis">{{smsText}}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱：" prop="userEmail">
          <el-input v-model="modifyDialog.data.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="微信ID：">
          <el-input v-model="modifyDialog.data.userWeixinId"></el-input>
        </el-form-item>
        <el-form-item label="微信名称：">
          <el-input v-model="modifyDialog.data.userWeixinNickname"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户描述：">
          <el-input v-model="modifyDialog.data.personalIntroduction"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifyUserSubmit('modifyForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.modifyPwd.data.newPassword2 !== '') {
          this.$refs.modifyPwdForm.validateField('newPassword2')
        }
        callback()
      }
    }
    var checkPass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.modifyPwd.data.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      siteParam: {
        logo: '',
        weifactoryName: '',
        copyRight: ''
      },
      modifyPwd: {
        data: {
          oldPassword: '',
          newPassword: '',
          newPassword2: ''
        },
        visible: false,
        rules: {
          newPassword: [
            {
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
              message: '长度不少于八位字符包含数字和字母',
              trigger: 'blur'
            },
            {
              required: true,
              validator: checkPass,
              trigger: 'blur'
            }
          ],
          newPassword2: [
            {
              required: true,
              validator: checkPass2,
              trigger: 'blur'
            }
          ]
        }
      },
      modifyDialog: {
        visible: false,
        data: {},
        rules: {
          userName: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }
          ],
          userPhone: [
            {
              pattern: /^1[34578]\d{9}$/,
              message: '手机号码格式不正确'
            }
          ],
          userEmail: [
            {
              type: 'email',
              message: '邮箱格式不正确'
            }
          ]
        }
      },
      menus: [],
      isShow: {
        breadcrumb: true,
        copy: true
      },
      timer: null,
      smslogining: false,
      smsText: '获取验证码',
      smsDis: false
    }
  },
  created() {
    this.getMenus()
    this.getDicList()
    this.getParamList()
  },
  computed: {
    userData() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    getMenus() {
      this.$http
        .get('menu', this.userData.userId)
        .then(res => {
          this.menus = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    sendCode() {
      let valid = false
      this.$refs.modifyForm.validateField('userPhone', msg => {
        if (msg !== this.modifyDialog.data.userPhone && !msg) {
          valid = true
        }
      })
      if (!valid) {
        return false
      }
      if (this.modifyDialog.data.userPhone == this.userData.userPhone) {
        this.$message.warning('更换手机号才可以发送验证码！')
        return
      }
      this.smslogining = true
      const send = {
        cell: this.modifyDialog.data.userPhone
      }
      this.$http
        .post('register/smsCode', send)
        .then(res => {
          this.smslogining = false
          this.smsDis = true
          var count = 120
          this.timer = setInterval(() => {
            --count
            if (count === 0) {
              this.smsDis = false
              this.smsText = '获取验证码'
              clearInterval(this.timer)
            } else {
              this.smsText = '重新发送(' + count + 's)'
            }
          }, 1000)
        })
        .catch(() => {
          this.smslogining = false
        })
    },
    handleClick(val) {
      const send = {
        userId: this.userData.userId
      }
      switch (val) {
        case 'logout':
          this.$confirm('确认退出吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            confirmButtonClass: 'box-confim',
            cancelButtonClass: 'box-cancel',
            type: 'warning'
          })
            .then(() => {
              this.$http
                .post('register/loginOut', send)
                .then(res => {
                  this.$message.success('登出成功')
                  this.$router.push('/security/login')
                })
                .catch(() => {
                  this.$router.push('/security/login')
                })
            })
            .catch(() => {})
          break
        case 'modify':
          this.modifyPwd.visible = true
          this.$resetForm('modifyPwdForm')
          this.modifyPwd.data = {
            oldPassword: '',
            newPassword: '',
            newPassword2: ''
          }
          break
        case 'modifyUser':
          this.modifyUser()
          break
      }
    },
    modifyUser() {
      this.$resetForm('modifyForm')
      clearInterval(this.timer)
      this.smsDis = false
      this.smsText = '获取验证码'
      this.modifyDialog.visible = true
      this.modifyDialog.data = {
        id: this.userData.userId,
        userName: this.userData.userName,
        userPhone: this.userData.userPhone,
        codeNum: '',
        userEmail: this.userData.userEmail,
        userWeixinId: this.userData.weixinId,
        userWeixinNickname: this.userData.weixinNickName
        // personalIntroduction: this.userData.personalIntroduction
      }
    },
    modifyUserSubmit(formName) {
      if (!this.$validateForm(formName)) {
        return
      }
      if (this.modifyDialog.data.userPhone !== this.userData.userPhone) {
        if (!this.modifyDialog.data.codeNum) {
          this.$message.warning('更换手机号后请获取验证码，并正确输入验证码')
          return
        }
      }
      const send = JSON.parse(JSON.stringify(this.modifyDialog.data))
      delete send.codeNum
      this.$http.post('user/update', send).then(res => {
        this.modifyDialog.visible = false
        this.$http.get('user/detail', this.userData.userId).then(res => {
          this.$store.commit('UPDATE_USER', res.data)
        })
        this.$message.success(res.message)
      })
    },
    modifySubmit(formName) {
      if (!this.$validateForm(formName)) {
        return
      }
      const send = {
        username: this.$store.state.userInfo.userName,
        oldPassword: this.modifyPwd.data.oldPassword,
        newPassword: this.modifyPwd.data.newPassword
      }
      this.$http.post('user/changePassword', send).then(res => {
        console.log('', res)
        var type = res.success ? 'success' : 'error'
        if (type === 'success') {
          this.modifyPwd.visible = false
          this.$router.push('/security/login')
        }
        this.$message({
          message: res.message,
          type: type
        })
      })
    },
    getParamList() {
      this.$http.get('param/listAll').then(res => {
        const paramList = res.data
        paramList.forEach(item => {
          if (item.paramCode == 'logo') {
            this.siteParam.logo = item.paramValue
          }
          if (item.paramCode == 'weifactoryName') {
            this.siteParam.weifactoryName = item.paramValue
          }
          if (item.paramCode == 'copyRight') {
            this.siteParam.copyRight = item.paramValue
          }
        })
      })
    },
    getDicList() {
      this.$http
        .get('dict/all')
        .then(res => {
          this.$store.commit('UPDATE_DICT_INFO', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '~common/less/variable';
.layout-menu-left {
  width: 210px;
  // background: #545c64;
  background-color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: auto;
  // color: rgba(255, 255, 255, .7);
  a {
    color: #303133;
  }
  .layout-logo-left {
    height: 60px;
    // background-color: #545c64;
    line-height: 60px;
    font-size: 28px;
    text-align: center;
    // color: rgba(255, 255, 255, 0.7);
  }
}

.layout-main {
  position: absolute;
  top: 0;
  right: 0;
  left: 210px;
  bottom: 0;
  .layout-header {
    height: 60px;
    line-height: 60px;
    background-color: #545c64;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    width: 100%;
    .title {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.7);
      font-weight: 500;
      padding-left: 20px;
    }
  }
  .layout-content {
    padding: 16px;
    background-color: #f0f2f5;
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 60px;
    overflow: auto;
    .layout-breadcrumb {
      padding-bottom: 10px;
      .subtitle {
        font-size: 14px;
        color: #666;
      }
    }
    .layout-content-main {
      // border-radius: 6px;
      min-height: 400px;
      padding: 24px;
      background-color: #fff;
    }
    .layout-copy {
      text-align: center;
      line-height: 30px;
      color: #9ea7b4;
      margin-top: 20px;
    }
  }
}
.el-menu {
  // border-radius: none;
  border: 0;
}
.el-submenu .el-menu-item {
  height: 44px;
  line-height: 44px;
  padding: 0;
}

.el-submenu .el-menu-item a {
  display: block;
  padding-left: 48px;
  margin-left: -40px;
}

.el-menu-item a.router-link-active {
  color: #409eff;
  background-color: @router-link-bgc;
  border-right: 4px solid @blue;
}

.el-dropdown {
  color: rgba(255, 255, 255, 0.7);
  float: right;
  margin-right: 20px;
  cursor: pointer;
}
.el-dropdown-menu {
  z-index: 999999;
}
</style>
