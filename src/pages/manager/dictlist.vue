<template>
  <el-row>
    <div class="mb10">
      <el-button @click="addDict" type="primary">添加字典</el-button>
    </div>
    <el-collapse accordion @change="handleClick">
      <el-collapse-item :title="item.name" :name="item.code" v-for="(item,index) in table.data" :key="index">
        <li v-for="(item,index) in dictItemList" :key="index" class="dictItem">
          <span>名称：{{item.itemName}}</span>
          <span>状态码：{{item.itemCode}}</span>
        </li>
      </el-collapse-item>
    </el-collapse>
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
      dictItemList: [],
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
    this.getList()
  },
  methods: {
    handleClick(val) {
      if (val) {
        this.$ajax.get('dict/dictItemList', `${val}/1/10`)
          .then(res => {
            console.log('', res);
            this.dictItemList = res.data.list;
          })
      } else {
        return;
      }
    },
    getList() {
      const send = this.table.send.pageNo + '/' + this.table.send.pageSize
      this.$ajax.get('dict/list', send)
        .then(res => {
          console.log('', res);
          this.table.data = res.data.list;
          this.table.totalCount = res.data.total;
          this.table.totalPages = res.data.pages;
        })
    },
    addDict() {

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
.dictItem {
  line-height: 30px;
}

.dictItem span+span {
  margin-left: 20px;
}

</style>
