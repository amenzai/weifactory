<template>
  <el-row>
    <div class="mb10">
      <el-button @click="addMenu" type="primary">添加菜单</el-button>
    </div>
    <el-collapse accordion @change="handleClick">
      <el-collapse-item :name="item.menuId" v-for="(item,index) in menuList" :key="index">
        <template slot="title">{{ `${item.name}` }}<span style="padding-left:40px" v-if="!!item.perms">备注：{{ item.perms }}</span></template>
        <div class="bg">
          <span>名称：{{ item.name }}</span>
          <span>路径：{{ item.url }}</span>
          <span class="blue" @click="modifyMenu(item)">编辑</span>
          <span class="blue" @click="deleteMenu(item.menuId)">删除</span>
          <span class="blue" @click="addMenuItem(item.menuId)">添加子菜单</span>
        </div>
        <li v-for="(item,index) in menuItemList" :key="index" class="menuItem">
          <span>名称：{{ item.name }}</span>
          <span>路径：{{ item.url }}</span>
          <span v-if="!!item.perms">备注：{{ item.perms }}</span>
          <span class="blue" @click="modifyMenuItem(item)">编辑</span>
          <span class="blue" @click="deleteMenu(item.menuId)">删除</span>
        </li>
      </el-collapse-item>
    </el-collapse>
    <el-dialog :title="title" :visible.sync="addDialog.visible" :close-on-click-modal="false">
      <el-form ref="addForm" :model="addDialog.data" label-width="100px" :rules="addDialog.rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addDialog.data.name"></el-input>
        </el-form-item>
        <el-form-item label="路径：" prop="url">
          <el-input v-model="addDialog.data.url"></el-input>
        </el-form-item>
        <el-form-item label="图标：">
          <el-input v-model="addDialog.data.icon"></el-input>
        </el-form-item>
        <el-form-item label="序号：">
          <el-input v-model="addDialog.data.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="addDialog.data.perms"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmit('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="itemTitle" :visible.sync="addItemDialog.visible" :close-on-click-modal="false">
      <el-form ref="addItemForm" :model="addItemDialog.data" label-width="100px" :rules="addItemDialog.rules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addItemDialog.data.name"></el-input>
        </el-form-item>
        <el-form-item label="路径：" prop="url">
          <el-input v-model="addItemDialog.data.url"></el-input>
        </el-form-item>
        <el-form-item label="图标：">
          <el-input v-model="addItemDialog.data.icon"></el-input>
        </el-form-item>
        <el-form-item label="序号：">
          <el-input v-model="addItemDialog.data.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="addItemDialog.data.perms"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItemSubmit('addItemForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  data() {
      return {
        title: '',
        itemTitle: '',
        menuList: [],
        menuItemList: [],
        addDialog: {
          visible: false,
          data: {},
          rules: {
            url: [{
              required: true,
              message: '请输入菜单路径',
              trigger: 'blur'
            }],
            name: [{
              required: true,
              message: '请输入菜单名称',
              trigger: 'blur'
            }]
          }
        },
        addItemDialog: {
          visible: false,
          data: {},
          rules: {
            url: [{
              required: true,
              message: '请输入菜单项路径',
              trigger: 'blur'
            }],
            name: [{
              required: true,
              message: '请输入菜单项名称',
              trigger: 'blur'
            }]
          }
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      init() {
        this.addDialog.data = {
          name: '',
          url: '',
          icon: 'el-icon-setting',
          perms: '-',
          orderNum: '0'
        }
      },
      initItem() {
        this.addItemDialog.data = {
          parentId: '',
          name: '',
          url: '',
          icon: 'el-icon-setting',
          perms: '-',
          orderNum: '0'
        }
      },
      handleClick(val) {
        if (val) {
          this.$http.get('menu/list', val)
            .then(res => {
              console.log('', res);
              this.menuItemList = res.data;
            })
        } else {
          return;
        }
      },
      getList() {
        this.$http.get('menu/list')
          .then(res => {
            console.log('', res);
            this.menuList = res.data;
          })
      },
      addMenu() {
        this.title = '添加菜单'
        this.resetForm('addForm')
        this.init()
        this.addDialog.visible = true;
      },
      modifyMenu(data) {
        this.title = '修改菜单'
        this.resetForm('addForm')
        this.addDialog.visible = true;
        this.addDialog.data = {
          menuId: data.menuId,
          url: data.url,
          name: data.name,
          icon: data.icon,
          perms: data.perms,
          orderNum: data.orderNum
        }
      },
      addSubmit(formName) {
        let valid = false;
        this.$refs[formName].validate((v) => {
          valid = v
        });
        if (!valid) {
          return false;
        }
        const send = JSON.parse(JSON.stringify(this.addDialog.data));
        this.$http.post('menu/saveOrUpdate', send)
          .then(res => {
            console.log('', res);
            var type = res.success ? 'success' : 'error';
            if (type === 'success') {
              this.addDialog.visible = false;
              this.getList();
            }
            this.$message({
              message: res.message,
              type: type
            });
          })
      },
      addMenuItem(parentId) {
        this.itemTitle = '添加子菜单'
        this.resetForm('addItemForm')
        this.initItem()
        this.addItemDialog.data.parentId = parentId
        this.addItemDialog.visible = true;
      },
      modifyMenuItem(data) {
        this.itemTitle = '修改子菜单'
        this.resetForm('addItemForm')
        this.addItemDialog.visible = true;
        this.addItemDialog.data = {
          parentId: data.parentId,
          menuId: data.menuId,
          url: data.url,
          name: data.name,
          icon: data.icon,
          perms: data.perms,
          orderNum: data.orderNum
        }
      },
      addItemSubmit(formName) {
        let valid = false;
        this.$refs[formName].validate((v) => {
          valid = v
        });
        if (!valid) {
          return false;
        }
        const send = JSON.parse(JSON.stringify(this.addItemDialog.data));
        this.$http.post('menu/saveOrUpdate', send)
          .then(res => {
            console.log('', res);
            var type = res.success ? 'success' : 'error';
            if (type === 'success') {
              this.addItemDialog.visible = false;
              this.handleClick(this.addItemDialog.data.parentId)
            }
            this.$message({
              message: res.message,
              type: type
            });
          })
      },
      deleteMenu(id) {
        this.$confirm('确定删除菜单吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'box-confim',
          cancelButtonClass: 'box-cancel',
          type: 'warning'
        }).then(() => {
          this.$http.get('menu/delete', id)
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
        }).catch(() => {});
      },
      resetForm(formName) {
        this.$refs[formName] && this.$refs[formName].resetFields();
      }
    }
}
</script>
<style scoped>
.menuItem {
  line-height: 30px;
  padding-left:26px
}

.menuItem span+span {
  margin-left: 20px;
}
.bg span+span {
  margin-left: 20px;
}
.bg {
  line-height: 36px;
  border-bottom: 1px solid #EBEEF5;
  margin: -10px -15px 10px;
  padding-left: 16px;
}

</style>
