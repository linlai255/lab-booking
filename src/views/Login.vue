<template>
  <div class="login">
    <h3>login</h3>
    <el-form :model="user" :rules="rules" label-width="80px" label-position="right" hide-required-asterisk:true>
      <el-form-item label="用户名" prop="username" inline-message:true>
        <el-input placeholder="username" v-model="user.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="password" v-model="user.password" autocomplete="off" show-password />
      </el-form-item>
      <el-form-item>
        <el-row style="margin-top: 10px">
          <el-button @click="submitForm" class="submit-btn" type="primary">登录</el-button>
          <el-button type="text" @click="dialogVisible = true" class="register-btn">注册</el-button>
          <el-dialog title="请选择注册类型" v-model="dialogVisible" :width="'300px'">
            <el-row :gutter="55">
              <el-col :span="12">
                <el-button type="warning" @click="register(1)" round style="width: 100px">教师</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="danger" @click="register(2)" round style="width: 100px">管理员</el-button>
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
import * as mock from '@/http/mock'
import * as http from '@/http/index'
import router from '@/router/index'

export default {
  name: 'Login',
  setup() {
    let user = reactive({
      username: 'hello',
      password: 'world',
    })
    let dialogVisible = ref(false)

    let rules = {
      username: [{ required: true, message: 'please enter username', trigger: 'blur' }],
      password: [
        { required: true, message: 'please enter password', trigger: 'blur' },
        { min: 6, max: 20, message: 'length between 6 and 20', trigger: 'blur' },
      ],
    }

    let submitForm = function () {
      if (!user.username) {
        ElMessage.error('please enter username.')
        return false
      }
      if (!user.password) {
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
      user,
      rules,
      register,
      submitForm,
      dialogVisible,
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
