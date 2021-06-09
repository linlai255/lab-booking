<template>
  <el-footer style="height: 40px">{{ msg }}</el-footer>
</template>
<script>
export default {
  name: 'Footer',
  props: {
    msg: String,
  },
}
</script>
<style scoped>
.el-footer {
  background-color: lightgoldenrodyellow;
}
</style>
