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
      <transition-group tag="div" name="el-zoom-in-top">
        <div v-show="stepNum === 1" class="transition-box">
          <el-form :model="verifyCodeData" :rules="rules" hide-required-asterisk:true>
            <el-form-item prop="account" inline-message:true>
              <el-input placeholder="me@email.com, 131xxxx1802" v-model="verifyCodeData.account" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="mode">
              <el-radio-group v-model="verifyCodeData.mode">
                <el-radio label="1">邮箱</el-radio>
                <el-radio label="2">手机号</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button @click="getVerifyCode" class="submit-btn" type="primary">获取验证码</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="stepNum === 2" class="transition-box">
          <el-form :model="checkVerifyCodeData" :rules="rules" hide-required-asterisk:true>
            <el-form-item prop="account" inline-message:true>
              <el-input type="text" placeholder="me@email.com, 131xxxx1802" v-model="checkVerifyCodeData.account" disabled />
            </el-form-item>
            <el-form-item prop="verifyCode" inline-message:true>
              <el-input type="text" placeholder="01234567" v-model="checkVerifyCodeData.verifyCode" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <el-button @click="checkVerifyCode" class="submit-btn" type="primary">提交验证码</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="stepNum === 3" class="transition-box">
          <el-form :model="registerData" :rules="rules" hide-required-asterisk:true>
            <el-form-item prop="account" inline-message:true>
              <el-input placeholder="me@email.com, 131xxxx1802" v-model="registerData.account" autocomplete="off" />
            </el-form-item>
            <el-form-item>
              <el-button @click="checkVerifyCode" class="submit-btn" type="primary">提交验证码</el-button>
            </el-form-item>
          </el-form>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
// import router from '@/router/index'
import { useRoute } from 'vue-router'

export default {
  name: 'Registration',
  setup() {
    let verifyCodeData = reactive({
      account: '',
      mode: '1',
      registerType: new useRoute().params.type,
    })

    let checkVerifyCodeData = reactive({
      account: verifyCodeData.account,
      verifyCode: '',
    })

    let registerData = reactive({
      account: verifyCodeData.account,
      registerKey: '',
      mode: '',
      password: '',
    })

    let rules = {
      account: [{ required: true, message: 'please enter email or phone number', trigger: 'blur' }],
      mode: [{ required: true, message: 'please select email or phone number', trigger: 'blur' }],
      verifyCode: [
        { required: true, message: 'please enter verify code', trigger: 'blur' },
        { min: 8, max: 8, message: 'length error', trigger: 'blur' },
      ],
    }

    let stepNum = ref(1)

    let getVerifyCode = () => {
      checkVerifyCodeData.account = verifyCodeData.account
      stepNum.value++
      // alert('get verify code')
    }
    let checkVerifyCode = () => {
      stepNum.value++
      // alert('get verify code')
    }

    return {
      rules,
      stepNum,
      verifyCodeData,
      getVerifyCode,
      checkVerifyCodeData,
      checkVerifyCode,
      registerData,
    }
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
