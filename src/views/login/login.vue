<template>
    <el-container>
        <el-header>
            <h1 @click="index" style="cursor:pointer">AISANSI</h1>
        </el-header>
        <el-main>
            <div class="login-box">
                <h3 class="login-title">欢迎登录</h3>
                <el-input style="margin-bottom: 20px;" v-model="loginForm.username" placeholder="请输入内容"></el-input>
                <el-input style="margin-bottom: 20px;" placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
                <el-button style="width: 350px" @click="login">登录</el-button>
                <el-link style="width: 350px;margin-top: 20px;" href="#/register" tarrget="_blank">创建账号</el-link>
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
    .login-box {
        border: 1px solid #DCDFE6;
        width: 350px;
        height: 400px;
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
            return {
                loginForm: {
                    username: '',
                    password: ''
                }
            };
        },

        methods: {
            login () {
                let _this = this;
                if (this.loginForm.username === '' || this.loginForm.password === '') {
                    this.$message({
                        message: '账号或密码不能为空',
                        type: 'warning'
                    });
                } else {
                    this.$api.service.login(
                        _this.loginForm.username,_this.loginForm.password
                    ).then((response)=>{
                        if(response.data.status==1){
                            localStorage.setItem('Authorization', response.data.data.token_type+' '+response.data.data.access_token); // 设置TOKEN
                            this.$router.push("/home") // 跳转到首页
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
                }
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
