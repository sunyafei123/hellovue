<template>
<div>
  <h1>用户列表</h1>
  <button class="el-button" v-on:click="getUser">查询所有用户</button>
  <button class="el-button" v-on:click="addUser">增加用户</button>
  <table class="el-table">
    <tr>
      <th>用户ID</th>
      <th>用户名</th>
      <th>密码</th>
      <th>角色管理</th>
      <th>查询权限</th>
    </tr>
    <tr v-for="(item,index) in list" :key="index">
      <td>{{item.id}}</td>
      <td>{{item.name}}</td>
      <td>{{item.password}}</td>
      <td><el-button v-on:click="changeRole(item.id)">更改角色</el-button></td>
      <td><el-button v-on:click="getPermission(item.name)">查询权限</el-button></td>
    </tr>
  </table>


  <el-dialog
    title="权限列表"
    :visible.sync="dialogVisible"
    width="70%"
  >
    <table class="el-table">
      <tr>
        <th>用户ID</th>
        <th>用户名</th>
        <th>角色</th>
        <th>拥有的权限</th>
      </tr>
      <tr v-for="(item,index) in per" :key="index">
        <td>{{item.userID}}</td>
        <td>{{item.userName}}</td>
        <td>{{item.roleName}}</td>
        <td>{{item.permissionName}}</td>
      </tr>
    </table>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
      </span>
  </el-dialog>

  <el-dialog
    title="网络连接错误"
    :visible.sync="dialog1Visible"
    width="30%"
  >
    <span>网络请求失败:{{error}}</span>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog1Visible=false">确定</el-button>
      </span>
  </el-dialog>

  <el-dialog
    title="改变角色"
    :visible.sync="dialog2Visible"
    width="30%"
  >
   <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.name"
      :label="item.name"
      :value="item.id">
    </el-option>
   </el-select>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changecheck(value)">确定</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>
    export default {
        name: "UserList",
        data() {
            return{
                list:[],
                per:[],
                error:'',
                dialogVisible:false,
                dialog1Visible:false,
                dialog2Visible:false,
                // options: [{
                //     value: '选项1',
                //     label: '黄金糕'
                // }, {
                //     value: '选项2',
                //     label: '双皮奶'
                // }],
                options:[],
                value: '',
                userid:null
            }
        },
        methods:{
            addUser(){

            },
            getUser:function () {
                this.axios({
                    method:'get',
                    url:'http://localhost:8081/getAllUser'
                }).then((response)=>{
                    this.list=response.data
                }).catch((error)=>{
                    this.dialog1Visible=true;
                    this.error=error.message
                })
            },
            changeRole(id){
                this.dialog2Visible=true;
                this.userid=id;
                this.axios({
                    method:'get',
                    url:'http://localhost:8081/getAllRole'
                }).then(response=>{
                    console.log(response.data);
                    this.options=response.data

                }).catch(error=>{

                })

            },
            changecheck(value){
                console.log(value);
                this.axios.post("http://localhost:8081/changeRole?userId="+this.userid+"&roleId="+value).
                then(response=>{
                    console.log(response)
                }).catch(error=>{

                })
            },
            getPermission:function (name) {
                this.axios({
                    method:'get',
                    url:'http://localhost:8081/selectPermission/'+name
                }).then((response)=>{
                    this.per=response.data;
                    // console.log(response.data)
                }).catch((error)=>{
                    this.dialog1Visible=true
                    console.log(error.message)
                });
                this.dialogVisible=true;
            },
            handleClose(done){
                this.$confirm('确定关闭吗').then(() => {
                    done();
                }).catch(() => {
                });
            }
        }
    }
</script>

<style scoped>

</style>
