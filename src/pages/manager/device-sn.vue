<template>
  <el-row>
    <p class="mb10">
      <el-button type="primary" @click="addSn">添加设备序列号</el-button>
      <el-button @click="addManySn">批量添加设备序列号</el-button>
    </p>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="设备序列号" width="160">
        <template slot-scope="scope">{{ scope.row.sn }}
        </template>
      </el-table-column>
      <el-table-column label="是否启用">
        <template slot-scope="scope">{{ scope.row.status ? '是' : '否' }}</template>
      </el-table-column>
      <el-table-column label="添加日期">
        <template slot-scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.pageNo" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount"> </el-pagination>
    </div>
    <el-dialog title="添加设备序列号" :visible.sync="addSnDialog.visible" :close-on-click-modal="false">
      <el-form ref="addSnForm" :model="addSnDialog.data" label-width="100px" :rules="addSnDialog.rules">
        <el-form-item label="设备序列号：" prop="sn">
          <el-input v-model="addSnDialog.data.sn"></el-input>
        </el-form-item>
      </el-form> <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSnSubmit('addSnForm')">确 定</el-button>
      </span> </el-dialog>
    <el-dialog title="批量添加设备序列号" :visible.sync="addManySnDialog.visible" :close-on-click-modal="false">
      <el-form ref="addManySnForm" :model="addManySnDialog.data" label-width="100px">
        <el-form-item label="数量：">
          <el-input-number v-model="addManySnDialog.data.num" controls-position="right" :min="1" :max="10000"></el-input-number>
        </el-form-item>
      </el-form> <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addManySnSubmit('addManySnForm')">确 定</el-button>
      </span> </el-dialog>
  </el-row>
</template>
<script>
  export default {
    data() {
      return {
        table: {
          data: [],
          send: {
            pageNo: 1,
            pageSize: this.$CONSTANT.PAGE_SIZE
          },
          totalCount: 0,
          totalPages: 0,
          pageSelect: this.$CONSTANT.PAGE_SELECT
        },
        addSnDialog: {
          visible: false,
          data: {},
          rules: {
            sn: [{
              required: true,
              message: "请输入设备序列号",
              trigger: "blur"
            }]
          }
        },
        addManySnDialog: {
          visible: false,
          data: {}
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        const send = this.table.send.pageNo + '/' + this.table.send.pageSize
        this.$ajax.get('device/sn/list', send).then(res => {
          console.log('', res);
          this.table.data = res.data.list;
          this.table.totalCount = res.data.total;
          this.table.totalPages = res.data.pages;
        })
      },
      addSn() {
        this.addSnDialog.data = {
          sn: ''
        }
        this.$refs['addSnForm'] && this.$resetForm('addSnForm')
        this.addSnDialog.visible = true
      },
      addSnSubmit(formName) {
        if (!this.$validateForm(formName)) {
          return
        }
        this.$ajax.post('device/sn/add', this.addSnDialog.data).then(res => {
          this.$message.success(res.message)
          this.addSnDialog.visible = false
          this.getList()
        })
      },
      addManySn() {
        this.addManySnDialog.data = {
          num: ''
        }
        this.$refs['addManySnForm'] && this.$resetForm('addManySnForm')
        this.addManySnDialog.visible = true
      },
      addManySnSubmit() {
        const date = this.$dateFilter(new Date())
        const send = {
          num: this.addManySnDialog.data.num,
          date
        }
        this.$ajax.post('device/sn/addBatch', send).then(res => {
          this.$message.success(res.message)
          this.addManySnDialog.visible = false
          this.getList()
        })
      },
      handleSizeChange(val) {
        this.table.send.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.table.send.pageNo = val;
        this.getList();
      }
    }
  }

</script>
<style scoped>


</style>
