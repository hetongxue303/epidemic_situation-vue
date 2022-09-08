<template>
  <el-container>
    <el-aside width="auto">
      <Sidebar :collapse="userStore.getCollapse"/>
    </el-aside>
    <el-container>
      <el-header height="50px">
        <Header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer height="30px">
        <Footer/>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from '@layout/sidebar/Index.vue'
import Header from '@layout/header/Index.vue'
import Footer from '@layout/footer/Index.vue'

import {useUserStore} from '../store/modules/user'

const userStore = useUserStore()
</script>

<style scoped lang="scss">
.el-container {
  height: 100%;
}

.el-aside {
}

.el-header {
  padding: 0;
  margin: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.el-main {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

.el-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>