<template>
<div>
  基本角色管理
  <el-button v-on:click="getRole">查询所有角色</el-button>
  <el-button v-on:click="addRole">添加角色</el-button>
  <table class="el-table">
    <tr>
      <th>角色ID</th>
      <th>角色名</th>
      <th>创建时间</th>
      <th>更新</th>
      <th>删除</th>
    </tr>
    <tr v-for="(item,index) in list" :key="index">
      <td>{{item.id}}</td>
      <td>{{item.name}}</td>
      <td>{{item.createTime}}</td>
      <td><el-button v-on:click="updateRole(item.id,item.name)">更新角色</el-button></td>
      <td><el-button type="danger" v-on:click="deleteRole(item.id)">删除角色</el-button></td>
    </tr>
  </table>

  <el-dialog
    title="更新角色"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="20%">
    <el-input type="text" v-model:value="roleid" v-bind:disabled="true"></el-input>
    <br><br>
    <el-input type="text" v-model:value="rolename"></el-input>
    <br><br>
    <el-button @click="updatecheck">提交</el-button>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
      </span>
  </el-dialog>

  <el-dialog
    title="添加角色"
    :visible.sync="dialog1Visible"
    :before-close="handleClose"
    width="30%">
    <el-input v-model:value="newRoleName" type="text" placeholder="角色名"></el-input>
    <br><br>
    <el-button @click="addcheck">提交</el-button>
  </el-dialog>

  <el-dialog
    title="确认删除"
    :visible.sync="dialog2Visible"
    width="30%">
    <span>确认删除？</span>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deletecheck(deleteid)">确认</el-button>
        <el-button type="primary" @click="dialog2Visible=false">取消</el-button>
      </span>
  </el-dialog>

</div>
</template>

<script>
    export default {
        name: "RoleBasic",
        data() {
            return{
                list:[],
                roleid:null,
                rolename:'',
                newRoleName:'',
                dialogVisible:false,
                dialog1Visible:false,
                dialog2Visible:false,
                deleteid:null
            }
        },
        methods:{
            addRole(){
              this.dialog1Visible=true
            },
            addcheck(){
                this.dialog1Visible=false;
                this.axios.post('http://localhost:8081/addRole?name='+this.newRoleName)
                    .then((response)=>{
                        if(response.data===1){
                          alert("添加成功")
                        }else{
                            alert("添加失败")
                        }
                    console.log(response)
                }).catch((error)=>{
                    alert("网络请求错误");
                    console.log(error)
                })
            },
            updatecheck(){

            },
            getRole(){
                this.axios({
                    method:'post',
                    url:'http://localhost:8081/getAllRole'
                }).then((response)=>{
                    this.list=response.data;
                    console.log(response)
                }).catch((error)=>{
                    // this.dialog1Visible=true;
                    // this.error=error.message
                })
            },
            updateRole(id,name){
                this.roleid=id;
                this.rolename=name;
                this.dialogVisible=true;
            },
            handleClose(done){
                this.$confirm('确定关闭吗').then(() => {
                    // function(done)，done 用于关闭 Dialog
                    done();
                    console.info("点击右上角 'X' ，取消按钮或遮罩层时触发");
                }).catch(() => {
                    console.log("点击确定时触发");
                });
            },
            deleteRole(id){
                this.deleteid=id;
                this.dialog2Visible=true;
            },
            deletecheck(id){
                this.dialog2Visible=false;
                this.axios.get('http://localhost:8081/deleteRole/'+id)
                    .then((response)=>{
                        if(response.data===1){
                            alert("删除成功")
                        }else{
                            alert("删除失败")
                        }
                        console.log(response)
                    }).catch((error)=>{
                    alert("网络请求错误");
                    console.log(error)
                })
            }

        }
    }
</script>

<style scoped lang="scss">

</style>
