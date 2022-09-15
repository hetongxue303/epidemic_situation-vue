<template>
  <el-dropdown trigger="hover">
    <span class="el-dropdown-link">
      <div class="content">
        <el-avatar shape="circle"
                   :size="30"
                   src="https://p26-passport.byteacctimg.com/img/user-avatar/7eb085af8382dfa92ed6fb9a4aea448c~300x300.image"/>
   <span class="username">用户名</span>
    </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>布局设置</el-dropdown-item>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item divided @click="dialogVisible=true">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!--对话框-->
  <el-dialog
      v-model="dialogVisible"
      title="温馨提示"
      width="35%"
  >
    <span>是否确认退出系统？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">否</el-button>
        <el-button type="primary" @click="logoutHandler">是</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {logout} from '../../api/user/user'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'
import {useUserStore} from '../../store/modules/user'

const router = useRouter()
const userStore = useUserStore()
const dialogVisible = ref(false)

// 注销处理
const logoutHandler = async () => {
  const {data} = await logout()
  switch (data.code as number) {
    case 200:
      userStore.userLogout()// 清除session和store的值
      ElMessage.success('注销成功')
      await router.push('/login')
      break
    default:
      ElMessage.error('注销失败')
  }
}
</script>

<style scoped lang="scss">
.content {
  width: 100px;
  height: 49px;
  margin-bottom: 1px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(245, 245, 245, 0.8);
  }

  .username {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    font-size: 12px;
  }
}

</style>