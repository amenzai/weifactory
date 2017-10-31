<template>
  <div class="layout">
    <Row type="flex">
      <Col class="layout-menu-left">
      <div class="layout-logo-left"></div>
      <Menu theme="dark" width="auto" :open-names="['-1']">
        <Submenu :name="mainIndex + ''" v-for="(item,mainIndex) in menus" :key="mainIndex">
          <template slot="title">
            <span><Icon type="ios-navigate"></Icon>{{ item.name }}</span>
          </template>
          <Menu-item :name="mainIndex + '-' + index" v-for="(child,index) in item.children" :key="index">
            <router-link :to="child.url">{{ child.name }}</router-link>
          </Menu-item>
        </Submenu>
      </Menu>
      </Col>
      <Col class="layout-main">
      <div class="layout-header">
        <Menu mode="horizontal" theme="dark">
          <div class="layout-nav">
            <h1 class="title fl-l">微型植物工厂智能监控系统</h1>
            <Dropdown trigger="click" placement="bottom-end" @on-click="handleClick">
              <a href="javascript:void(0)">
                <Icon type="person" />
                <span>{{userData.userName}}</span>
                <Icon type="arrow-down-b"></Icon>
              </a>
              <Dropdown-menu slot="list">
                <Dropdown-item name="modify">修改密码</Dropdown-item>
                <Dropdown-item name="logout">退出</Dropdown-item>
              </Dropdown-menu>
            </Dropdown>
          </div>
        </Menu>
      </div>
      <div class="layout-content">
        <div class="layout-breadcrumb">
          <h2 class="subtitle">{{ $route.matched[1].name }}</h2>
        </div>
        <div class="layout-content-main">
          <transition name="fade" mode="out-in">
            <div v-loading.lock="$store.state.loading" element-loading-text="加载中,请稍候.">
              <router-view></router-view>
            </div>
          </transition>
        </div>
        <div class="layout-copy">
          2011-2016 &copy; TalkingData
        </div>
      </div>
      </Col>
    </Row>
    <el-dialog title="修改密码" size="tiny" :visible.sync="modifyPwd.visible" :close-on-click-modal="false">
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
  </div>
</template>
<script>
export default {
  data() {
      var checkPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.modifyPwd.data.newPassword2 !== '') {
            this.$refs.modifyPwdForm.validateField('newPassword2');
          }
          callback();
        }
      };
      var checkPass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.modifyPwd.data.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        modifyPwd: {
          data: {
            oldPassword: '',
            newPassword: '',
            newPassword2: ''
          },
          visible: false,
          rules: {
            newPassword: [{
              pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
              message: '长度不少于八位字符包含数字和字母',
              trigger: 'blur'
            }, {
              required: true,
              validator: checkPass,
              trigger: 'blur'
            }],
            newPassword2: [{
              required: true,
              validator: checkPass2,
              trigger: 'blur'
            }]
          }
        },
        menus: [],
        userData: {},
        isShow: {
          breadcrumb: true,
          copy: true
        }
      }
    },
    mounted() {
      this.getMenus()
    },
    methods: {
      getMenus() {
        this.userData = JSON.parse(window.sessionStorage.getItem('user'))
        this.$ajax.get('menu', this.userData.userId).then(res => {
          this.menus = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      logout() {
        this.$confirm('确认退出吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$store.commit('UPDATE_USER', '');
          this.$store.commit('UPDATE_URL', this.$route.path);
          console.log(1)
          this.$router.push('/login');
        }).catch(() => {});
      },
      handleClick(val) {
        console.log(val)
        switch (val) {
          case 'logout':
            this.logout();
            break;
          case 'modify':
            this.modifyPwd.visible = true;
            this.resetForm('modifyPwdForm');
            this.modifyPwd.data = {
              oldPassword: '',
              newPassword: '',
              newPassword2: ''
            };
            break;
        }
      },
      modifySubmit(formName) {
        let valid = false;
        this.$refs[formName].validate((v) => {
          valid = v
        });
        if (!valid) {
          return false;
        }
        const send = {
          username: JSON.parse(window.sessionStorage.getItem('user')).userName,
          oldPassword: this.modifyPwd.data.oldPassword,
          newPassword: this.modifyPwd.data.newPassword
        }
        this.$ajax.post('user/changePassword', send)
          .then(res => {
            console.log('', res);
            var type = res.success ? 'success' : 'error';
            if (type === 'success') {
              this.modifyPwd.visible = false;
            }
            this.$message({
              message: res.message,
              type: type
            });
          })
      },
      resetForm(formName) {
        this.$refs[formName] && this.$refs[formName].resetFields();
      }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
html,
body {
  height: 100%;
}

.layout-menu-left {
  width: 160px;
  background: #464c5b;
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: auto;
  color: rgba(255, 255, 255, .7);
  a {
    color: rgba(255, 255, 255, .7);
  }
  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
}

.layout-main {
  position: absolute;
  top: 0;
  right: 0;
  left: 160px;
  bottom: 0;
  .layout-header {
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    position: absolute;
    top: 0;
    width: 100%;
    .title {
      font-size: 20px;
      color: rgba(255, 255, 255, .7);
      font-weight: 500;
      padding-left: 20px;
    }
  }
  .layout-content {
    min-height: 200px;
    padding: 15px;
    // background: #f5f5f5;
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 60px;
    overflow: auto;
    .layout-breadcrumb {
      padding-bottom: 10px;
      border-bottom: 1px solid #ddd;
      .subtitle {
        font-size: 20px;
      }
    }
    .layout-content-main {
      // height: 1000px;
      padding-top: 15px;
    }
    .layout-copy {
      text-align: center;
      line-height: 30px;
      color: #9ea7b4;
      margin-top: 20px;
    }
  }
}

.ivu-menu {
  font-size: 12px;
  .ivu-menu-item {
    font-size: 12px;
  }
}

.ivu-dropdown {
  float: right;
  margin-right: 20px;
  .ivu-select-dropdown {
    z-index: 9999999;
  }
  a {
    color: rgba(255, 255, 255, .7);
  }
}

.el-breadcrumb {
  font-size: 12px;
}

.ivu-menu-item a {
  display: block;
  line-height: 40px;
  padding-left: 44px;
}

.ivu-menu-item a:hover {
  background-color: #2d8cf0;
}

.ivu-menu-vertical .ivu-menu-item {
  padding: 0;
}
</style>
