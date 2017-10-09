<template>
  <el-row>
    <el-col :span="14" :offset="2">
      <el-form ref="submitForm" :model="form" label-width="120px">
        <el-form-item label="设备型号：">
          <el-input v-model="form.seoerName"></el-input>
        </el-form-item>
        <el-form-item label="蔬菜名称">
          <el-input v-model="form.seoerName"></el-input>
        </el-form-item>
        <el-form-item label="栽培模式：">
          <el-select clearable placeholder="请选择" v-model="form.demo">
            <el-option label="经济效益优先模式" value="1"></el-option>
            <el-option label="速率优先模式" value="2"></el-option>
            <el-option label="采收期确定模式" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择托管方式：">
          <el-select clearable placeholder="请选择" v-model="form.demo">
            <el-option label="设备全托管方式" value="1"></el-option>
            <el-option label="自定义托管方式" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择托管专家：">
          <el-select clearable placeholder="请选择" v-model="form.demo">
            <el-option label="专家" value="1"></el-option>
            <el-option label="专家" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="ta-c">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      form: {
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      // successcompanyList(this.table.send)
      //   .then(res => {
      //     console.log('angent/sea', res);
      //     this.table.data = res.data.result;
      //     this.table.totalCount = res.data.totalCount;
      //     this.table.totalPages = res.data.totalPages;
      //   })
    },
    submit() {

    },
    resetForm(formName) {
      this.$refs[formName] && this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>
  
</style>
