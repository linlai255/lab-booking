<template>
  <div class="steps">
    <div style="margin-bottom: 30px">
      <el-steps :active="stepNum" finish-status="success">
        <el-step title="选择类型"></el-step>
        <el-step title="获取验证码"></el-step>
        <el-step title="提交验证码"></el-step>
        <el-step title="设置密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div class="registration">
      <transition-group tag="div" name="el-zoom-in-top" duration="0.5">
        <div v-show="stepNum === 1" class="transition-box" key="1">
          <el-form :model="verifyCodeData" status-icon :rules="rules" ref="verifyCodeForm" hide-required-asterisk:true>
            <el-form-item prop="account" inline-message:true>
              <el-input placeholder="me@email.com, 131xxxx1802" v-model="verifyCodeData.account" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="mode">
              <el-radio-group v-model="verifyCodeData.mode">
                <el-radio label="0">邮箱</el-radio>
                <el-radio label="1">手机号</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button @click="getVerifyCode('verifyCodeForm')" class="submit-btn" type="primary">获取验证码</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="stepNum === 2" class="transition-box" key="2">
          <el-form :model="checkVerifyCodeData" status-icon :rules="rules" ref="checkVerifyCodeForm" hide-required-asterisk:true>
            <el-form-item prop="account" inline-message:true>
              <el-input type="text" placeholder="me@email.com, 131xxxx1802" v-model="checkVerifyCodeData.account" disabled />
            </el-form-item>
            <el-form-item prop="verifyCode" inline-message:true>
              <el-input type="text" v-model="checkVerifyCodeData.verifyCode" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <el-button @click="checkVerifyCode('checkVerifyCodeForm')" class="submit-btn" type="primary">提交验证码</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="stepNum === 3" class="transition-box" key="3">
          <el-form :model="registerData" status-icon :rules="rules" ref="registerForm" hide-required-asterisk:true>
            <el-form-item prop="account" inline-message:true>
              <el-input type="text" placeholder="me@email.com, 131xxxx1802" v-model="registerData.account" disabled />
            </el-form-item>
            <el-form-item prop="password" inline-message:true>
              <el-input type="password" v-model="registerData.password" autocomplete="off" show-password />
            </el-form-item>
            <el-form-item prop="checkPassword" inline-message:true>
              <el-input type="password" v-model="registerData.checkPassword" autocomplete="off" show-password />
            </el-form-item>
            <el-form-item>
              <el-button @click="register('registerForm')" class="submit-btn" type="primary">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="stepNum === 4" class="transition-box" key="4">
          <el-form :model="finishData" :rules="rules" hide-required-asterisk:true>
            <el-form-item prop="account" inline-message:true>
              <el-input type="text" placeholder="me@email.com, 131xxxx1802" v-model="finishData.account" disabled />
            </el-form-item>
            <el-form-item>
              <el-button @click="gotoLogin" class="submit-btn" type="primary">去登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import router from '@/router/index'
import { useRoute } from 'vue-router'
import * as accountHttp from '@/http/account'

import sha1 from 'js-sha1'
import { ElMessage } from 'element-plus'
// import { onMounted } from '@vue/runtime-core'

export default {
  name: 'Registration',
  setup() {
    let registerForm = ref(null)

    let verifyCodeData = reactive({
      account: '',
      mode: '0',
      registerType: new useRoute().params.type,
    })

    let checkVerifyCodeData = reactive({
      account: verifyCodeData.account,
      verifyCode: '',
    })

    let registerData = reactive({
      account: verifyCodeData.account,
      mode: verifyCodeData.mode,
      registerKey: '',
      password: '',
      checkPassword: '',
    })

    let finishData = reactive({
      account: verifyCodeData.account,
    })

    var validateAccount = (rule, account, callback) => {
      if (account === '') {
        callback(new Error('please enter email or phone number'))
      } else if (verifyCodeData.mode === '0' && !validateEmailFormat(account)) {
        callback(new Error('email format error'))
      } else if (verifyCodeData.mode === '1' && !validatePhoneFormat(account)) {
        callback(new Error('phone format error'))
      } else {
        callback()
      }
    }

    var validateVerfifyCode = (rule, verifyCode, callback) => {
      if (verifyCode === '') {
        callback(new Error('please enter verfify code'))
      } else {
        callback()
      }
    }

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter your passowrd'))
      } else if (!validatePasswordFormat(value)) {
        callback(new Error('password in 6, 18 length. only contains number, alphabet or underline char'))
      } else {
        console.log(registerData.checkPassword)
        console.dir(registerForm.value)
        if (registerData.checkPassword !== '') {
          console.log('in')
          registerForm.value.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please enter password again'))
      } else if (value !== registerData.password) {
        callback(new Error('two password conflict'))
      } else {
        callback()
      }
    }

    var validateEmailFormat = (email) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }

    var validatePhoneFormat = (phone) => {
      const re = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
      return re.test(phone)
    }

    // ^[a-zA-Z]\w{5,17}$
    var validatePasswordFormat = (password) => {
      const re = /^[a-zA-Z]\w{5,17}$/
      return re.test(password)
    }

    let rules = {
      account: [{ validator: validateAccount, /* required: true, message: 'please enter email or phone number' ,*/ trigger: 'blur' }],
      mode: [{ required: true, message: 'please select email or phone number', trigger: 'blur' }],
      verifyCode: [
        { validator: validateVerfifyCode, trigger: 'blur' },
        { min: 6, max: 6, message: 'length error', trigger: 'blur' },
      ],
      password: [{ validator: validatePass, trigger: 'blur' }],
      checkPassword: [{ validator: validatePass2, trigger: 'blur' }],
    }

    let stepNum = ref(1)

    return {
      rules,
      stepNum,
      verifyCodeData,
      checkVerifyCodeData,
      registerData,
      finishData,
      registerForm,
    }
  },
  methods: {
    getVerifyCode(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          accountHttp
            .verifyCode({
              account: this.verifyCodeData.account,
              mode: this.verifyCodeData.mode,
              registerType: this.verifyCodeData.registerType,
            })
            .then(
              () => {
                this.checkVerifyCodeData.account = this.verifyCodeData.account
                this.stepNum++
              },
              (err) => {
                ElMessage.error(err.data.message)
              }
            )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    checkVerifyCode(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          accountHttp
            .checkVerifyCode({
              account: this.checkVerifyCodeData.account,
              verifyCode: this.checkVerifyCodeData.verifyCode,
            })
            .then(
              (result) => {
                console.log(result.data)
                this.registerData.registerKey = result.data.data.registerKey
                this.registerData.account = this.verifyCodeData.account
                this.stepNum++
              },
              (err) => {
                ElMessage.error(err.data.message)
              }
            )
        } else {
          return false
        }
      })
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          accountHttp
            .register({
              account: this.checkVerifyCodeData.account,
              registerKey: this.registerData.registerKey,
              mode: this.verifyCodeData.mode,
              password: sha1(this.registerData.checkPassword),
            })
            .then(
              () => {
                this.finishData.account = this.verifyCodeData.account
                this.stepNum++
                ElMessage.info('注册成功')
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
    },
    gotoLogin() {
      router.replace({ name: 'Login', params: { account: this.finishData.account } })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style scoped>
.steps {
  width: 600px;
  margin: auto;
  margin-top: 10%;
  border: 0.5px solid #efefef;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 200px;
}
.registration {
  width: 400px;
  margin: auto;
  border: 0;
  padding: 20px;
}
h3 {
  text-align: left;
}
.submit-btn {
  width: 100%;
}
</style>
