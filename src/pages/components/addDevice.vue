<template>
  <div>
    <el-dialog :title="title" :visible.sync="visible" :close-on-click-modal="false">
      <el-form ref="modifyForm" :model="data" label-width="100px" :rules="rules">
        <el-form-item label="设备序列号：" prop="sn">
          <el-input v-model="data.sn"></el-input>
        </el-form-item>
        <el-form-item label="设备规格：" prop="deviceType">
          <el-select v-model="data.deviceType">
            <el-option :label="item.label" :value="item.value" v-for="(item, index) in typeDic" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：" prop="note">
          <el-input v-model="data.note"></el-input>
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
  props: {
    title: String,
    data: Object
  },
  data() {
    return {
      typeDic: [],
      visible: false,
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
    };
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    }
  },
  created() {
    this.getTypeDic();
  },
  methods: {
    init() {
      this.$refs['modifyForm'] && this.$refs['modifyForm'].resetFields()
    },
    modifySubmit(formName) {
      if (!this.$validateForm(formName)) {
        return
      }
      const send = {
        id: this.data.deviceId,
        sn: this.data.sn,
        deviceType: this.data.deviceType,
        note: this.data.note,
        userId: this.userId
      }
      if (send.id) {
        this.$ajax.post("device/update", send, true).then(res => {
          console.log(res)
          this.visible = false;
          this.$emit('submit')
          this.$message.success(res.message);
        });
      } else {
        this.$ajax.post("device/add", send).then(res => {
          console.log(res)
          this.visible = false;
          this.$emit('submit')
          this.$message.success(res.message);
        });
      }
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
