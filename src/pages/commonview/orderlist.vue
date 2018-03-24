<template>
  <el-row>
    <el-table :data="table.data" border style="width: 100%">
      <el-table-column label="订单号">
        <template slot-scope="scope">{{ scope.row.orderNumber }}</template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">{{ scope.row.orderPrice | currency}}</template>
      </el-table-column>
      <el-table-column label="订单名称">
        <template slot-scope="scope">{{ scope.row.orderBody }}</template>
      </el-table-column>
      <el-table-column label="设备序列号">
        <template slot-scope="scope">{{ scope.row.sn }}</template>
      </el-table-column>
      <el-table-column label="支付渠道">
        <template slot-scope="scope">{{ scope.row.payChannel | seeLabel(payChannel)}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{path:'/home/commonview/order-detail',query:{orderId:scope.row.orderId}}">查看</router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="fl-r mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.send.pageNo" :page-sizes="table.pageSelect" :page-size="table.send.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="table.totalCount">
      </el-pagination>
    </div>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      userId: '',
      payChannel: [],
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
    this.getPayChannel()
  },
  methods: {
    getList() {
      const send = this.userId + '/' + this.table.send.pageNo + '/' + this.table.send.pageSize
      this.$ajax.get('order/list',send)
        .then(res => {
          console.log('', res);
          this.table.data = res.data.list;
          this.table.pageNo = res.data.firstPage;
          this.table.totalCount = res.data.total;
          this.table.totalPages = res.data.pages;
        })
    },
    getPayChannel() {
      this.$ajax.get('dict/dictItemList','payChannel')
        .then(res => {
          this.payChannel = res.data.map(item => {
            return {
              label: item.itemName,
              value: item.itemCode
            }
          })
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
