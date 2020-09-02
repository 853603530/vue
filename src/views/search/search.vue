<template>
    <el-container>
        <el-header>
            <div style="margin-top: 15px;">
                <el-input placeholder="搜索工具" v-model="keyword" style="width: 50%;" @keyup.enter.native="search">
                    <template slot="prepend" ><a @click="index" style="cursor:pointer">AISANSI</a></template>
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
            <template v-for="obj in arrays">
                <el-row :gutter="20" :key="obj.id">
                    <el-col :span="5"><div class="grid-content bg-purple"></div></el-col>
                    <el-col :span="12">
                        <div style="margin-bottom: 20px;float: left;width: 100%" class="js-box">
                            <div style="float: left;width: 50%">
                                <h2>{{obj.title}}</h2>
                                <p>
                                    {{obj.description}}
                                </p>
                                <a @click="upage(obj.userid)" tarrget="_blank" style="cursor:pointer"><i class="el-icon-user-solid"></i><span>{{obj.username}}</span></a>
                                <a><span> | 发布时间:</span><span>{{obj.createTime}}</span></a>
                            </div>
                            <div style="margin-top: 20px;margin-left: 150px;float: left">
                                <a>订阅：</a>
                                <el-switch
                                        v-model="obj.subscribe"
                                        :active-value="1" :inactive-value="0"
                                        active-color="#13ce66"
                                        inactive-color="rgb(192 196 204)">
                                </el-switch>
                            </div>
                            <div style="margin-top: 60px;margin-left: 150px;float: left" v-if="obj.subscribe===1">
                                <a>启用：</a>
                                <el-switch
                                        v-model="obj.status"
                                        :active-value="1" :inactive-value="0"
                                        active-color="#13ce66"
                                        inactive-color="rgb(192 196 204)">
                                </el-switch>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </template>
        </el-main>
        <el-footer>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total" @current-change="handleCurrentChange">
            </el-pagination>
        </el-footer>
    </el-container>
</template>

<script>
    import mainFunction from '../../utils/plug-service';
    export default {
        data () {
            return {
                keyword: '',
                username:'',
                showRegisterLogin : true,
                showUserInfo:false,
                cur_page:1,
                arrays:[],
                total: 0,
                userlevel:1,
            };
        },
        mounted() {
            this.keyword=this.$route.params.q==undefined?this.$route.query.q:this.$route.params.q;
            this.$api.service.userInfo().then((response)=>{
                if(response.data.status==1){
                    this.showRegisterLogin=false;
                    this.username=response.data.data.username;
                    this.userlevel=response.data.data.userlevel;
                }else{
                    this.showRegisterLogin=true;
                }
                return Promise.reject(response);
            }).then(function () {
                if(this.keyword==''){
                    this.$router.push("/") // 跳转到首页
                }
                this.$api.service.tool_box(
                    this.keyword,
                    this.cur_page,
                    10,
                ).then((response)=>{
                    if(response.data.status==1){
                        this.arrays=response.data.data;
                        if(response.data.data.length==0){
                            this.$message({
                                message: '抱歉未搜到相关工具！您可以填写提交相关网站想要开发的工具，我们会尽快回复您是否可行',
                                type: 'warning'
                            });
                        }
                    }
                }).catch(()=>{
                    this.$api.service.tool_box_free(
                        this.keyword,
                        this.cur_page,
                        10,
                    ).then((response)=>{
                        if(response.data.status==1){
                            this.arrays=response.data.data;
                            if(response.data.data.length==0){
                                this.$message({
                                    message: '抱歉未搜到相关工具！您可以填写提交相关网站想要开发的工具，我们会尽快回复您是否可行',
                                    type: 'warning'
                                });
                            }
                        }
                    }).catch((error)=>{
                        this.$message({
                            message: error,
                            type: 'warning'
                        });
                    })
                })
            }).catch(()=>{

                if(this.keyword==''){
                    this.$router.push("/") // 跳转到首页
                }
                this.$api.service.tool_box(
                    this.keyword,
                    this.cur_page,
                    10,
                ).then((response)=>{
                    if(response.data.status==1){
                        this.arrays=response.data.data;
                        if(response.data.data.length==0){
                            this.$message({
                                message: '抱歉未搜到相关工具！您可以填写提交相关网站想要开发的工具，我们会尽快回复您是否可行',
                                type: 'warning',
                                duration:5000
                            });
                        }
                    }
                }).catch(()=>{
                    this.$api.service.tool_box_free(
                        this.keyword,
                        this.cur_page,
                        10,
                    ).then((response)=>{
                        if(response.data.status==1){
                            this.arrays=response.data.data;
                        }
                    }).catch((error)=>{
                        this.showRegisterLogin=true;
                        this.$message({
                            message: error,
                            type: 'warning'
                        });
                    })
                })
            })
        },
        methods: {
            upage(userid){
                this.$router.push('/upage/'+userid) // 跳转到搜索页面
            },
            handleCurrentChange(val){
                this.cur_page=val;
                this.search ()
            },
            search () {
                if(this.keyword==''){
                    this.$router.push("/") // 跳转到首页
                }
                this.$api.service.tool_box(
                    this.keyword,
                    this.cur_page,
                    10,
                ).then((response)=>{
                    if(response.data.status==1){
                        this.total=response.data.total;
                        this.arrays=response.data.data;
                        if(response.data.data.length==0){
                            this.$message({
                                message: '抱歉未搜到相关工具！您可以填写提交相关网站想要开发的工具，我们会尽快回复您是否可行',
                                type: 'warning',
                                duration:8000
                            });
                        }
                    }
                }).catch(()=>{
                    this.$api.service.tool_box_free(
                        this.keyword,
                        this.cur_page,
                        10,
                    ).then((response)=>{
                        if(response.data.status==1){
                            this.total=response.data.total;
                            this.arrays=response.data.data;
                        }
                    }).catch((error)=>{
                        this.$message({
                            message: error,
                            type: 'warning'
                        });
                    })
                })
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
                this.$router.push("/register?q=jquery") // 跳转到注册
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
    .el-footer{
        margin: auto;
    }
    .el-main{
        margin-top: 20px;
        border-top: 2px solid #DCDFE6;
        border-top-color: white;
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
    .js-box{
        height: 150px;
        margin-bottom: 200px;
        border-bottom: 2px solid #DCDFE6;
        border-bottom-color-color: white;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>