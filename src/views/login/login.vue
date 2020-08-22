<template>
    <div>
        <input type="text" v-model="loginForm.username" placeholder="用户名"/>
        <input type="text" v-model="loginForm.password" placeholder="密码"/>
        <button @click="login">登录</button>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex';
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
            ...mapMutations(['changeLogin']),
            login () {
                let _this = this;
                if (this.loginForm.username === '' || this.loginForm.password === '') {
                    alert('账号或密码不能为空');
                } else {
                    this.$api.abc.abc(
                        _this.loginForm.username,_this.loginForm.password
                    ).then((response)=>{
                        this.$Message.success(response.data.msg);
                        localStorage.setItem('TOKEN', JSON.stringify(response.data.results.TOKEN)); // 设置TOKEN
                        this.$router.push("/") // 跳转到首页
                    }).catch((error)=>{
                        this.$Message.error(error.response.data.msg);
                    })
                }
            }
        }
    };
</script>
