<template>
  <!-- <p class="index-info">欢迎登陆</p> -->
  <div>
    <ul class="list-item clearfix">
      <li v-for="(item, index) in deviceInfo" :key="index">
        <h2>设备序列号：{{ item.sn }}</h2>
        <p>是否被托管：{{ item.trustStatus === '1' ? '是' : '否' }}</p>
        <p>设备规格：{{ item.deviceType | seeLabel(typeDic) }}</p>
        <el-button>查看</el-button>
        <el-button @click="modifyDevice(item)">修改</el-button>
        <el-button>删除</el-button>
      </li>
    </ul>
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
      modifyDialog: {
        visible: false,
        data: {},
        rules: {
          sn: [
            {
              required: true,
              message: "请输入设备序列号",
              trigger: "blur"
            }
          ],
          deviceType: [
            {
              required: true,
              message: "请输入设备规格",
              trigger: "blur"
            }
          ]
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
        this.deviceInfo.forEach(item => {
          this.getUse(item.deviceId)
        })
      });
    },
    getUse(deviceId) {
      this.$ajax.get("batch", deviceId).then(res => {
        if (res.data) {
          this.deviceInfo = this.deviceInfo.map(item => {
            this.$set(item, 'trustStatus', res.data.trustStatus)
            return item
          })
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
    modifyDevice(item) {
      this.data = JSON.parse(JSON.stringify(item))
      this.title = '修改设备'
      this.$refs.AddDevice.visible = true
      this.$nextTick(() => {
        this.$refs.AddDevice.init();
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.index-info {
  height: 400px;
  // margin-top: -60px;
  background-color: #fff;
}
.list-item {
  // margin: 0 -10px;
  li {
    float: left;
    margin-left: 20px;
    width: 300px;
    height: 300px;
    padding: 10px;
    border: 1px solid #ddd;
    h2 {
      font-size: 18px;
      text-align: center;
      margin-bottom: 6px;
    }
    p {
      line-height: 24px;
    }
  }
}
</style>
