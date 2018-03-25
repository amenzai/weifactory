<template>
  <!-- <p class="index-info">欢迎登陆</p> -->
  <div>
    <ul class="list-item clearfix">
      <li v-for="(item, index) in deviceInfo" :key="index">
        <h2>设备序列号：{{ item.sn }}</h2>
        <p>是否被托管：{{ item.trustStatus === '1' ? '是' : '否' }}</p>
        <p>设备规格：{{ item.deviceType | seeLabel(typeDic) }}</p>
        <el-button>查看</el-button>
        <el-button @click="modifyDevice(item)">修改 </el-button>
        <el-button>删除</el-button>
      </li>
    </ul>
    <el-dialog title="修改设备" :visible.sync="modifyDialog.visible" :close-on-click-modal="false">
      <el-form ref="modifyForm" :model="modifyDialog.data" label-width="100px" :rules="modifyDialog.rules">
        <el-form-item label="设备序列号：" prop="sn">
          <el-input v-model="modifyDialog.data.sn"></el-input>
        </el-form-item>
        <el-form-item label="设备规格：" prop="deviceType">
          <el-select v-model="modifyDialog.data.deviceType">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in typeDic" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" prop="note">
          <el-input v-model="modifyDialog.data.note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifySubmit('modifyForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deviceInfo: [],
      typeDic: [],
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
    modifyDevice(data) {
      this.resetForm("modifyForm");
      this.modifyDialog.visible = true;
      this.modifyDialog.data = {
        id: data.deviceId,
        sn: data.sn,
        deviceType: data.deviceType,
        note: data.note
      };
    },
    modifySubmit(formName) {
      let valid = false;
      this.$refs[formName].validate(v => {
        valid = v;
      });
      if (!valid) {
        return false;
      }
      const send = JSON.parse(JSON.stringify(this.modifyDialog.data));
      send.userId = this.userId;
      this.$ajax.post("device/update", send, true).then(res => {
        console.log("", res);
        var type = res.success ? "success" : "error";
        if (type === "success") {
          this.resetForm("modifyForm");
          this.modifyDialog.visible = false;
          this.getDeviceData();
        }
        this.$message({
          message: res.message,
          type: type
        });
      });
    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields();
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
