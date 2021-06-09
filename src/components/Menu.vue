<template>
  <el-aside class="asider" width="200px">
    <el-menu>
      <el-submenu index="1">
        <template #title><i class="el-icon-school"></i>实验室</template>
        <el-menu-item-group>
          <el-menu-item index="1-1"><i class="el-icon-search"></i>预约记录</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-data-analysis"></i>实验环境</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template #title><i class="el-icon-lock"></i>权限操作</template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><i class="el-icon-connection"></i>绑定</el-menu-item>
          <el-menu-item index="2-2"><i class="el-icon-menu"></i>菜单</el-menu-item>
          <el-menu-item index="2-3"><i class="el-icon-position"></i>API</el-menu-item>
          <el-menu-item index="2-4"><i class="el-icon-view"></i>角色</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template #title><i class="el-icon-files"></i>文件中心</template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><i class="el-icon-document-add"></i>上传</el-menu-item>
          <el-menu-item index="3-2"><i class="el-icon-document-remove"></i>下载</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'Menu',
}
</script>

<style scoped>
.el-aside {
  border-right: 2px solid #efefef;
}
</style>
