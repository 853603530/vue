<template>
    <el-container>
        <el-header>
            <div style="margin-top: 15px;">
                <el-input placeholder="搜索工具" v-model="keyword" style="width: 50%;" @keyup.enter.native="search">
                    <template slot="prepend" ><a @click="index" style="cursor:pointer">AISANSI</a></template>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
                <el-button type="primary" icon="el-icon-plus" style="margin-left: 100px;" v-if="this.userlevel===1?false:true">创建工具</el-button>
                <el-button-group style="margin-left: 100px;" v-if="showRegisterLogin">
                    <el-button @click="register">注册</el-button>
                    <el-button @click="login">登录</el-button>
                </el-button-group>
                <el-button-group style="margin-left: 100px;margin-top: 10px" v-else>
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
        <el-container>
            <el-aside>
                <el-row>
                    <el-col :span="24">
                        <div style="float: left">
                            <el-avatar :size="60" style="margin-top: 20px;margin-left: 20px"> 开发者 </el-avatar>
                        </div>
                        <div style="margin-top: 30px;margin-left: 100px">
                            <span>{{developer_username}}</span>
                        </div>
                        <div style="margin-top: 10px;margin-left: 100px">
                            <span style="font-size:12px">入驻时间：{{inserttime}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div style="margin-left: 30px;text-align:center">
                            <span style="font-size:14px">{{box_count}}</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div style="margin-left: 30px;text-align:center">
                            <span style="font-size:14px">{{subscribe_count}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div style="margin-left: 30px;text-align:center">
                            <span style="font-size:12px">工具</span>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div style="margin-left: 30px;text-align:center">
                            <span style="font-size:12px">订阅</span>
                        </div>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <template v-for="obj in arrays">
                    <el-row :gutter="20" :key="obj.id">
                        <el-col :span="2"><div class="grid-content bg-purple"></div></el-col>
                        <el-col :span="13">
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
                                    <el-switch @change="subscribe(obj.id,$event)"
                                            v-model="obj.subscribe"
                                            :active-value="1" :inactive-value="0"
                                            active-color="#13ce66"
                                            inactive-color="rgb(192 196 204)">
                                    </el-switch>
                                </div>
                                <div style="margin-top: 60px;margin-left: 150px;float: left" v-if="obj.subscribe===1">
                                    <a>启用：</a>
                                    <el-switch @change="use_box(obj.id,$event)"
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
        </el-container>
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
                developer_username:'',
                inserttime:'',
                box_count:'',
                subscribe_count:'',
                userlevel:1,
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
                this.$api.service.developer_box(this.$route.params.userid,response.data.data.userid,this.cur_page,10).then((response)=>{
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
            }).catch(()=>{
                this.$api.service.developer_box(this.$route.params.userid,null,this.cur_page,10).then((response)=>{
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
            this.$api.service.developer_info(this.$route.params.userid).then(response=>{
                this.developer_username=response.data.data.username
                this.inserttime=response.data.data.inserttime
                this.box_count=response.data.data.box_count
                this.subscribe_count=response.data.data.subscribe_count
            }).catch((error)=>{
                console.log(error)
            })
        },
        methods: {
            use_box(box_id,subscribe_id){
                if(subscribe_id==1){
                    this.$api.service.box_enable(box_id,subscribe_id).then((response)=>{
                        this.$message({
                            message: response.data.msg,
                            type: 'success'
                        });
                    }).catch((error)=>{
                        this.$message({
                            message: 'error' in error ?'登录后启用':error,
                            type: 'error'
                        });
                    })
                }
                if(subscribe_id==0){
                    this.$api.service.box_disabled(box_id,subscribe_id).then((response)=>{
                        this.$message({
                            message: response.data.msg,
                            type: 'success'
                        });
                    }).catch((error)=>{
                        this.$message({
                            message: 'error' in error ?'登录后启用':error,
                            type: 'error'
                        });
                    })
                }

            },
            subscribe(box_id,subscribe_id){
                if(subscribe_id==1){
                    this.$api.service.subscribe_add(box_id,subscribe_id).then((response)=>{
                        this.$message({
                            message: response.data.msg,
                            type: 'success'
                        });
                    }).catch((error)=>{
                        this.$message({
                            message: 'error' in error ?'登录后订阅':error,
                            type: 'error'
                        });
                    })
                }
                if(subscribe_id==0){
                    this.$api.service.subscribe_del(box_id,subscribe_id).then((response)=>{
                        this.$message({
                            message: response.data.msg,
                            type: 'success'
                        });
                    }).catch((error)=>{
                        this.$message({
                            message: 'error' in error ?'登录后订阅':error,
                            type: 'error'
                        });
                    })
                }

            },
            handleCurrentChange(val){
                this.cur_page=val;
                this.search ()
            },
            upage(userid){
                this.$router.push('/upage/'+userid) // 跳转到搜索页面
            },
            search () {
                if(this.keyword!=''){
                    let search = this.$router.resolve({
                        name: 'search',
                        query:{
                            q:this.keyword,
                        }
                    }) // 跳转到搜索页面
                    window.open(search.href, '_blank');
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
                this.removeStorage({action:'removeLocalStorage',key:'Authorization'})
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
            removeStorage(data) {
                mainFunction.removeStorage(data);
            },
            setStorage(data) {
                mainFunction.setStorage(data);
            },
            getStorage(data) {
                mainFunction.getStorage(data);
            }

        }
    };
</script>

<style scoped>
    .el-footer{
        margin: auto;
    }
    .el-aside{
        width: 240px;
        height: 200px;
        margin-top: 20px;
        border: 2px solid white;
        box-shadow: 0 0 25px #909399;
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