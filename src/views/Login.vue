<template>
  <div class="login">
    <h4>login</h4>
    <el-form label-width="80px" label-position="right" :model="loginData">
      <el-form-item label="用户名">
        <el-input placeholder="username" v-model="loginData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" placeholder="password" v-model="loginData.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-button @click="submitForm" class="submit-btn" type="primary">登录</el-button>
          <!-- <el-button @click="submitForm" class="register-btn" type="primary" plain>注册</el-button> -->
          <el-button class="register-btn" type="text">注册</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import * as mock from '../http/mock'
import * as http from '../http/index'
import router from '../router'

export default {
  name: 'Login',
  setup() {
    let loginData = reactive({
      username: 'hello',
      password: 'world',
    })

    let submitForm = function () {
      if (!loginData.username) {
        ElMessage.error('please enter username.')
        return false
      }
      if (!loginData.password) {
        ElMessage.error('please enter password.')
        return false
      }
      mock
        .mockUser({ username: 'hello' })
        .then((res) => {
          console.log(res.data)
          localStorage.setItem(http.tokenKey, 'mocked-token')
          router.push('/home')
        })
        .catch((err) => {
          console.log(err)
        })
      // verifyCode(loginData).then((res) => {
      //   console.log(res);
      // });
    }
    return {
      loginData,
      submitForm,
    }
  },
  methods: {},
}
</script>

<style scoped>
.login {
  width: 400px;
  margin: 10% auto auto 60%;
  border: 0.5px solid #efefef;
  border-radius: 10px;
  padding: 20px;
}
h4 {
  text-align: center;
}
.submit-btn {
  align-items: left;
  width: 60%;
}
.register-btn {
  align-items: right;
  width: 30%;
}
</style>
