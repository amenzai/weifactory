<template>
  <el-row>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="设备序列号">
        <template slot-scope="scope">{{ scope.row.sn }}</template>
      </el-table-column>
      <el-table-column label="第一层蔬菜名称">
        <template slot-scope="scope">{{ scope.row.plantOne }}</template>
      </el-table-column>
      <el-table-column label="第一层栽培模式">
        <template slot-scope="scope">{{ scope.row.cultModelOne | getLabel('cultModel')}}</template>
      </el-table-column>
      <el-table-column label="第二层蔬菜名称">
        <template slot-scope="scope">{{ scope.row.plantTwo }}</template>
      </el-table-column>
      <el-table-column label="第二层栽培模式">
        <template slot-scope="scope">{{ scope.row.cultModelTwo | getLabel('cultModel')}}</template>
      </el-table-column>
      <el-table-column label="第三层蔬菜名称">
        <template slot-scope="scope">{{ scope.row.plantThree }}</template>
      </el-table-column>
      <el-table-column label="第三层栽培模式">
        <template slot-scope="scope">{{ scope.row.cultModelThree | getLabel('cultModel')}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small">
              <router-link :to="{path:'/home/commonview/batch-detail',query:{id:scope.row.batchId}}">查看</router-link>
            </el-button>
            <el-button @click="deleteBatch(scope.row.batchId)" type="text">删除</el-button>
          </div>
          <div>
            <el-button @click="removeBatch(scope.row.batchId)" type="text">废弃</el-button>
            <el-button @click="concatModel(scope.row.batchId)" type="text">关联模型</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.pageNo" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount">
      </el-pagination>
    </div>
    <el-dialog title="关联模型" :visible.sync="modelVisible" :close-on-click-modal="false">
      <el-form ref="modelForm" label-width="100px">
        <el-form-item label="选择模型：">
          <el-select clearable v-model="modelId" placeholder="请选择">
            <el-option :label="item.modelName" :value="item.modelId" v-for="(item,index) in modelList" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modelSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  data() {
      return {
        userId: '',
        modelId: '',
        modelVisible: false,
        modelList: [],
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
    created() {
      this.userId = JSON.parse(window.sessionStorage.getItem('user')).userId
      this.getList()
      this.getModel()
    },
    methods: {
      getList() {
        if (this.userId === 2) {
          const send = this.table.send.pageNo + '/' + this.table.send.pageSize
          this.$ajax.get('batch/history', send)
            .then(res => {
              console.log('', res);
              this.table.data = res.data.list;
              this.table.totalCount = res.data.total;
              this.table.totalPages = res.data.pages;
            })
        } else {
          const send1 = this.userId + '/' + this.table.send.pageNo + '/' + this.table.send.pageSize
          this.$ajax.get('batch', send1)
            .then(res => {
              console.log('', res);
              this.table.data = res.data.list;
              this.table.totalCount = res.data.total;
              this.table.totalPages = res.data.pages;
            })
        }
      },
      getModel() {
        const send = {
          userId: this.userId,
          page: 1,
          pageSize: 100
        }
        this.$ajax.post('model/list', send)
          .then(res => {
            console.log('', res);
            this.modelList = res.data.list;
          })
      },
      deleteBatch(id) {
        this.$confirm('确定删除批次吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.get('batch/delete', id)
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
      removeBatch(id) {
        this.$confirm('确定废弃批次吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$ajax.get('batch/remove', id)
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
      concatModel(id) {
        this.batchId = id
        this.modelId = ''
        this.modelVisible = true;
      },
      modelSubmit() {
        const send = this.batchId + '/' + this.modelId
        this.$ajax.get('batch/association', send)
          .then(res => {
            var type = res.success ? 'success' : 'error';
            if (type === 'success') {
              this.getList();
              this.modelVisible = false;
            }
            this.$message({
              message: res.message,
              type: type
            });
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
.el-form-item {
  margin-bottom:0
}
</style>
