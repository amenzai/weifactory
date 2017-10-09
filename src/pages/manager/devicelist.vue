<template>
  <el-row>
    <!-- <el-col :span="24" class="mb10">
      <el-button @click="addDevice">设备添加</el-button>
    </el-col> -->
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="设备序列号">
        <template scope="scope">{{ scope.row.sn }}</template>
      </el-table-column>
      <el-table-column label="经度">
        <template scope="scope">{{ scope.row.longitude }}</template>
      </el-table-column>
      <el-table-column label="纬度">
        <template scope="scope">{{ scope.row.latitude }}</template>
      </el-table-column>
      <el-table-column label="添加日期">
        <template scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <!-- <el-button type="text">
            <router-link :to="{path:'/home/manager/user-detail'}">查看</router-link>
          </el-button> -->
          <el-button @click="modifyDevice(scope.row)" type="info" size="small">修改</el-button>
          <el-button @click="deleteDevice(scope.row.deviceId)" type="info" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.pageNo" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount">
      </el-pagination>
    </div>
    <el-dialog :title="deviceManageTitle" size="tiny" :visible.sync="modifyDialog.visible" :modal-append-to-body="false">
      <el-form ref="modifyForm" :model="modifyDialog.data" label-width="100px" :rules="modifyDialog.rules">
        <el-form-item label="设备序列号：" prop="sn">
          <el-input v-model="modifyDialog.data.sn"></el-input>
        </el-form-item>
        <el-form-item label="经度：" prop="longitude">
          <el-input v-model="modifyDialog.data.longitude"></el-input>
        </el-form-item>
        <el-form-item label="纬度：" prop="latitude">
          <el-input v-model="modifyDialog.data.latitude"></el-input>
        </el-form-item>
        <el-form-item label="备注：" prop="note">
          <el-input v-model="modifyDialog.data.note"></el-input>
        </el-form-item>
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
      deviceManageTitle: '',
      modifyDialog: {
        visible: false,
        data: {},
        rules: {
          sn: [{
            required: true,
            message: '请输入设备序列号',
            trigger: 'blur'
          }],
          longitude: [{
            required: true,
            message: '请输入经度',
            trigger: 'blur'
          }],
          latitude: [{
            required: true,
            message: '请输入纬度',
            trigger: 'blur'
          }]
        }
      },
      table: {
        data: [],
        send: {
          pageNo: 1,
          pageSize: this.$CONSTANT.PAGE_SIZE
        },
        totalCount: 0,
        totalPages: 0,
        pageSelect: this.$CONSTANT.PAGE_SELECT
      }
    }
  },
  mounted() {
    this.init()
    this.getList()
  },
  methods: {
    init() {
      this.modifyDialog.data = {
        id: '',
        sn: '',
        latitude: '',
        longitude: '',
        note: ''
      }
    },
    getList() {
      const send = this.table.send.pageNo + '/' + this.table.send.pageSize
      this.$ajax.get('device/list',send)
        .then(res => {
          console.log('', res);
          this.table.data = res.data.list;
          this.table.pageNo = res.data.firstPage;
          this.table.totalCount = res.data.total;
          this.table.totalPages = res.data.pages;
        })
    },
    modifyDevice(data) {
      this.deviceManageTitle = '修改设备信息'
      this.resetForm('modifyForm')
      this.init()
      this.modifyDialog.visible = true;
      this.modifyDialog.data = {
        id: data.deviceId,
        sn: data.sn,
        latitude: data.latitude.toString(),
        longitude: data.longitude.toString(),
        note: data.note
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
      const send = JSON.parse(JSON.stringify(this.modifyDialog.data));
      this.$ajax.post('device/update', send)
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
    deleteDevice(id) {
      this.$confirm('确定删除设备吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        tpyp: 'warning'
      }).then(() => {
        this.$ajax.get('device/delete', id)
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
      this.table.send.pageNo = val;
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
