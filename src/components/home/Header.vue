<template>
  <el-header :model="user" style="text-align: right; font-size: 12px">
    <el-row :gutter="20">
      <el-col :span="6" :offset="0" style="text-align: left">
        <h3 style="margin-top: 0px; margin-bottom: 0px; margin-left: 50px; font-size: 22px; line-height: 60px">Laboratory-Booking</h3>
      </el-col>
      <el-col :span="6" :offset="12" style="line-height: 60px">
        <span class="username">
          <b>{{ user.username }}</b>
        </span>
        <div style="margin-right: 80px; display: inline-block">
          <el-avatar shape="square" :size="40" :src="user.avatar" style="vertical-align: middle"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right"></i> </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>
<script>
export default {
  name: 'Header',
  props: {
    user: {
      type: Object,
      default: () => ({
        username: 'chelinlai',
        avatar: 'https://picsum.photos/200',
      }),
    },
  },
}
</script>
<style scoped>
.el-header {
  /* background-color: slategray; */
  border-bottom: 1px #efefef solid;
  /* padding-top: 10px; */
  height: 60px;
  /* line-height: 30; */
}

.username {
  margin-right: 40px;
  height: 60px;
  width: auto;
  font-size: 18px;
  display: inline;
  vertical-align: middle;
}
</style>
