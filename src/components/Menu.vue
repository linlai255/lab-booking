<template>
  <el-aside class="asider" width="200px">
    <el-menu router>
      <el-submenu :index="idx + 1 + ''" v-for="(subMenu, idx) in menuData" :key="subMenu.meta.sort">
        <template #title>
          <span :class="subMenu.meta.icon" style="margin-bottom: 4px" />
          <span>{{ subMenu.meta.label }}</span>
        </template>
        <el-menu-item
          v-for="(menuItem, iidx) in menuData[idx].children"
          :route="menuItem.path"
          :index="idx + 1 + '-' + (iidx + 1)"
          :key="menuItem.meta.sort"
        >
          <span :class="menuItem.meta.icon" style="margin-bottom: 2px" />
          {{ menuItem.meta.label }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import router from '@/router/index'

export default {
  name: 'Menu',
  props: {
    registerType: {
      type: Number,
      default: function () {
        return 0
      },
    },
  },
  setup(props) {
    let goto = (next) => {
      console.log(next)
      router.push({ path: next.path })
    }

    var getRoleMenuData = (registerType) => {
      let routes = router.options.routes
      let menuData = routes.filter(
        (r) =>
          (typeof r.meta.show === 'undefined' || r.meta.show) &&
          (typeof r.meta.level === 'undefined' || r.meta.level === 0 || r.meta.level === registerType)
      )
      for (let idx in menuData) {
        let temp = menuData[idx].children.filter(
          (r) =>
            (typeof r.meta.show === 'undefined' || r.meta.show) &&
            (typeof r.meta.level === 'undefined' || r.meta.level === 0 || r.meta.level === registerType)
        )
        menuData[idx].children = temp
      }
      return menuData
    }
    let menuData = {}
    let awaitMenuData = async (registerType) => {
      menuData = getRoleMenuData(registerType)
    }
    awaitMenuData(props.registerType)
    return {
      menuData,
      goto,
    }
  },
}
</script>

<style scoped>
.el-aside {
  border-right: 2px solid #efefef;
}
</style>
