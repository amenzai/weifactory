<template>
  <el-row>
    <div class="mb10">
      <el-button @click="addDict" type="primary">添加字典</el-button>
    </div>
    <el-collapse accordion @change="handleClick">
      <el-collapse-item :name="item.code" v-for="(item,index) in dictList" :key="index">
        <template slot="title">{{ item.name }}</template>
        <div class="bg">
          <span>名称：{{ item.name }}</span>
          <span>状态码：{{ item.code }}</span>
          <span class="blue" @click="modifyDict(item)">编辑</span>
          <span class="blue" @click="addDictItem(item.code)">添加字典项</span>
        </div>
        <li v-for="(item,index) in dictItemList" :key="index" class="dictItem">
          <span>名称：{{item.itemName}}</span>
          <span>状态码：{{item.itemCode}}</span>
          <span class="blue" @click="modifyDictItem(item)">编辑</span>
        </li>
      </el-collapse-item>
    </el-collapse>
    <el-dialog :title="title" :visible.sync="addDialog.visible" :close-on-click-modal="false">
      <el-form ref="addForm" :model="addDialog.data" label-width="100px" :rules="addDialog.rules">
        <el-form-item label="字典code：" prop="code">
          <el-input v-model="addDialog.data.code" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="字典名称：" prop="name">
          <el-input v-model="addDialog.data.name"></el-input>
        </el-form-item>
        <el-form-item label="字典状态：">
          <el-radio-group v-model="addDialog.data.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字典描述：">
          <el-input v-model="addDialog.data.discription"></el-input>
        </el-form-item>
        <el-form-item label="字典序号：">
          <el-input v-model="addDialog.data.orderNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubmit('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="itemTitle" :visible.sync="addItemDialog.visible" :close-on-click-modal="false">
      <el-form ref="addItemForm" :model="addItemDialog.data" label-width="100px" :rules="addItemDialog.rules">
        <!-- <el-form-item label="字典code：" prop="dictCode">
          <el-input v-model="addItemDialog.data.dictCode"></el-input>
        </el-form-item> -->
        <el-form-item label="字典项code：" prop="itemCode">
          <el-input v-model="addItemDialog.data.itemCode" :disabled="isEdit"></el-input>
        </el-form-item>
        <el-form-item label="字典项名称：" prop="itemName">
          <el-input v-model="addItemDialog.data.itemName"></el-input>
        </el-form-item>
        <el-form-item label="字典状态：">
          <el-radio-group v-model="addItemDialog.data.status">
            <el-radio label="1">正常</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字典描述：">
          <el-input v-model="addItemDialog.data.discription"></el-input>
        </el-form-item>
        <el-form-item label="字典序号：">
          <el-input v-model="addItemDialog.data.orderNumber"></el-input>
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
        isEdit: false,
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
              message: '请输入字典名称',
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
          name: '',
          status: '1',
          discription: '',
          orderNumber: ''
        }
      },
      initItem() {
        this.addItemDialog.data = {
          dictCode: '',
          itemCode: '',
          itemName: '',
          status: '1',
          discription: '',
          orderNumber: ''
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
        this.isEdit = false
        this.addDialog.visible = true;
      },
      modifyDict(data, state) {
        this.title = '修改字典'
        this.resetForm('addForm')
        this.isEdit = true
        this.addDialog.visible = true;
        this.addDialog.data = {
          code: data.code,
          name: data.name,
          status: data.status,
          discription: data.discription,
          orderNumber: data.orderNumber
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
      addDictItem(code) {
        this.itemTitle = '添加字典项'
        this.resetForm('addItemForm')
        this.initItem()
        this.isEdit = false
        this.addItemDialog.data.dictCode = code
        this.addItemDialog.visible = true;
      },
      modifyDictItem(data, state) {
        this.itemTitle = '修改字典项'
        this.resetForm('addItemForm')
        this.isEdit = true
        this.addItemDialog.visible = true;
        this.addItemDialog.data = {
          dictCode: data.dictCode,
          itemCode: data.itemCode,
          itemName: data.itemName,
          status: data.status,
          discription: data.discription,
          orderNumber: data.orderNumber
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
  padding-left: 26px;
}

.dictItem span+span {
  margin-left: 20px;
}

.bg span+span {
  margin-left: 20px;
}

.bg {
  line-height: 30px;
  border-bottom: 1px solid rgb(236, 223, 223);
  margin: -10px -15px 10px;
  padding-left: 16px;
}
</style>
