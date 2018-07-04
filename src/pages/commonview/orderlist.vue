<template>
  <el-row>
    <el-form ref="form" :inline="true" :model="table.send" @keyup.enter.native="getList">
      <el-form-item label="设备序列号：">
        <el-input v-model="table.send.sn"></el-input>
      </el-form-item>
      <el-form-item label="订单状态：">
        <el-select clearable placeholder="请选择" v-model="table.send.orderState">
          <el-option :label="item.itemName" :value="item.itemCode" v-for="(item,index) in orderStatus" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单号：">
        <el-input v-model="table.send.orderNumber"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="订单号">
        <template slot-scope="scope">{{ scope.row.orderNumber }}</template>
      </el-table-column>
      <el-table-column label="金额">
        <template slot-scope="scope">{{ scope.row.orderPrice | currency}}</template>
      </el-table-column>
      <el-table-column label="订单名称">
        <template slot-scope="scope">{{ scope.row.orderBody }}</template>
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">{{ scope.row.orderState.toString() | seeLabel(orderStatus)}}</template>
      </el-table-column>
      <el-table-column label="设备序列号">
        <template slot-scope="scope">{{ scope.row.sn }}</template>
      </el-table-column>
      <el-table-column label="支付渠道">
        <template slot-scope="scope">
          <span v-if="scope.row.payChannel">{{ scope.row.payChannel | seeLabel(payChannel)}}</span>
          <span v-else>订单暂未支付</span>
        </template>
      </el-table-column>
      <el-table-column label="订单生成日期">
        <template slot-scope="scope">{{ scope.row.orderStart | dateFilter}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text">
            <router-link :to="{path:'/home/commonview/order-detail',query:{orderId:scope.row.orderId}}">查看</router-link>
          </el-button>
          <p v-show="scope.row.orderState == 1">
            <!-- <el-button @click="goPay(scope.row)" type="text">继续支付</el-button> -->
            <el-button @click="cancelOrder(scope.row.orderId)" type="text">取消订单</el-button>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.page" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount">
      </el-pagination>
    </div>
  </el-row>
</template>
<script>
import { payChannelMixin, orderStatusMixin } from 'common/js/mixin.js'
export default {
  mixins: [payChannelMixin, orderStatusMixin],
  data() {
    return {
      userId: '',
      table: {
        data: [],
        send: {
          sn: '',
          orderNumber: '',
          orderState: '',
          userId: '',
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
    this.table.send.userId = this.$store.state.userId
    this.getList()
  },
  methods: {
    getList() {
      this.$http.post('order/list/search', this.table.send).then(res => {
        this.table.data = res.data.list
        this.table.totalCount = res.data.total
        this.table.totalPages = res.data.pages
      })
    },
    searchList() {
      this.table.send.page = 1
      this.getList()
    },
    cancelOrder(id) {
      this.$confirm('确定取消订单?', '提示', {
        confirmButtonClass: 'box-confim',
        cancelButtonClass: 'box-cancel',
        type: 'warning'
      })
        .then(() => {
          this.$http.get('order/cancel', id).then(res => {
            this.$message.success(res.message)
            this.getList()
          })
        })
        .catch(() => {})
    },
    goPay(item) {
      this.$store.commit('UPDATE_ORDER', item)
      this.$router.push('/home/commonview/order-payment')
    },
    handleSizeChange(val) {
      this.table.send.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.table.send.page = val
      this.getList()
    }
  }
}
</script>
<style scoped>
</style>
