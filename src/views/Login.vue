<template>
  <div class="login">
    <h4>login</h4>
    <el-form label-width="80px" :model="loginData">
      <el-form-item label="用户名">
        <el-input placeholder="username" v-model="loginData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" placeholder="password" v-model="loginData.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-button @click="submitForm" class="submit-btn" type="primary">登录</el-button>
          <el-button @click="submitForm" class="register-btn" type="primary" plain>注册</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {reactive} from 'vue'
import {ElMessage} from 'element-plus'
import * as mock from '../http/mock'

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
        .mockUser({username: 'hello'})
        .then((res) => {
          console.log(res.data)
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
  vertical-align: left;
  width: 90%;
}
.register-btn {
  align-self: right;
  width: 10%;
}
</style>
