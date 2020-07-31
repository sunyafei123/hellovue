<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text"  placeholder="请输入账号" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password"  placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
<!--        <el-checkbox name="remember-me"></el-checkbox>&nbsp;&nbsp;&nbsp;-->
<!--        <span style="font-size: 16px">记住我</span>-->
        <input type="checkbox" v-model="form.remember">
        <span style="font-size:16px">记住我</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="login('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>{{info}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                form:{
                    username:'',
                    password:'',
                    remember:'',
                },
                info:'',
                rules:{
                    username:[
                        {required:true,message:'账号不可为空',trigger:'blur'}
                    ],
                    password:[
                        {required:true,message:'密码不可为空',trigger:'blur'}
                    ]
                },
                dialogVisible:false
            }
        },
        methods:{
            onSubmit(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid&&this.form.username==='1'&&this.form.password==='1'){
                        this.$router.push("/main/"+this.form.username);
                    }else {
                        this.dialogVisible=true;
                        return false
                    }
                });
            },

            login() {
               this.axios.post("/login?username=" + this.form.username + "&password=" + this.form.password+"&remember-me="+this.form.remember)
                    .then(response=> {
                        console.log(response);
                        if (response.status === 200) {
                            this.$router.push("/main");
                            sessionStorage.setItem("username",this.form.username);
                            // let myName=JSON.parse(sessionStorage.getItem("userInfo"));
                        }
                    }).catch(reason=> {
                        console.log(reason.response.status);
                        if(reason.response.status===504){
                            this.info="504网络连接超时"
                        }else {
                            this.info="账号或密码错误"
                        }
                       this.dialogVisible=true;
                       // this.$router.push("/fail");
                    })
                },
                handleClose(done){
                this.$confirm('确定关闭吗').then(() => {
                    // function(done)，done 用于关闭 Dialog
                    done();
                    console.info("点击右上角 'X' ，取消按钮或遮罩层时触发");
                }).catch(() => {
                    console.log("点击确定时触发");
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
.login-box{
  border: 1px solid #DCDFE6;
  width:350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}
  .login-title{
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
