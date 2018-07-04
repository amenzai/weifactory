<template>
  <el-row>
    <el-form :inline="true" ref="form" :model="table.send" @keyup.enter.native="searchList" id="search-input">
      <el-form-item label="bean名称：">
        <el-input v-model="table.send.beanName"></el-input>
      </el-form-item>
      <el-form-item label="方法名称：">
        <el-input v-model="table.send.methodName"></el-input>
      </el-form-item>
      <el-form-item label="任务名称：">
        <el-input v-model="table.send.scheduleName"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select clearable v-model="table.send.status" placeholder="请选择">
          <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in scheduleStatus" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-form-item>
    </el-form>
    <p class="mb10">
      <el-button type="primary" @click="addTask(1)">添加定时任务</el-button>
    </p>
    <el-table :data="table.data" border>
      <el-table-column label="bean名称">
        <template slot-scope="scope">{{ scope.row.beanName }}</template>
      </el-table-column>
      <el-table-column label="方法名称">
        <template slot-scope="scope">{{ scope.row.methodName }}</template>
      </el-table-column>
      <el-table-column label="任务名称">
        <template slot-scope="scope">{{ scope.row.scheduleName }}</template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{ scope.row.status | seeLabel(scheduleStatus) }}</template>
      </el-table-column>
      <el-table-column label="cron表达式">
        <template slot-scope="scope">{{ scope.row.cronExpression }}</template>
      </el-table-column>
      <el-table-column label="参数">
        <template slot-scope="scope">{{ scope.row.params }}</template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.gmtCreate | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template slot-scope="scope">{{ scope.row.gmtModified | dateFilter }}</template>
      </el-table-column>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
          <el-button type="text" @click="modifyTask(scope.row)">修改</el-button>
          <el-button type="text" @click="handleStatus(scope.row.jobId, 2)">删除</el-button>
          <el-button type="text" @click="handleStatus(scope.row.jobId, 3)" v-show="scope.row.status === '1'">暂停</el-button>
          <el-button type="text" @click="handleStatus(scope.row.jobId, 4)" v-show="scope.row.status === '0'">恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.page" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount">
      </el-pagination>
    </div>
    <el-dialog :title="taskTitle" :visible.sync="modifyDialog.visible" :close-on-click-modal="false">
      <el-form ref="modifyForm" :model="modifyDialog.data" label-width="100px" :rules="modifyDialog.rules">
        <el-form-item label="bean名称：" prop="beanName">
          <el-input v-model="modifyDialog.data.beanName"></el-input>
        </el-form-item>
        <el-form-item label="任务名称：" prop="scheduleName">
          <el-input v-model="modifyDialog.data.scheduleName"></el-input>
        </el-form-item>
        <el-form-item label="方法名称：" prop="methodName">
          <el-input v-model="modifyDialog.data.methodName"></el-input>
        </el-form-item>
        <el-form-item label="cron表达式：" prop="cronExpression">
          <el-input v-model="modifyDialog.data.cronExpression"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select clearable v-model="modifyDialog.data.status" placeholder="请选择">
            <el-option :label="item.label" :value="item.value" v-for="(item,index) in scheduleStatus" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="modifyDialog.data.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifySubmit('modifyForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import { scheduleStatusMixin } from 'common/js/mixin.js'
export default {
  mixins: [scheduleStatusMixin],
  data() {
    return {
      userId: '',
      taskTitle: '',
      modifyDialog: {
        visible: false,
        data: {},
        rules: {
          beanName: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ],
          scheduleName: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ],
          methodName: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ],
          cronExpression: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ]
        }
      },
      table: {
        data: [],
        send: {
          status: '',
          beanName: '',
          methodName: '',
          scheduleName: '',
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
        jobId: '',
        status: '1',
        beanName: '',
        methodName: '',
        scheduleName: '',
        cronExpression: '',
        remark: ''
      }
    },
    handleStatus(id, val) {
      this.$confirm('确定执行该操作?', '提示', {
        type: 'warning',
        confirmButtonClass: 'box-confim',
        cancelButtonClass: 'box-cancel'
      })
        .then(() => {
          this.$http
            .post('schedule/option', {
              'jobIds[]': id,
              scheduleOption: val
            })
            .then(res => {
              this.$message.success(res.message)
              this.getList()
            })
        })
        .catch(() => {})
    },
    addTask() {
      this.$resetForm('modifyForm')
      this.modifyDialog.visible = true
      this.init()
    },
    modifyTask(item) {
      this.$resetForm('modifyForm')
      this.modifyDialog.visible = true
      this.modifyDialog.data = {
        jobId: item.jobId,
        status: item.status,
        beanName: item.beanName,
        methodName: item.methodName,
        scheduleName: item.scheduleName,
        cronExpression: item.cronExpression,
        remark: item.remark
      }
    },
    modifySubmit(formName) {
      if (!this.$validateForm(formName)) {
        return
      }
      this.$http
        .post('schedule/addOrUpdate', this.modifyDialog.data)
        .then(res => {
          this.modifyDialog.visible = false
          this.getList()
          this.$message.success(res.message)
        })
    },
    getList() {
      this.$http.post('schedule/list', this.table.send).then(res => {
        console.log('', res)
        this.table.data = res.data.list
        this.table.totalCount = res.data.total
        this.table.totalPages = res.data.pages
      })
    },
    handleSizeChange(val) {
      this.table.send.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.table.send.page = val
      this.getList()
    },
    searchList() {
      this.table.send.page = 1
      this.getList()
    }
  }
}
</script>
<style scoped>
</style>
