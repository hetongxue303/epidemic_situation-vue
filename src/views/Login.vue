<template>
  <div class="login">
    <div class="login-logo">
      this is system logo
    </div>
    <div class="login-box">
      <div class="login-box-left"></div>
      <div class="login-box-right">
        <div class="login-box-title">
          <h1>居民疫情管控系统</h1>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="ruleFormRef" class="login-box-form">
          <el-form-item prop="username">
            <el-input class="login-box-input" type="text" v-model="loginForm.username" placeholder="请输入用户名">
              <template #prefix>
                <el-icon>
                  <component is="user"/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="login-box-input" type="password" v-model="loginForm.password" placeholder="请输入密码"
                      show-password>
              <template #prefix>
                <el-icon>
                  <component is="lock"/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-row :gutter="5">
            <el-form-item class="login-box-input" prop="code">
              <el-col :span="16">
                <el-input type="text" v-model="loginForm.code" placeholder="请输入验证码">
                  <template #prefix>
                    <el-icon>
                      <component is="key"/>
                    </el-icon>
                  </template>
                </el-input>
              </el-col>
              <el-col :span="8" style="display: flex;justify-content: center;align-items: center">
                <el-image :src="imgUrl" @click="changeImageCode" style="cursor: pointer" title="点击切换验证码"/>
              </el-col>
            </el-form-item>
          </el-row>
          <el-button class="login-box-button" type="primary" @click="loginHandler(ruleFormRef)">
            <span>登 录</span>
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from 'vue'
import {getCode, user} from '../api/user/user'
import {ElMessage, FormInstance, FormRules} from 'element-plus'
import {useRouter} from "vue-router";
import {useUserStore} from '../store/modules/user'

// 表单数据
const loginForm = reactive<any>({
  username: '',
  password: '',
  code: ''
})

// 表单校验
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [
    {required: true, message: '账号不能为空', trigger: 'blur'},
    {min: 3, max: 20, message: '账号长度为3到20', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 3, max: 20, message: '密码长度为3到20', trigger: 'blur'}
  ],
  code: [
    {required: true, message: '验证码不能为空', trigger: 'blur'}
  ]
})

// 验证码相关
const imgUrl = ref<string>('')
const changeImageCode = async () => {
  const {data} = await getCode()
  imgUrl.value = data.data
}

// 监听验证码变化
watch(() => imgUrl.value, () => loginForm.code = '')

// 登陆处理
const router = useRouter()
const userStore = useUserStore()
const loginHandler = async (formEl: FormInstance | undefined) => {
  // 表单校验
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      // 登录请求
      const {data, headers} = await user(loginForm);
      if (data.code === 200) {
        userStore.saveAuthorization(headers.authorization)
        ElMessage.success('登陆成功')
        await router.push('/dashboard');
      } else {
        ElMessage.warning(data.message)
        await changeImageCode()
        loginForm.code = ''
      }
    }
  })
}

onMounted(() => {
  // 初始化验证码图片
  changeImageCode()
})
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  width: 100%;
  background-color: cornflowerblue;
  display: flex;
  justify-content: center;
  align-items: center;

  &-logo {
    height: 50px;
    width: 150px;
    background-color: white;
    position: absolute;
    top: 1px;
    left: 1px;
  }

  &-box {
    height: 550px;
    width: 1050px;
    background-color: white;
    border-radius: 1.1rem;
    display: flex;

    &-left {
      width: 60%;
      //background-color: bisque;
      background-image: url("../assets/images/bg.png");
      border-radius: 1.1rem 0 0 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-right {
      width: 40%;
      //background-color: aquamarine;
      border-radius: 0 1.1rem 1.1rem 0;
      text-align: center;
      padding-top: 40px;

      .login-box-title {
        height: 150px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
        font-family: Arial Avenir, Helvetica, Arial, sans-serif;
      }

      .login-box-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .login-box-input {
          width: 280px;
          height: 35px;
        }
      }

      .login-box-button {
        margin-top: 30px;
        width: 280px;
        height: 35px;
      }
    }
  }
}
</style>