<template>
  <el-row>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="第一层蔬菜名称">
        <template slot-scope="scope">{{ scope.row.plantOne | seeLabel(vegetableName) }}</template>
      </el-table-column>
      <el-table-column label="第一层栽培模式">
        <template slot-scope="scope">{{ scope.row.cultModelOne | seeLabel(cultModel)}}</template>
      </el-table-column>
      <el-table-column label="第二层蔬菜名称">
        <template slot-scope="scope">{{ scope.row.plantTwo | seeLabel(vegetableName) }}</template>
      </el-table-column>
      <el-table-column label="第二层栽培模式">
        <template slot-scope="scope">{{ scope.row.cultModelTwo | seeLabel(cultModel)}}</template>
      </el-table-column>
      <el-table-column label="第三层蔬菜名称">
        <template slot-scope="scope">{{ scope.row.plantThree | seeLabel(vegetableName) }}</template>
      </el-table-column>
      <el-table-column label="第三层栽培模式">
        <template slot-scope="scope">{{ scope.row.cultModelThree | seeLabel(cultModel)}}</template>
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
import { vegetableNameMixin, controlModelMixin } from 'common/js/mixin.js'
export default {
  mixins: [vegetableNameMixin, controlModelMixin],
  data() {
    return {
      userId: '',
      deviceId: '',
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
    this.deviceId = this.$route.query.id
    this.userId = this.$store.state.userId
    this.getList()
    this.getModel()
  },
  methods: {
    getList() {
      const send =
        this.deviceId +
        '/' +
        this.table.send.pageNo +
        '/' +
        this.table.send.pageSize
      this.$http.get('batch', send).then(res => {
        console.log('', res)
        this.table.data = res.data.list
        this.table.totalCount = res.data.total
        this.table.totalPages = res.data.pages
      })
    },
    getModel() {
      const send = {
        userId: this.userId,
        page: 1,
        pageSize: 100
      }
      this.$http.post('model/list', send).then(res => {
        console.log('', res)
        this.modelList = res.data.list
      })
    },
    deleteBatch(id) {
      this.$confirm('确定删除批次吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.get('batch/delete', id).then(res => {
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
    removeBatch(id) {
      this.$confirm('确定废弃批次吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'box-confim',
        cancelButtonClass: 'box-cancel',
        type: 'warning'
      })
        .then(() => {
          this.$http.get('batch/remove', id).then(res => {
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
    concatModel(id) {
      this.batchId = id
      this.modelId = ''
      this.modelVisible = true
    },
    modelSubmit() {
      const send = this.batchId + '/' + this.modelId
      this.$http.get('batch/association', send).then(res => {
        var type = res.success ? 'success' : 'error'
        if (type === 'success') {
          this.getList()
          this.modelVisible = false
        }
        this.$message({
          message: res.message,
          type: type
        })
      })
    },
    handleSizeChange(val) {
      this.table.send.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.table.send.pageNo = val
      this.getList()
    }
  }
}
</script>
<style scoped>
.el-form-item {
  margin-bottom: 0;
}
</style>
