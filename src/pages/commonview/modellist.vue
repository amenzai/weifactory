<template>
  <el-row>
    <el-form :inline="true" ref="form" v-if="userData.roleName === 'ROLE_ADMIN'">
      <el-form-item label="模型名称：">
        <el-input v-model="modelName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-col :span="24" class="mb10">
      <el-button @click="addModel" type="primary">添加模型</el-button>
    </el-col>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="模型名称">
        <template slot-scope="scope">{{ scope.row.modelName }}</template>
      </el-table-column>
      <el-table-column label="最高温度">
        <template slot-scope="scope">{{ scope.row.temperatureUp }}</template>
      </el-table-column>
      <el-table-column label="最低温度">
        <template slot-scope="scope">{{ scope.row.temperatureDown }}</template>
      </el-table-column>
      <el-table-column label="最高湿度">
        <template slot-scope="scope">{{ scope.row.humidityUp }}</template>
      </el-table-column>
      <el-table-column label="最低湿度">
        <template slot-scope="scope">{{ scope.row.humidityDown }}</template>
      </el-table-column>
      <el-table-column label="最高光照强度">
        <template slot-scope="scope">{{ scope.row.illuminationUp }}</template>
      </el-table-column>
      <el-table-column label="最低光照强度">
        <template slot-scope="scope">{{ scope.row.illuminationDown }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">
            <router-link :to="{path:'/home/commonview/model-detail',query:{modelId:scope.row.modelId}}">查看</router-link>
          </el-button>
          <el-button type="text" @click="modifyModel(scope.row)">修改</el-button>
          <el-button type="text" @click="deleteModel(scope.row.modelId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.page" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount">
      </el-pagination>
    </div>
    <el-dialog :title="ModelManageTitle" size="small" :visible.sync="modifyDialog.visible" :close-on-click-modal="false">
      <el-form ref="modifyForm" :model="modifyDialog.data" label-width="130px" :rules="modifyDialog.rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="模型名：" prop="modelName">
              <el-input v-model="modifyDialog.data.modelName"></el-input>
            </el-form-item>
            <el-form-item label="温度上限：" prop="temperatureUp">
              <el-input v-model="modifyDialog.data.temperatureUp"></el-input>
            </el-form-item>
            <el-form-item label="温度下限：" prop="temperatureDown">
              <el-input v-model="modifyDialog.data.temperatureDown"></el-input>
            </el-form-item>
            <el-form-item label="湿度上限：" prop="humidityUp">
              <el-input v-model="modifyDialog.data.humidityUp"></el-input>
            </el-form-item>
            <el-form-item label="湿度下限：" prop="humidityDown">
              <el-input v-model="modifyDialog.data.humidityDown"></el-input>
            </el-form-item>
            <el-form-item label="光照强度上限：" prop="illuminationUp">
              <el-input v-model="modifyDialog.data.illuminationUp"></el-input>
            </el-form-item>
            <el-form-item label="光照强度下限：" prop="illuminationDown">
              <el-input v-model="modifyDialog.data.illuminationDown"></el-input>
            </el-form-item>
            <el-form-item label="二氧化碳浓度上限：" prop="co2Up">
              <el-input v-model="modifyDialog.data.co2Up"></el-input>
            </el-form-item>
            <el-form-item label="二氧化碳浓度下限：" prop="co2Down">
              <el-input v-model="modifyDialog.data.co2Down"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="EC值上限：" prop="ecUp">
              <el-input v-model="modifyDialog.data.ecUp"></el-input>
            </el-form-item>
            <el-form-item label="EC值下限：" prop="ecDown">
              <el-input v-model="modifyDialog.data.ecDown"></el-input>
            </el-form-item>
            <el-form-item label="氧气浓度上限：" prop="oxygenUp">
              <el-input v-model="modifyDialog.data.oxygenUp"></el-input>
            </el-form-item>
            <el-form-item label="氧气浓度下限：" prop="oxygenDown">
              <el-input v-model="modifyDialog.data.oxygenDown"></el-input>
            </el-form-item>
            <el-form-item label="ph值上限：" prop="phUp">
              <el-input v-model="modifyDialog.data.phUp"></el-input>
            </el-form-item>
            <el-form-item label="ph值下限：" prop="phDown">
              <el-input v-model="modifyDialog.data.phDown"></el-input>
            </el-form-item>
            <el-form-item label="高液位上限：" prop="highLevelUp">
              <el-input v-model="modifyDialog.data.highLevelUp"></el-input>
            </el-form-item>
            <el-form-item label="高液位下限：" prop="hightLevelDown">
              <el-input v-model="modifyDialog.data.hightLevelDown"></el-input>
            </el-form-item>
            <el-form-item label="低液位上限：" prop="lowLevelUp">
              <el-input v-model="modifyDialog.data.lowLevelUp"></el-input>
            </el-form-item>
            <el-form-item label="低液位下限：" prop="lowLevelDown">
              <el-input v-model="modifyDialog.data.lowLevelDown"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifySubmit('modifyForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      userData: {},
      ModelManageTitle: '',
      modelName: '',
      modifyDialog: {
        visible: false,
        data: {},
        rules: {
          modelName: [{
            required: true,
            message: '请输入模型名',
            trigger: 'blur'
          }],
          temperatureUp: [{
            required: true,
            message: '请输入温度上限',
            trigger: 'blur'
          }],
          temperatureDown: [{
            required: true,
            message: '请输入温度下限',
            trigger: 'blur'
          }],
          humidityUp: [{
            required: true,
            message: '请输入湿度上限',
            trigger: 'blur'
          }],
          humidityDown: [{
            required: true,
            message: '请输入湿度下限',
            trigger: 'blur'
          }],
          illuminationUp: [{
            required: true,
            message: '请输入光照强度上限',
            trigger: 'blur'
          }],
          illuminationDown: [{
            required: true,
            message: '请输入光照强度下限',
            trigger: 'blur'
          }],
          co2Up: [{
            required: true,
            message: '请输入二氧化碳浓度上限',
            trigger: 'blur'
          }],
          co2Down: [{
            required: true,
            message: '请输入二氧化碳浓度下限',
            trigger: 'blur'
          }],
          ecUp: [{
            required: true,
            message: '请输入EC值上限',
            trigger: 'blur'
          }],
          ecDown: [{
            required: true,
            message: '请输入EC值下限',
            trigger: 'blur'
          }],
          oxygenUp: [{
            required: true,
            message: '请输入氧气浓度上限',
            trigger: 'blur'
          }],
          oxygenDown: [{
            required: true,
            message: '请输入氧气浓度下限',
            trigger: 'blur'
          }],
          phUp: [{
            required: true,
            message: '请输入ph值上限',
            trigger: 'blur'
          }],
          phDown: [{
            required: true,
            message: '请输入ph值下限',
            trigger: 'blur'
          }],
          highLevelUp: [{
            required: true,
            message: '请输入高液位上限',
            trigger: 'blur'
          }],
          hightLevelDown: [{
            required: true,
            message: '请输入高液位下限',
            trigger: 'blur'
          }],
          lowLevelUp: [{
            required: true,
            message: '请输入低液位上限',
            trigger: 'blur'
          }],
          lowLevelDown: [{
            required: true,
            message: '请输入低液位下限',
            trigger: 'blur'
          }]
        }
      },
      table: {
        data: [],
        send: {
          userId: '',
          modelName: '',
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
    this.userData = this.$store.state.userInfo
    this.table.send.userId = this.userData.userId
    this.getList()
  },
  methods: {
    init() {
      this.modifyDialog.data = {
        modelName: '',
        temperatureUp: '',
        temperatureDown: '',
        humidityUp: '',
        humidityDown: '',
        illuminationUp: '',
        illuminationDown: '',
        co2Up: '',
        co2Down: '',
        ecUp: '',
        ecDown: '',
        oxygenUp: '',
        oxygenDown: '',
        phUp: '',
        phDown: '',
        highLevelUp: '',
        hightLevelDown: '',
        lowLevelUp: '',
        lowLevelDown: ''
      }
    },
    getList() {
      this.$ajax.post('model/list', this.table.send)
        .then(res => {
          console.log('', res);
          this.table.data = res.data.list;
          this.table.totalCount = res.data.total;
          this.table.totalPages = res.data.pages;
        })
    },
    addModel() {
      this.ModelManageTitle = '添加模型'
      this.resetForm('modifyForm')
      this.init()
      this.modifyDialog.visible = true;
    },
    modifyModel(data) {
      this.ModelManageTitle = '修改模型'
      this.resetForm('modifyForm')
      this.init()
      this.modifyDialog.visible = true;
      this.modifyDialog.data = {
        modelId: data.modelId,
        modelName: data.modelName,
        temperatureUp: data.temperatureUp.toString(),
        temperatureDown: data.temperatureDown.toString(),
        humidityUp: data.humidityUp.toString(),
        humidityDown: data.humidityDown.toString(),
        illuminationUp: data.illuminationUp.toString(),
        illuminationDown: data.illuminationDown.toString(),
        co2Up: data.co2Up.toString(),
        co2Down: data.co2Down.toString(),
        ecUp: data.ecUp.toString(),
        ecDown: data.ecDown.toString(),
        oxygenUp: data.oxygenUp.toString(),
        oxygenDown: data.oxygenDown.toString(),
        phUp: data.phUp.toString(),
        phDown: data.phDown.toString(),
        highLevelUp: data.highLevelUp.toString(),
        hightLevelDown: data.hightLevelDown.toString(),
        lowLevelUp: data.lowLevelUp.toString(),
        lowLevelDown: data.lowLevelDown.toString()
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
      this.modifyDialog.data.userId = this.userData.userId
      const send = JSON.parse(JSON.stringify(this.modifyDialog.data));
      this.$ajax.post('model/saveOrUpdate', send)
        .then(res => {
          console.log('', res);
          var type = res.success ? 'success' : 'error';
          if (type === 'success') {
            this.resetForm('modifyForm');
            this.modifyDialog.visible = false;
            this.getList();
          }
          this.$message({
            message: res.message,
            type: type
          });
        })
    },
    deleteModel(id) {
      this.$confirm('确定删除模型吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.get('model/delete', id)
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
    handleSizeChange(val) {
      this.table.send.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.table.send.page = val;
      this.getList();
    },
    searchList() {
      this.table.send.page = 1
      this.table.send.modelName = this.modelName
      this.getList();
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields();
    }
  }
}

</script>
<style scoped>


</style>
