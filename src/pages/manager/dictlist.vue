<template>
  <el-row>
    <div class="mb10">
      <el-button @click="addDict" type="primary">添加字典</el-button>
    </div>
    <el-collapse accordion @change="handleClick" style="width:90%">
      <el-collapse-item :name="item.code" v-for="(item,index) in dictList" :key="index">
        <template slot="title">
          {{ item.name }}<span class="blue fl-r" @click="modifyDict(item)" style="padding-left:20px">编辑</span>
        </template>
        <el-button @click="addDictItem" type="text">添加字典项</el-button>
        <li v-for="(item,index) in dictItemList" :key="index" class="dictItem">
          <span>名称：{{item.itemName}}</span>
          <span>状态码：{{item.itemCode}}</span>
          <span class="blue" @click="modifyDictItem(item)">编辑</span>
        </li>
      </el-collapse-item>
    </el-collapse>
    <el-dialog :title="title" size="tiny" :visible.sync="addDialog.visible" :close-on-click-modal="false">
      <el-form ref="addForm" :model="addDialog.data" label-width="100px" :rules="addDialog.rules">
        <el-form-item label="字典code：" prop="code">
          <el-input v-model="addDialog.data.code"></el-input>
        </el-form-item>
        <el-form-item label="字典名称：" prop="name">
          <el-input v-model="addDialog.data.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmit('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="itemTitle" size="tiny" :visible.sync="addItemDialog.visible" :close-on-click-modal="false">
      <el-form ref="addItemForm" :model="addItemDialog.data" label-width="100px" :rules="addItemDialog.rules">
        <el-form-item label="字典code：" prop="dictCode">
          <el-input v-model="addItemDialog.data.dictCode"></el-input>
        </el-form-item>
        <el-form-item label="字典项code：" prop="itemCode">
          <el-input v-model="addItemDialog.data.itemCode"></el-input>
        </el-form-item>
        <el-form-item label="字典项名称：" prop="itemName">
          <el-input v-model="addItemDialog.data.itemName"></el-input>
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
        dictList: [],
        dictItemList: [],
        addDialog: {
          visible: false,
          data: {},
          rules: {
            code: [{
              required: true,
              message: '请输入字典code',
              trigger: 'blur'
            }],
            name: [{
              required: true,
              message: '请输入字典项名称',
              trigger: 'blur'
            }]
          }
        },
        addItemDialog: {
          visible: false,
          data: {},
          rules: {
            dictCode: [{
              required: true,
              message: '请输入字典code',
              trigger: 'blur'
            }],
            itemCode: [{
              required: true,
              message: '请输入字典项code',
              trigger: 'blur'
            }],
            itemName: [{
              required: true,
              message: '请输入字典项名称',
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
          code: '',
          name: ''
        }
      },
      initItem() {
        this.addItemDialog.data = {
          dictCode: '',
          itemCode: '',
          itemName: ''
        }
      },
      handleClick(val) {
        if (val) {
          this.$ajax.get('dict/dictItemList', val)
            .then(res => {
              console.log('', res);
              this.dictItemList = res.data;
            })
        } else {
          return;
        }
      },
      getList() {
        this.$ajax.get('dict/list')
          .then(res => {
            console.log('', res);
            this.dictList = res.data;
          })
      },
      addDict() {
        this.title = '添加字典'
        this.resetForm('addForm')
        this.init()
        this.addDialog.visible = true;
      },
      modifyDict(data) {
        this.title = '修改字典'
        this.resetForm('addForm')
        this.init()
        this.addDialog.visible = true;
        this.addDialog.data = {
          code: data.code,
          name: data.name
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
        this.$ajax.post('dict/saveOrUpdate', send)
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
      addDictItem() {
        this.itemTitle = '添加字典项'
        this.resetForm('addItemForm')
        this.initItem()
        this.addItemDialog.visible = true;
      },
      modifyDictItem(data) {
        this.itemTitle = '修改字典项'
        this.resetForm('addItemForm')
        this.initItem()
        this.addItemDialog.visible = true;
        this.addItemDialog.data = {
          dictCode: data.dictCode,
          itemCode: data.itemCode,
          itemName: data.itemName
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
        this.$ajax.post('dict/dictItem/saveOrUpdate', send)
          .then(res => {
            console.log('', res);
            var type = res.success ? 'success' : 'error';
            if (type === 'success') {
              this.addItemDialog.visible = false;
              this.getList();
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
<style scoped>
.dictItem {
  line-height: 30px;
}

.dictItem span+span {
  margin-left: 20px;
}
.blue.fl-r {
  margin-right: -40px;
}
</style>
