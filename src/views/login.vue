<template>
  <div class="login">
    <div class="login-logo">
      this is system logo
    </div>
    <div class="login-box">
      <div class="login-box-left">11</div>
      <div class="login-box-right">
        <div class="login-box-title">
          <h1>居民疫情管控系统</h1>
        </div>
        <el-form class="login-box-form">
          <el-form-item>
            <el-input class="login-box-input" type="text" placeholder="请输入用户名">
              <template #prefix>
                <el-icon>
                  <component is="user"/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input class="login-box-input" type="password" placeholder="请输入密码" show-password>
              <template #prefix>
                <el-icon>
                  <component is="lock"/>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-row :gutter="5">
            <el-form-item class="login-box-input">
              <el-col :span="16">
                <el-input type="text" placeholder="请输入验证码">
                  <template #prefix>
                    <el-icon>
                      <component is="key"/>
                    </el-icon>
                  </template>
                </el-input>
              </el-col>
              <el-col :span="8" style="background-color: coral;">
                <el-image style="cursor: pointer" title="点击切换验证码"/>
              </el-col>
            </el-form-item>
          </el-row>
          <el-button class="login-box-button" type="primary">
            <span>登 录</span>
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

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