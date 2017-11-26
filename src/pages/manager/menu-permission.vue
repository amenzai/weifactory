<template>
  <el-row>
    <el-col :span="24">
      <el-alert :title="'当前编辑角色：'+roleName" type="info" show-icon :closable="false" class="mb10"></el-alert>
      <!-- <el-button @click="selectEmpty">清空选中</el-button> -->
      <el-col :span="24" class="panel" v-for="item in data" :key="item.menuId">
        <div class="panel-title">{{item.name}}</div>
        <div class="panel-content">
          <el-checkbox @change="childChange(item)" :key="childItem.menuId" v-model="childItem.select" v-for="childItem in item.children">{{childItem.name}}</el-checkbox>
        </div>
      </el-col>
      <el-col :span="24" class="ta-c">
        <el-button type="primary" size="large" @click="submit">保存</el-button>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
      return {
        hasMenuId: false,
        roleName: '',
        roleId: '',
        data: [], //  保存所有处理过后的菜单数据
        selectsData: []
      }
    },
    created() {
      this.roleName = this.$route.query.name;
      this.roleId = this.$route.query.roleId;
      this.getList();
    },
    methods: {
      getList() {
        this.$ajax.get('menu/role', this.roleId)
          .then(res => {
            this.data = res.data
          })
      },
      // parentChange(item) {
      //   item.children.forEach(current => {
      //     current.select = item.select;
      //   })
      //   item.hasSelected = false;
      //   this.selectsData = this.getSelects();
      //   console.log('parentChange', this.selectsData)
      // },
      childChange(item) {
        console.log('childChange', this.getSelects())
      },
      getSelects() {
        var result = [];
        this.data.forEach(item => {
          item.children.forEach(value => {
            if (value.select) {
              result.push(value.menuId);
            }
          })
          if (item.children.some(value => value.select === true)) {
            result.push(item.menuId);
          }
        })
        return result;
      },
      // selectEmpty() {
      //   this.data.forEach(item => {
      //     item.children.forEach(value => {
      //       value.select = false;
      //     })
      //   })
      // },
      submit() {
        this.selectsData = this.getSelects();
        console.log('childChange', this.selectsData)
        const send = {
          roleId: this.roleId,
          menuString: this.selectsData.join(',')
        }
        this.$ajax.post('role/updateRoleMenus', send)
          .then(res => {
            var type = res.success ? 'success' : 'error';
            if (type === 'success') {
              this.getList();
            }
            this.$message({
              message: res.message,
              type: type
            });
          })
      }
    }
};
</script>
<style scoped>
.panel {
  margin: 10px 0;
  border: 1px solid #ebebeb;
}

.panel .panel-title {
  height: 39px;
  line-height: 39px;
  border-bottom: 1px solid #ebebeb;
  padding-left: 15px;
  background: #f3f3f3;
}

.panel .panel-content {
  padding: 15px 0 15px 15px;
}
</style>
