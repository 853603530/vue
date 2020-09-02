<template>
    <el-container>
        <el-header>
            <h1 @click="index" style="cursor:pointer">AISANSI</h1>
        </el-header>
        <el-main>
            <div class="login-box">
                <h3 class="login-title">注册</h3>
                <el-form :model="formRegister" :rules="rules" ref="formRegister" label-width="80px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="formRegister.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="email" label="邮箱" :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]"><el-input v-model="formRegister.email"></el-input>
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
                formRegister: {
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
                    ]
                }
            };
        },

        methods: {
            register (formRegister) {
                this.$refs[formRegister].validate((valid) => {
                    if (valid) {
                        // this.$message({
                        //     message: '还未开放',
                        //     showClose: true,
                        // });

                        this.$api.service.register(
                            this.formRegister.username,this.formRegister.password,this.formRegister.email
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
