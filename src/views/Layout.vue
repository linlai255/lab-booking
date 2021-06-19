<template>
  <el-container direction="vertical">
    <Header :user="userData" />
    <el-container style="height: 920px">
      <Menu :registerType="userData.registerType" />
      <el-container direction="vertical">
        <el-main>
          <router-view />
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
import { useRoute } from 'vue-router'
// import router from '@/router/index'

export default {
  name: 'Layout',
  components: { Menu, Header, Footer },
  setup() {
    let busData = new useRoute().params

    busData = JSON.parse(localStorage.getItem('user'))

    let userData = reactive({
      username: busData.username,
      registerType: busData.registerType,
      avatar: busData.avatar,
    })

    return {
      userData,
    }
  },
}
</script>

<style scoped></style>
