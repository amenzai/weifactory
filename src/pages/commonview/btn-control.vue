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
      <li>
        <el-row>
          <el-col class="pl20" :span="4">空气消毒</el-col>
          <el-col :span="16">
            <el-date-picker v-model="date1" type="datetimerange" placeholder="选择时间范围" style="width:60%" v-if="!checkGroup.checked1">
            </el-date-picker>
            <el-checkbox v-model="checkGroup.checked1" style="margin-left:30px" true-label="1" false-label="">一直开启</el-checkbox>
          </el-col>
          <el-col :span="4">
            <el-switch v-model="btnGroup.btn1" on-value="1" off-value="0" on-text="" off-text="" @change="postStatus(1)"></el-switch>
          </el-col>
        </el-row>
      </li>
      <li>
        <el-row>
          <el-col class="pl20" :span="4">营养液消毒</el-col>
          <el-col :span="16">
            <el-date-picker v-model="date2" type="datetimerange" placeholder="选择时间范围" style="width:60%" v-if="!checkGroup.checked2">
            </el-date-picker>
            <el-checkbox v-model="checkGroup.checked2" style="margin-left:30px" true-label="1" false-label="">一直开启</el-checkbox>
          </el-col>
          <el-col :span="4">
            <el-switch v-model="btnGroup.btn2" on-value="1" off-value="0" on-text="" off-text="" @change="postStatus(2)"></el-switch>
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
        send: {},
        checkGroup: {
          checked1: '',
          checked2: '',
          checked3: '',
          checked4: '',
          checked5: '',
          checked6: '',
          checked7: '',
          checked8: '',
          checked9: '',
          checked10: '',
          checked11: '',
          checked12: ''
        },
        btnGroup: {
          btn1: '0',
          btn2: '0',
          btn3: '0',
          btn4: '0',
          btn5: '0',
          btn6: '0',
          btn7: '0',
          btn8: '0',
          btn9: '0',
          btn10: '0',
          btn11: '0',
          btn12: '0'
        },
        sn: '',
        date1: [],
        date2: [],
        date3: [],
        date4: [],
        date5: [],
        date6: [],
        date7: [],
        date8: [],
        date9: [],
        date10: [],
        date11: [],
        date12: [],
        date13: [],
        date14: [],
        date15: [],
        date16: [],
        date17: [],
        date18: [],
        date19: [],
        date20: [],
        date21: [],
        date22: [],
        date23: [],
        date24: [],
        date25: [],
        date26: [],
        date27: [],
        date28: [],
        date29: [],
        date30: [],
        date31: []
      }
    },
    created() {
      this.send = {
        sn: window.sessionStorage.getItem('sn'),
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
        // this.$ajax.get('user/detail', this.userId)
        //   .then(res => {
        //     console.log('', res);
        //     this.userDetail = res.data;
        //   })
      },
      postStatus(state) {
        switch (state) {
          case 1:
            this.getDateRange(this.date1)
            this.send.sensorId = 18
            this.send.status = this.btnGroup.btn1
            this.send.timeVal = this.checkGroup.checked1
            this.postData()
            break
          case 2:
            this.getDateRange(this.date2)
            this.send.sensorId = 19
            this.send.status = this.btnGroup.btn2
            this.send.timeVal = this.checkGroup.checked2
            this.postData()
            break
        }
      },
      getDateRange(date) {
        if (date && date.length) {
          this.send.startTime = this.$dateFilter(date[0], 'yyyy-MM-dd hh:mm:ss')
          this.send.endTime = this.$dateFilter(date[1], 'yyyy-MM-dd hh:mm:ss')
        } else {
          this.send.startTime = ''
          this.send.endTime = ''
        }
      },
      postData() {
        console.log(this.$toJSON(this.send))
        if (!this.send.timeVal && !this.send.startTime) {
          this.$message.error('请先设定开启时间')
          return
        }
        this.$ajax.post('device/sensor', this.send)
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
