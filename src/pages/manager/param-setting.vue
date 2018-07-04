<template>
  <el-row>
    <el-collapse accordion>
      <el-collapse-item :name="item.itemCode" v-for="(item,index) in vegetableName" :key="index">
        <template slot="title">{{ item.itemName }}</template>
        <ul class="like-table">
          <li>
            <el-row>
              <el-col :span="10" :offset="2">生长模式</el-col>
              <el-col :span="4">操作</el-col>
            </el-row>
          </li>
          <li v-for="(v,index) in cultModel" :key="index">
            <el-row>
              <el-col :span="10" :offset="2">{{ v.itemName }}</el-col>
              <el-col :span="4">
                <el-button @click="$router.push({path: '/home/manager/param-setlist', query: {model: v.itemCode, plant: item.itemCode}})">参数设置</el-button>
              </el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </el-row>
</template>
<script>
import { vegetableNameMixin, controlModelMixin } from 'common/js/mixin.js'
export default {
  mixins: [vegetableNameMixin, controlModelMixin],
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style scoped lang="less">
.like-table li {
  padding: 10px 0;
  line-height: 28px;
  + li {
    border-top: 1px solid #ebeef5;
  }
}

.like-table li:first-child {
  background-color: #f7f7f7;
}
</style>
