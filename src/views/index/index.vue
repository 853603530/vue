<template>
    <el-container>
        <el-header>
            <div style="margin-top: 15px;">
                <el-input placeholder="搜索工具" v-model="keyword" style="width: 50%;" @keyup.enter.native="search">
                    <template slot="prepend"><a @click="index" style="cursor:pointer">AISANSI</a></template>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
                <el-button-group style="margin-left: 100px;" v-if="showRegisterLogin">
                    <el-button @click="register">注册</el-button>
                    <el-button @click="login">登录</el-button>
                </el-button-group>
                <el-button-group style="margin-left: 200px;" v-else>
                    <el-avatar :size="50" style="background-color: #9fd8d8"><a @mouseenter="enter" @mouseleave="leave" >{{userlevel===1?'user':'开发者'}}</a></el-avatar>
                    <transition name="fade">
                        <div class="tl" v-show="showUserInfo" @mouseenter="enter" @mouseleave="leave" transiton="fade">
                            <div>
                                <el-link href="#/home" tarrget="_blank" v-text="username">未知</el-link>
                                <el-button style="margin-left: 10px;" size="mini" @click="logout">退出</el-button>
                            </div>
                        </div>
                    </transition>

                </el-button-group>
            </div>
        </el-header>
        <el-main>
            <div class="details-box">
                <div>
                    <h1 style="font-size: 500%">
                        打造惊人的东西
                    </h1>
                </div>
                <div>
                    AISANSI是PC端针对于浏览器的工具箱,您在上面可以找到自己相关网站的工具！
                </div>
                <div>
                    <h1>
                        开发者
                    </h1>
                </div>
                <div>
                    开发者可以使用JavaScript开发相关网站工具
                </div>
            </div>
        </el-main>
<!--        <el-footer>Footer</el-footer>-->
    </el-container>
</template>

<script>
    import mainFunction from '../../utils/plug-service';
    export default {
        data () {
            return {
                keyword: '',
                username:'',
                userlevel:1,
                showRegisterLogin : true,
                showUserInfo:false
            };
        },
        mounted() {
            this.$api.service.userInfo().then((response)=>{
                if(response.data.status==1){
                    this.showRegisterLogin=false;
                    this.username=response.data.data.username;
                    this.userlevel=response.data.data.userlevel;
                }else{
                    this.showRegisterLogin=true;
                }
            }).catch(()=>{
                this.showRegisterLogin=true;
            })
        },
        methods: {
            search () {
                if(this.keyword!=''){
                    this.$router.push({
                        name: 'search',
                        params:{
                            q:this.keyword,
                        }
                    }) // 跳转到搜索页面
                }
            },
            index() {
                this.$router.push("/") // 跳转到首页
            },
            enter () {
                this.showUserInfo=true;
            },
            leave () {
                this.showUserInfo=false
            },
            logout () {
                localStorage.removeItem('Authorization');
                localStorage.removeItem('userInfo');
                this.showRegisterLogin=true;
                this.$message({
                    message: '退出成功！',
                    type: 'success'
                });
               if( this.$route.path!="/index"){
                    this.$router.push("/index") // 跳转到注册
                }
            },
            register () {
                this.$router.push("/register") // 跳转到注册
            },
            login () {
                this.$router.push("/login") // 跳转到登录
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

<style scoped>
    .el-main{
        margin-top: 20px;
    }
    .details-box {
        text-align: center;
        margin-top: 200px;
    }
    .tl {
        width: 240px;
        height: 80px;
        position: absolute;/*这里一定要设置*/
        z-index: 999999;/*这里是该元素与显示屏的距离，据说越大越好，但是我也没有看到效果，因为没有它也是可以的*/
        background-color: white;
        margin-left: -100px;
        box-shadow: 0 0 25px #909399;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>