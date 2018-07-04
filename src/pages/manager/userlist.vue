<template>
  <el-row>
    <el-form ref="form" :inline="true" :model="table.send" @keyup.enter.native="getList" id="search-input">
      <el-form-item label="用户名：">
        <el-input v-model="table.send.userName"></el-input>
      </el-form-item>
      <el-form-item label="手机号：">
        <el-input v-model="table.send.userPhone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="table.send.userEmail"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-col :span="24" class="mb10">
      <el-button @click="addUser" type="primary">用户添加</el-button>
    </el-col>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="用户名">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">{{ scope.row.role | seeLabel(roleArr) }}</template>
      </el-table-column>
      <el-table-column label="手机号">
        <template slot-scope="scope">{{ scope.row.userPhone }}</template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="scope">{{ scope.row.userEmail }}</template>
      </el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="修改日期">
        <template slot-scope="scope">{{ scope.row.gmtModified | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">
            <router-link :to="{path:'/home/manager/user-detail',query:{id:scope.row.userId}}">查看</router-link>
          </el-button>
          <el-button @click="modifyUser(scope.row)" type="text">修改</el-button>
          <el-button @click="deleteUser(scope.row.userId)" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.page" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount">
      </el-pagination>
    </div>
    <el-dialog :title="userManageTitle" :visible.sync="modifyDialog.visible" :close-on-click-modal="false">
      <el-form ref="modifyForm" :model="modifyDialog.data" label-width="100px" :rules="modifyDialog.rules">
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="modifyDialog.data.userName" :disabled="isName"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="userPassword" v-show="isShow">
          <el-input v-model="modifyDialog.data.userPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="userPhone">
          <el-input v-model="modifyDialog.data.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="userEmail">
          <el-input v-model="modifyDialog.data.userEmail"></el-input>
        </el-form-item>
        <el-form-item label="微信ID：" prop="userWeixinId">
          <el-input v-model="modifyDialog.data.userWeixinId"></el-input>
        </el-form-item>
        <el-form-item label="微信名称：" prop="userWeixinNickname">
          <el-input v-model="modifyDialog.data.userWeixinNickname"></el-input>
        </el-form-item>
        <el-form-item label="用户描述：" prop="personalIntroduction">
          <el-input v-model="modifyDialog.data.personalIntroduction"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifySubmit('modifyForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import { userRoleMixin } from 'common/js/mixin.js'
export default {
  mixins: [userRoleMixin],
  data() {
    return {
      state: '',
      isName: false,
      isShow: true,
      userManageTitle: '',
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
          userPassword: [
            {
              required: true,
              message: '请输入密码',
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
      table: {
        data: [],
        send: {
          userName: '',
          userPhone: '',
          userEmail: '',
          page: 1,
          pageSize: this.$CONSTANT.PAGE_SIZE
        },
        totalCount: 0,
        totalPages: 0,
        pageSelect: this.$CONSTANT.PAGE_SELECT
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    init() {
      this.modifyDialog.data = {
        id: '',
        userName: '',
        userPassword: '',
        userPhone: '',
        userEmail: '',
        userWeixinId: '',
        userWeixinNickname: '',
        personalIntroduction: ''
      }
    },
    getList() {
      this.$http.post('user/search', this.table.send).then(res => {
        console.log('', res)
        this.table.data = res.data.list
        this.table.totalCount = res.data.total
        this.table.totalPages = res.data.pages
      })
    },
    addUser() {
      this.userManageTitle = '添加用户'
      this.state = 1
      this.isShow = true
      this.isName = false
      this.resetForm('modifyForm')
      this.init()
      this.modifyDialog.visible = true
    },
    modifyUser(data) {
      this.userManageTitle = '修改用户信息'
      this.state = 2
      this.isShow = false
      this.isName = true
      this.resetForm('modifyForm')
      this.init()
      this.modifyDialog.visible = true
      this.modifyDialog.data = {
        id: data.userId,
        userName: data.userName,
        userPassword: data.userPassword,
        userPhone: data.userPhone,
        userEmail: data.userEmail,
        userWeixinId: data.userWeixinId,
        userWeixinNickname: data.userWeixinNickname,
        personalIntroduction: data.personalIntroduction
      }
    },
    modifySubmit(formName) {
      let valid = false
      this.$refs[formName].validate(v => {
        valid = v
      })
      if (!valid) {
        return false
      }
      const send = JSON.parse(JSON.stringify(this.modifyDialog.data))
      if (this.state === 1) {
        this.$http.post('user/add', send).then(res => {
          console.log('', res)
          var type = res.success ? 'success' : 'error'
          if (type === 'success') {
            this.modifyDialog.visible = false
            this.getList()
          }
          this.$message({
            message: res.message,
            type: type
          })
        })
      } else {
        delete send.userPassword
        this.$http.post('user/update', send).then(res => {
          console.log('', res)
          var type = res.success ? 'success' : 'error'
          if (type === 'success') {
            this.modifyDialog.visible = false
            this.getList()
          }
          this.$message({
            message: res.message,
            type: type
          })
        })
      }
    },
    deleteUser(id) {
      this.$confirm('确定删除用户吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'box-confim',
        cancelButtonClass: 'box-cancel',
        type: 'warning'
      })
        .then(() => {
          this.$http.get('user/delete', id).then(res => {
            var type = res.success ? 'success' : 'error'
            if (type === 'success') {
              this.getList()
            }
            this.$message({
              message: res.message,
              type: type
            })
          })
        })
        .catch(() => {})
    },
    searchList() {
      this.table.send.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.table.send.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.table.send.page = val
      this.getList()
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
</style>
