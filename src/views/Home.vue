<template>
  <el-container direction="vertical">
    <Header />
    <el-container style="height: 920px">
      <Menu />
      <el-container direction="vertical">
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140"> </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-main>
        <Footer :msg="'this is footer'" />
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Menu from '../components/Menu.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  components: { Menu, Header, Footer },
  setup() {
    let userData = reactive({
      // username: 'https://picsum.photos/200',
      // avatar: 'https://picsum.photos/200',
    })
    const item = {
      date: '2016-05-02',
      name: '毫哥永远的神',
      address: '上海市普陀区金沙江路 1518 弄',
    }
    return {
      userData,
      tableData: Array(20).fill(item),
    }
  },
}
</script>

<style scoped></style>
