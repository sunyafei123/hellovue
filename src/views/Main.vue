<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu>
<!--          :default-openeds="['1']"-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-caret-right"></i>用户管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <router-link to="/user/profile">个人信息</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link to="/user/list">用户列表</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-caret-right"></i>角色管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <router-link to="/role/basic">角色种类管理</router-link></el-menu-item>
              <el-menu-item index="2-2">
               <router-link to="/role/user">角色用户管理</router-link>
              </el-menu-item>
              <el-menu-item index="2-3">角色权限管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-caret-right"></i>权限管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <router-link to="/permission/basic">基本权限管理</router-link></el-menu-item>
              <el-menu-item index="3-2">用户权限管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right">
            <span style="font-size: 50px;margin-right: 20%;letter-spacing: 50px;font-family: 隶书,serif;color: #48ff4c">权限管理系统</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right:15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item v-on:click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{username}}</span>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "Main",
        data(){
            return{
                username:sessionStorage.getItem('username')
            }
        },
        methods:{
            logout(){
                this.$router.push("/");
            }
        }
    }
</script>

<style scoped lang="scss">
  .el-header{
    background-color: #23acd1;
    color: #333;
    line-height: 60px;
  }
  .el-aside{
    color: #333;
  }
</style>
