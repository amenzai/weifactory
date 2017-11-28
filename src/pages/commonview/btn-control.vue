<template>
  <el-row :gutter="20">
    <ul class="like-table">
      <li>
        <el-row>
          <el-col class="pl20" :span="4">开关名称</el-col>
          <el-col :span="16">设定开启时间</el-col>
          <el-col :span="4">开关状态</el-col>
        </el-row>
      </li>
      <li v-for="(item,index) in btnList" :key="index">
        <el-row>
          <el-col class="pl20" :span="4">{{ item.actuatorName }}</el-col>
          <el-col :span="16">
            <el-date-picker v-model="date[index]" type="datetimerange" placeholder="选择时间范围" style="width:60%" v-show="!checkGroup[index]">
            </el-date-picker>
            <el-checkbox v-model="checkGroup[index]" style="margin-left:30px" true-label="1" false-label="">一直开启</el-checkbox>
          </el-col>
          <el-col :span="4">
            <el-switch v-model="btnGroup[index]" on-value="1" off-value="0" on-text="" off-text="" @change="postStatus(index,item.actuatorId)"></el-switch>
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
        btnList: [],
        send: {},
        checkGroup: [],
        btnGroup: [],
        sn: '',
        date: [
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          []
        ]
      }
    },
    created() {
      this.sn = window.sessionStorage.getItem('sn')
      this.send = {
        sn: this.sn,
        sensorId: '',
        status: '',
        timeVal: '',
        startTime: '',
        endTime: ''
      }
      this.getList()
    },
    methods: {
      getList() {
        this.$ajax.get('control/list', this.sn)
          .then(res => {
            console.log('', res);
            this.btnList = res.data;
            const length = this.btnList.length;
            for (let i = 0; i < length; i++) {
              this.checkGroup[i] = this.btnList[i].timeval || ''
              this.btnGroup[i] = this.btnList[i].status
              this.date[i][0] = this.btnList[i].startTime ? new Date(this.btnList[i].startTime) : ''
              this.date[i][1] = this.btnList[i].endTime ? new Date(this.btnList[i].endTime) : ''
            }
          })
      },
      postStatus(index, id) {
        if (!this.checkGroup[index] && !this.date[index][0] && !this.date[index][1]) {
          this.$message.error('请先设定开启时间')
          console.log(this.btnGroup[index])
          this.btnGroup[index] = Number(!parseInt(this.btnGroup[index])).toString()
          console.log(this.btnGroup[index])
          return
        }
        if (!this.checkGroup[index]) {
          this.getDateRange(this.date[index])
          this.send.timeVal = ''
        } else {
          this.send.timeVal = this.checkGroup[index]
          this.send.startTime = ''
          this.send.endTime = ''
        }
        this.send.sensorId = id
        this.send.status = this.btnGroup[index]
        console.log(this.$toJSON(this.send))
        this.$ajax.post('control/sensor', this.send)
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
      },
      getDateRange(date) {
        if (date && date.length) {
          this.send.startTime = this.$dateFilter(date[0], 'yyyy-MM-dd hh:mm:ss')
          this.send.endTime = this.$dateFilter(date[1], 'yyyy-MM-dd hh:mm:ss')
        } else {
          this.send.startTime = ''
          this.send.endTime = ''
        }
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
