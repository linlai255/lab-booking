<template>
  <el-main>
    <el-table :data="data">
      <el-table-column prop="date" label="日期" width="140"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </el-main>
</template>
<script>
export default {
  name: 'Main',
  props: {
    data: {
      date: String,
      name: String,
      address: String,
    },
  },
}
</script>
<style scoped></style>
