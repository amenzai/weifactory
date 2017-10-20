<template>
  <el-row :gutter="20">
    <ul class="like-table">
      <li>
        <el-row>
          <el-col class="pl20" :span="4">开关名称</el-col>
          <el-col :span="4">开关状态</el-col>
          <el-col :span="16">设定开启时间</el-col>
        </el-row>
      </li>
      <li>
        <el-row>
          <el-col class="pl20" :span="4">空气消毒</el-col>
          <el-col :span="4">
            <el-switch v-model="btnGroup.btn1" on-text="" off-text=""></el-switch>
          </el-col>
          <el-col :span="16" v-if="btnGroup.btn1">
            <el-date-picker v-model="date" type="datetimerange" placeholder="选择时间范围" style="width:60%" v-if="!checked">
            </el-date-picker>
            <el-checkbox v-model="checked" style="margin-left:30px">一直开启</el-checkbox>
          </el-col>
        </el-row>
      </li>
    </ul>
  </el-row>
</template>
<script>
export default {
  data() {
      return {
        btnGroup: {
          btn1: false,
          btn2: false,
          btn3: false,
          btn4: false,
          btn5: false,
          btn6: false,
          btn7: false,
          btn8: false,
          btn9: false,
          btn10: false,
          btn11: false,
          btn12: false
        },
        checked: false, 
        date: []
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        // this.$ajax.get('user/detail', this.userId)
        //   .then(res => {
        //     console.log('', res);
        //     this.userDetail = res.data;
        //   })
      }
    }
}
</script>
<style scoped lang="less">
.like-table li {
  padding: 15px 0;
  line-height: 28px;
  border-bottom: 1px solid #ddd;
}

.like-table li:first-child {
  background-color: #f7f7f7;
}

.pl20 {
  padding-left: 20px;
}
</style>
