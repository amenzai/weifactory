<template>
  <p class="index-info" v-if="userId === 2">欢迎登陆</p>
  <div v-else>
    <p class="mb10"><el-button type="primary" @click="addDevice">添加设备</el-button></p>
    <el-row :gutter="20">
    <el-col :span="6" v-for="(item, index) in deviceInfo" :key="index">
      <el-card class="device-info">
        <h2>设备序列号：<span @click="getDetail(item.deviceId,item.sn)" class="blue">{{ item.sn }}</span></h2>
        <p>是否被托管：{{ item.trustStatus === '1' ? '是' : '否' }}</p>
        <p>设备规格：{{ item.deviceType | seeLabel(typeDic) }}</p>
        <p>
          <el-button type="primary" @click="getDetail(item.deviceId,item.sn)">查看</el-button>
          <el-button type="success" @click="modifyDevice(item)">修改</el-button>
          <el-button type="danger" @click="deleteDevice(item.deviceId)">删除</el-button>
        </p>
      </el-card>
    </el-col>
    <add-device ref="AddDevice" :title="title" :data="data" @submit="getDeviceData"></add-device>
  </el-row>
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
        modifyDialog: {
          visible: false,
          data: {},
          rules: {
            sn: [{
              required: true,
              message: "请输入设备序列号",
              trigger: "blur"
            }],
            deviceType: [{
              required: true,
              message: "请输入设备规格",
              trigger: "blur"
            }]
          }
        }
      };
    },
    computed: {
      userId() {
        return this.$store.state.userId;
      }
    },
    created() {
      this.getDeviceData();
      this.getTypeDic();
    },
    methods: {
      getDeviceData() {
        this.$ajax.get("device/deviceList", this.userId).then(res => {
          this.deviceInfo = res.data;
          this.deviceInfo.forEach((item, index) => {
            this.getUse(item.deviceId ,index)
          })
        });
      },
      getUse(deviceId, index) {
        this.$ajax.get("batch", deviceId).then(res => {
          if (res.data) {
            this.$set(this.deviceInfo[index], 'trustStatus', res.data.trustStatus)
          }
        });
      },
      getTypeDic() {
        this.$ajax.get("dict/dictItemList/device.type").then(res => {
          this.typeDic = res.data.map(item => {
            return {
              label: item.itemName,
              value: item.itemCode
            };
          });
        });
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
        this.$refs.AddDevice.init();
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
          type: 'warning'
        }).then(() => {
          this.$ajax.get('device/delete', id)
            .then(res => {
              this.getDeviceData();
              this.$message.success(res.message);
            })
        }).catch(() => {});
      },
      getDetail(id, sn) {
        this.$router.push('/home/commonview/device-detail/' + id)
        window.sessionStorage.setItem('sn', sn)
        window.sessionStorage.setItem('isShow', true)
      }
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .index-info {
    height: 400px;
    background-color: #fff;
  }

  .device-info {
    margin-bottom: 20px;
    h2 {
      font-size: 16px;
    }
    p {
      margin-top: 16px;
    }
  }

</style>
