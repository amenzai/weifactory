<template>
  <p v-if="userId === 2">欢迎登陆</p>
  <div v-else>
    <p class="mb10" v-if="userInfo.roleName === 'ROLE_USER'">
      <el-button type="primary" @click="addDevice">添加设备</el-button>
    </p>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in deviceInfo" :key="index">
        <el-card class="device-info">
          <h2>设备序列号：
            <span @click="getDetail(item.deviceId,item.sn)" class="blue">{{ item.sn }}</span>
          </h2>
          <p>是否被托管：{{ item.trustStatus === '0' ? '否' : '是' }}</p>
          <p>设备规格：{{ item.deviceType | seeLabel(typeDic) }}</p>
          <p>是否在线：<i class="gjc-tag" :class="{ active: item.onlineStatus == '1' }">{{ item.onlineStatus == '1' ? '在线' : '离线' }}</i></p>
          <p>
            <el-button type="text">
              <router-link :to="{path: '/home/commonview/batchlist', query: {id: item.deviceId}}">查看批次</router-link>
            </el-button>
            <el-button type="text" @click="modifyDevice(item)">修改</el-button>
            <el-button type="text" @click="deleteDevice(item.deviceId)">删除</el-button>
          </p>
        </el-card>
      </el-col>
    </el-row>
    <add-device ref="AddDevice" :title="title" :data="data" @submit="getDeviceData"></add-device>
  </div>
</template>
<script>
import AddDevice from './components/addDevice.vue'
export default {
  components: {
    AddDevice
  },
  data() {
    return {
      deviceInfo: [],
      typeDic: [],
      data: {},
      title: '',
      userInfo: {},
      modifyDialog: {
        visible: false,
        data: {},
        rules: {
          sn: [
            {
              required: true,
              message: '请输入设备序列号',
              trigger: 'blur'
            }
          ],
          deviceType: [
            {
              required: true,
              message: '请输入设备规格',
              trigger: 'blur'
            }
          ]
        }
      }
    }
  },
  computed: {
    userId() {
      return this.$store.state.userId
    }
  },
  created() {
    this.userInfo = this.$store.state.userInfo
    this.getDeviceData()
    this.getTypeDic()
  },
  methods: {
    getDeviceData() {
      this.$http.get('device/deviceList', this.userId).then(res => {
        this.deviceInfo = res.data
        // this.deviceInfo.forEach((item, index) => {
        //   this.getUse(item.deviceId, index);
        // });
      })
    },
    // getUse(deviceId, index) {
    //   this.$http.get("batch", deviceId).then(res => {
    //     if (res.data) {
    //       this.$set(
    //         this.deviceInfo[index],
    //         "trustStatus",
    //         res.data.trustStatus
    //       );
    //     }
    //   });
    // },
    getTypeDic() {
      this.$http.get('dict/dictItemList/device.type').then(res => {
        this.typeDic = res.data
      })
    },
    addDevice() {
      this.title = '添加设备'
      this.data = {
        deviceId: '',
        sn: '',
        deviceType: '',
        note: ''
      }
      this.$refs.AddDevice.visible = true
      this.$refs.AddDevice.init()
    },
    modifyDevice(item) {
      console.log(item)
      this.data = JSON.parse(JSON.stringify(item))
      this.title = '修改设备信息'
      this.$refs.AddDevice.visible = true
      this.$refs.AddDevice.init()
    },
    deleteDevice(id) {
      this.$confirm('确定删除设备吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'box-confim',
        cancelButtonClass: 'box-cancel',
        type: 'warning'
      })
        .then(() => {
          this.$http.get('device/delete', id).then(res => {
            this.getDeviceData()
            this.$message.success(res.message)
          })
        })
        .catch(() => {})
    },
    getDetail(id, sn) {
      this.$router.push('/home/commonview/device-detail/' + id)
      window.sessionStorage.setItem('sn', sn)
      window.sessionStorage.setItem('isShow', true)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.device-info {
  margin-bottom: 20px;
  h2 {
    font-size: 16px;
  }
  p {
    margin-top: 16px;
  }
}
.gjc-tag {
  font-size: 12px;
  display: inline-block;
  padding: 2px 4px;
  background-color: #ccc;
  border-radius: 4px;
  &.active {
    background-color: #67C23A;
    color: #fff;
  }
}
</style>
