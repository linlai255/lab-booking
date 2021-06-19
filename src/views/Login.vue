<template>
  <div class="login">
    <h3>login</h3>
    <el-form :model="loginData" status-icon :rules="rules" ref="loginForm" label-width="80px" label-position="right" hide-required-asterisk:true>
      <el-form-item label="用户名" prop="account" inline-message:true>
        <el-input placeholder="account" v-model="loginData.account" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="password" v-model="loginData.password" autocomplete="off" show-password />
      </el-form-item>
      <el-form-item class="md-tb-5" prop="mode">
        <el-radio-group v-model="loginData.mode">
          <el-radio label="0">邮箱</el-radio>
          <el-radio label="1">手机号</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="md-tb-5" prop="registerType">
        <el-radio-group v-model="loginData.registerType">
          <el-radio label="2">我是教师</el-radio>
          <el-radio label="1">我是管理员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="md-tb-5" prop="registerType">
        <el-checkbox v-model="loginData.rememberMe">记住我</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-row style="margin-top: 10px">
          <el-button @click="submitForm('loginForm')" class="submit-btn" type="primary">登录</el-button>
          <el-button type="text" @click="dialogVisible = true" class="register-btn">注册</el-button>
          <el-dialog title="请选择注册类型" v-model="dialogVisible" :width="'300px'">
            <el-row :gutter="55">
              <el-col :span="12">
                <el-button type="warning" @click="register(2)" round style="width: 100px">教师</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="danger" @click="register(1)" round style="width: 100px">管理员</el-button>
              </el-col>
            </el-row>
          </el-dialog>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { ElMessage } from 'element-plus'
import * as accountHttp from '@/http/account'
import router from '@/router/index'
import { useRoute } from 'vue-router'
import sha1 from 'js-sha1'
import { tokenKey } from '@/http/index'
export default {
  name: 'Login',
  setup() {
    let obj = new useRoute().params
    if (typeof obj === 'undefined') {
      obj = {
        account: '',
        password: '',
      }
    }
    console.log(obj)

    let loginData = reactive({
      account: obj.account,
      password: obj.password,
      mode: '0',
      registerType: '2',
      rememberMe: false,
    })
    let dialogVisible = ref(false)

    let rules = {
      account: [{ required: true, message: 'please enter account', trigger: 'blur' }],
      password: [
        { required: true, message: 'please enter password', trigger: 'blur' },
        { min: 6, max: 20, message: 'length between 6 and 20', trigger: 'blur' },
      ],
    }

    let register = (code) => {
      console.log(code)
      console.log(dialogVisible.value)
      dialogVisible.value = false

      router.push({
        name: 'Registration',
        params: {
          type: code,
        },
      })
    }

    return {
      loginData,
      rules,
      register,
      dialogVisible,
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let busData = {
            username: '',
            registerType: '',
            avatar: '',
          }
          accountHttp
            .login({
              account: this.loginData.account,
              password: sha1(this.loginData.password),
              mode: this.loginData.mode,
              registerType: this.loginData.registerType,
              rememberMe: this.loginData.rememberMe,
            })
            .then(
              (res) => {
                console.log(res)
                busData.username = res.data.data.username
                busData.registerType = res.data.data.type
                busData.avatar = 'https://picsum.photos/200'
                localStorage.setItem(tokenKey, res.data.data.token)
                localStorage.setItem('user', JSON.stringify(busData))
                router.push({ name: 'Index' })
              },
              (err) => {
                ElMessage.error(err.data.message)
              }
            )
            .catch((err) => {
              console.log(err)
            })
        } else {
          return false
        }
      })
      // router.push('/index')
    },
  },
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
h3 {
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
