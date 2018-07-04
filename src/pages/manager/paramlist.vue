<template>
  <el-row>
    <el-form :inline="true" ref="form" :model="table.send" @keyup.enter.native="getList" id="search-input">
      <el-form-item label="参数名称：">
        <el-input v-model="table.send.paramName"></el-input>
      </el-form-item>
      <el-form-item label="参数状态码：">
        <el-input v-model="table.send.paramCode"></el-input>
      </el-form-item>
      <el-form-item label="参数值：">
        <el-input v-model="table.send.paramValue"></el-input>
      </el-form-item>
      <el-form-item label="参数状态：">
        <el-select v-model="table.send.status" clearable>
          <el-option :label="item.itemName" :value="item.itemCode" v-for="(item, index) in paramStatus" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-col :span="24" class="mb10">
      <el-button @click="addParam" type="primary">添加参数</el-button>
    </el-col>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="参数状态码">
        <template slot-scope="scope">{{ scope.row.paramCode }}</template>
      </el-table-column>
      <el-table-column label="参数名称">
        <template slot-scope="scope">{{ scope.row.paramName }}</template>
      </el-table-column>
      <el-table-column label="参数值">
        <template slot-scope="scope">{{ scope.row.paramValue }}</template>
      </el-table-column>
      <el-table-column label="参数状态">
        <template slot-scope="scope">{{ scope.row.status | seeLabel(paramStatus) }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="modifyParam(scope.row)" type="text">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.pageNo" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount">
      </el-pagination>
    </div>
    <el-dialog :title="paramManageTitle" :visible.sync="modifyDialog.visible" :close-on-click-modal="false">
      <el-form ref="modifyForm" :model="modifyDialog.data" label-width="100px" :rules="modifyDialog.rules">
        <el-form-item label="参数状态码：" prop="paramCode">
          <el-input v-model="modifyDialog.data.paramCode" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="参数名称：" prop="paramName">
          <el-input v-model="modifyDialog.data.paramName"></el-input>
        </el-form-item>
        <el-form-item label="参数值：" prop="paramValue">
          <el-input v-model="modifyDialog.data.paramValue"></el-input>
        </el-form-item>
        <el-form-item label="参数状态：" prop="status">
          <el-select clearable placeholder="请选择" v-model="modifyDialog.data.status">
            <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in paramStatus" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="序号：" prop="sort">
          <el-input v-model="modifyDialog.data.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifySubmit('modifyForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>
<script>
import { statusMixin } from 'common/js/mixin.js'
export default {
  mixins: [statusMixin],
  data() {
    return {
      paramManageTitle: '',
      isDisabled: false,
      modifyDialog: {
        visible: false,
        data: {},
        rules: {
          paramName: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ],
          paramCode: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ],
          paramValue: [
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ],
          status: [
            {
              required: true,
              message: '不能为空'
            }
          ]
        }
      },
      table: {
        data: [],
        send: {
          paramName: '',
          paramCode: '',
          paramValue: '',
          status: '',
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
        paramId: '',
        paramCode: '',
        paramName: '',
        paramValue: '',
        status: '',
        sort: '0'
      }
    },
    getList() {
      this.$http.post('param/list', this.table.send).then(res => {
        console.log('', res)
        this.table.data = res.data.list
        this.table.pageNo = res.data.firstPage
        this.table.totalCount = res.data.total
        this.table.totalPages = res.data.pages
      })
    },
    addParam() {
      this.paramManageTitle = '添加参数'
      this.isDisabled = false
      this.resetForm('modifyForm')
      this.init()
      this.modifyDialog.visible = true
    },
    modifyParam(data) {
      this.paramManageTitle = '修改参数'
      this.isDisabled = true
      this.resetForm('modifyForm')
      this.modifyDialog.visible = true
      this.modifyDialog.data = {
        paramId: data.paramId,
        paramName: data.paramName,
        paramCode: data.paramCode,
        paramValue: data.paramValue,
        status: data.status,
        sort: data.sort
      }
    },
    modifySubmit(formName) {
      let valid = false
      this.$refs[formName].validate(v => {
        valid = v
      })
      if (!valid) {
        return false
      }
      const send = JSON.parse(JSON.stringify(this.modifyDialog.data))
      this.$http.post('param/saveOrUpdate', send).then(res => {
        this.getList()
        this.modifyDialog.visible = false
        this.$message.success(res.message)
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
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
</style>
