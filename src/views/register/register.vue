<template>
    <el-container>
        <el-header>
            <h1 @click="index" style="cursor:pointer">AISANSI</h1>
        </el-header>
        <el-main>
            <div class="register-box">
                <h3 class="login-title">注册</h3>
                <el-form :model="formRegister" :rules="rules" ref="formRegister" label-width="80px">
                    <el-form-item label="类型">
                        <el-radio-group v-model="formRegister.userType" size="mini">
                            <el-radio-button label="普通用户"></el-radio-button>
                            <el-radio-button label="开发者"></el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="formRegister.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="email" label="邮箱" >
                        <el-input v-model="formRegister.email"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱验证"  prop="yzm">
                        <el-input placeholder="请输入内容" v-model="formRegister.yzm">
                            <template slot="append" style="cursor:pointer"><a @click="getCode" style="cursor:pointer">获取验证码{{formRegister.timer==0?'':('('+formRegister.timer+')')}}</a></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码"  prop="password">
                        <el-input v-model="formRegister.password"></el-input>
                    </el-form-item>

                </el-form>
                <el-button style="width: 270px;margin-left: 80px;" @click="register('formRegister')">创建账号</el-button>
                <el-link style="width: 270px;margin-left: 80px;margin-top: 20px" href="#/login" target="_blank">直接登录</el-link>
            </div>
        </el-main>
    </el-container>
</template>
<style>
    body{
        background-color: #f7f7f7;
    }
    .login-title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #303133;
    }
    .register-box {
        border: 1px solid #DCDFE6;
        width: 350px;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px #909399;
    }
    .el-header{
        background-color: #f7f7f7;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-main {
        background-color: #f7f7f7;
        color: #333;
    }
    body > .el-container {
        margin-bottom: 40px;
        height: 500px;
    }
</style>
<script>
    import mainFunction from '../../utils/plug-service';
    export default {
        data () {
            var emailField = (rule, value, callback) => {
                this.$api.service.check_email(value).then( v=> {
                    if(v.data.status==1)
                        if (v.data.data) {
                            callback(new Error('邮箱已被注册'));
                        } else {
                            callback();
                        }
                })
            };
            return {
                formRegister: {
                    timer:0,
                    yzm:'',
                    userType:'普通用户',
                    username: '',
                    password: '',
                    email:''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                    ],
                    email:[
                        { validator: emailField, trigger: 'blur' },
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]
                },
            };

        },

        methods: {
            getCode(){
                var that = this;
                if(that.formRegister.timer!=0){
                    this.$message({
                        message: '稍后获取',
                        type: 'warning'
                    });
                    return ;
                }
                that.formRegister.timer=60;
                let d=setInterval(function () {
                    if(that.formRegister.timer==1)clearInterval(d);
                    that.formRegister.timer--;
                },1000)
                this.$api.service.check_code(this.formRegister.email).then(value => {
                    if(value.data.status==1){
                        this.$message({
                            message: '已发送',
                            type: 'success'
                        });
                    }
                })
            },
            checkEmail(){
              this.$api.service.check_email(this.formRegister.email).then(value => {
                  if(value.data.status==1){
                      return value.data.data;
                  }
              })
            },
            register (formRegister) {
                this.$refs[formRegister].validate((valid) => {
                    if (valid) {
                        // this.$message({
                        //     message: '还未开放',
                        //     showClose: true,
                        // });
                        this.$api.service.register(
                            this.formRegister.username,this.formRegister.password,this.formRegister.email,this.formRegister.yzm,this.formRegister.userType
                        ).then((response)=>{
                            if(response.data.status==1){
                                this.$message({
                                    message: response.data.msg,
                                    type: 'success'
                                });
                                this.$router.push("/login") // 跳转到首页
                            }else if(response.data.status==0){
                                this.$message({
                                    message: response.data.msg,
                                    type: 'warning'
                                });
                            }
                        }).catch((error)=>{
                            this.$message({
                                message: error,
                                type: 'warning'
                            });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            index() {
                this.$router.push("/") // 跳转到首页
            },
            setStorage() {
                mainFunction.setStorage();
            },
            getStorage() {
                mainFunction.getStorage();
            }

        }
    };
</script>
