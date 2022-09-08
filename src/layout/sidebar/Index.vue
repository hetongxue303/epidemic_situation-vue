<template>
  <el-menu
      :collapse="props.collapse"
      :default-active="active"
      :router="true"
      :unique-opened="true"
      active-text-color="#409EFF"
      text-color="#fff"
      background-color="#304156"
      class="menu">
    <!--菜单项-->
    <MenuItem :data="userStore.getMenus"/>
  </el-menu>
</template>

<script setup lang="ts">
import MenuItem from '@layout/sidebar/MenuItem.vue'

import {onMounted, PropType, ref, watch} from 'vue'
import {useRoute} from 'vue-router'
import {useUserStore} from '../../store/modules/user'

const userStore = useUserStore()

// 定义需要接收的参数
const props = defineProps({
  // 是否折叠
  collapse: {
    type: Boolean as PropType<boolean>,
    required: true
  }
})

// 设置默认选中菜单
const route = useRoute()
const active = ref<string>('/dashboard')
const changeDefaultActive = () => active.value = route.path

// 监听路由变化设置菜单
watch(() => route.path, () => changeDefaultActive(), {deep: true, immediate: true})

// 启动时默认选中dashboard页面
onMounted(() => changeDefaultActive())
</script>

<style scoped lang="scss">
.menu {
  height: 100%;

  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>