<template>
  <el-container direction="vertical">
    <Header />
    <el-container style="height: 920px">
      <AsideMenu />
      <el-container direction="vertical">
        <MainPage :data="tableData" />
        <Footer :msg="'this is footer'" />
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { reactive } from '@vue/reactivity'
import AsideMenu from '../components/home/AsideMenu.vue'
import MainPage from '../components/home/MainPage.vue'
import Header from '../components/home/Header.vue'
import Footer from '../components/home/Footer.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  components: { AsideMenu, MainPage, Header, Footer },
  setup() {
    let userData = reactive({
      // username: 'https://picsum.photos/200',
      // avatar: 'https://picsum.photos/200',
    })
    const item = {
      date: '2016-05-02',
      name: '王小虎',
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
