<template>
    <el-container>
        <el-header>
            <div style="margin-top: 15px;">
                <el-input placeholder="搜索工具" v-model="keyword" style="width: 50%;" @keyup.enter.native="search">
                    <template slot="prepend" ><a @click="index" style="cursor:pointer">AISANSI</a></template>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
                <el-button type="primary" icon="el-icon-plus"  @click="createTool" style="margin-left: 100px;" v-if="this.userlevel===1?false:true">创建工具</el-button>
                <el-drawer
                        title="我是标题"
                        :with-header="false"
                        :before-close="handleClose"
                        :visible.sync="dialog"
                        direction="ltr"
                        custom-class="demo-drawer"
                        ref="drawer"
                >
                    <div class="demo-drawer__content" style="margin-top: 20px;">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                            <el-form-item label="工具名称" prop="name">
                                <el-input v-model="ruleForm.name" placeholder="简要描述工具功能，方便用户搜索" style="width: 98%"></el-input>
                            </el-form-item>
                            <el-form-item label="工具描述" prop="desc">
                                <el-input type="textarea" v-model="ruleForm.desc" style="width: 98%;"></el-input>
                            </el-form-item>
                            <el-form-item label="作用域"  prop="domain">
                                <el-button-group style="width: 98%;">
                                    <el-input placeholder="域名" v-model="ruleForm.domain" class="input-with-select" >
                                        <el-select  v-model="ruleForm.domain_hz" slot="append" placeholder="请选择" style="width: 100px" filterable>
                                            <el-option label=".com" value=".com"></el-option>
                                            <el-option label=".cn" value=".cn"></el-option>
                                            <el-option label=".top" value=".top"></el-option>
                                            <el-option label=".ltd" value=".ltd"></el-option>
                                            <el-option label=".net" value=".net"></el-option>
                                            <el-option label=".tech" value=".tech"></el-option>
                                            <el-option label=".shop" value=".shop"></el-option>
                                            <el-option label=".xyz" value=".xyz"></el-option>
                                            <el-option label=".wang" value=".wang"></el-option>
                                            <el-option label=".cloud" value=".cloud"></el-option>
                                            <el-option label=".online" value=".online"></el-option>
                                            <el-option label=".网址" value=".网址"></el-option>
                                            <el-option label=".我爱你" value=".我爱你"></el-option>
                                            <el-option label=".在线" value=".在线"></el-option>
                                            <el-option label=".餐厅" value=".餐厅"></el-option>
                                            <el-option label=".site" value=".site"></el-option>
                                            <el-option label=".love" value=".love"></el-option>
                                            <el-option label=".art" value=".art"></el-option>
                                            <el-option label=".xin" value=".xin"></el-option>
                                            <el-option label=".store" value=".store"></el-option>
                                            <el-option label=".fun" value=".fun"></el-option>
                                            <el-option label=".club" value=".club"></el-option>
                                            <el-option label=".cc" value=".cc"></el-option>
                                            <el-option label=".website" value=".website"></el-option>
                                            <el-option label=".press" value=".press"></el-option>
                                            <el-option label=".space" value=".space"></el-option>
                                            <el-option label=".beer" value=".beer"></el-option>
                                            <el-option label=".luxe" value=".luxe"></el-option>
                                            <el-option label=".video" value=".video"></el-option>
                                            <el-option label=".ren" value=".ren"></el-option>
                                            <el-option label=".group" value=".group"></el-option>
                                            <el-option label=".fit" value=".fit"></el-option>
                                            <el-option label=".yoga" value=".yoga"></el-option>
                                            <el-option label=".com.cn" value=".com.cn"></el-option>
                                            <el-option label=".net.cn" value=".net.cn"></el-option>
                                            <el-option label=".org.cn" value=".org.cn"></el-option>
                                            <el-option label=".pro" value=".pro"></el-option>
                                            <el-option label=".ink" value=".ink"></el-option>
                                            <el-option label=".biz" value=".biz"></el-option>
                                            <el-option label=".info" value=".info"></el-option>
                                            <el-option label=".design" value=".design"></el-option>
                                        </el-select>
                                    </el-input>
                                </el-button-group>
                            </el-form-item>
                            <el-form-item label="上传JS">
                                <el-upload
                                        class="upload-demo"
                                        action="/api/file/upload"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        multiple
                                        :limit="3"
                                        accept=".js"
                                        :headers="headers"
                                        :on-exceed="handleExceed"
                                        :before-upload="beforeUpload">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传JS文件</div>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="上传CSS">
                                <el-upload
                                        class="upload-demo"
                                        action="/api/file/upload"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        multiple
                                        :limit="3"
                                        accept=".css"
                                        :headers="headers"
                                        :on-exceed="handleExceed"
                                        :before-upload="beforeUpload">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传CSS文件</div>
                                </el-upload>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">{{ loading ? '提交中 ...' : '立即创建' }}</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                                <el-button @click="cancelForm">取 消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-drawer>
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
        <el-main>
            <el-row v-if="resultBoolean">
                <el-col :span="24">
                    <div style="text-align: center;">
                        <h4>
                            抱歉未搜到相关工具！您可以填写提交相关网站想要开发的工具，我们会尽快回复您是否可行
                        </h4>
                    </div>
                </el-col>
            </el-row>
            <template v-for="obj in arrays" v-else>
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
                headers: {
                    Authorization: localStorage.getItem('Authorization')
                },
                dialog: false,
                loading: false,
                ruleForm: {
                    id:'',
                    name: '',
                    domain:'',
                    desc: '',
                    fileList_js:[],
                    fileList_css:[],
                    domain_hz:'.com'
                },
                rules: {
                    name: [
                        { required: true, message: '请输入工具名称', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                    ],
                    domain: [
                        { required: true, message: '请输入域名', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请详细描述一下工具', trigger: 'blur' },
                        { min: 20, max: 150, message: '长度在 20 到 150 个字符', trigger: 'blur' }
                    ]
                },
                timer: null,
                keyword: '',
                username:'',
                showRegisterLogin : true,
                showUserInfo:false,
                cur_page:1,
                arrays:[],
                total: 0,
                userlevel:1,
                fullscreenLoading: false,
                resultBoolean:true
            };
        },
        mounted() {
            this.keyword=this.$route.params.q==undefined?this.$route.query.q:this.$route.params.q;
            this.$api.service.userInfo().then((response)=>{
                if(response.data.status==1){
                    this.showRegisterLogin=false;
                    this.username=response.data.data.username;
                    this.userlevel=response.data.data.userlevel;
                    let loading= this.openFullScreen2();
                    this.$api.service.tool_box(
                        this.keyword,
                        this.cur_page,
                        10,
                    ).then((response)=>{
                        loading.close()
                        if(response.data.status==1){
                            this.arrays=response.data.data;
                            if(response.data.data.length==0){
                                this.resultBoolean=true
                                this.$message({
                                    message: '抱歉未搜到相关工具！您可以填写提交相关网站想要开发的工具，我们会尽快回复您是否可行',
                                    type: 'warning'
                                });
                            }else{
                                this.resultBoolean=false
                            }
                        }
                    }).catch(()=>{
                        let loading= this.openFullScreen2();
                        this.$api.service.tool_box_free(
                            this.keyword,
                            this.cur_page,
                            10,
                        ).then((response)=>{
                            loading.close()
                            if(response.data.status==1){
                                this.arrays=response.data.data;
                                if(response.data.data.length==0){
                                    this.resultBoolean=true
                                    this.$message({
                                        message: '抱歉未搜到相关工具！您可以填写提交相关网站想要开发的工具，我们会尽快回复您是否可行',
                                        type: 'warning'
                                    });
                                }else{
                                    this.resultBoolean=false
                                }
                            }
                        }).catch((error)=>{
                            this.$message({
                                message: error,
                                type: 'warning'
                            });
                        })
                    })
                }else{
                    this.showRegisterLogin=true;
                }
                if(this.keyword==''){
                    this.$router.push("/") // 跳转到首页
                }
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
                            this.resultBoolean=true
                            this.$message({
                                message: '抱歉未搜到相关工具！您可以填写提交相关网站想要开发的工具，我们会尽快回复您是否可行',
                                type: 'warning',
                                duration:5000
                            });
                        }else{
                            this.resultBoolean=false
                        }
                    }
                }).catch(()=>{
                    let loading= this.openFullScreen2();
                    this.$api.service.tool_box_free(
                        this.keyword,
                        this.cur_page,
                        10,
                    ).then((response)=>{
                        loading.close()
                        if(response.data.status==1){
                            this.arrays=response.data.data;
                            if(response.data.data.length==0){
                                this.resultBoolean=true
                                this.$message({
                                    message: '抱歉未搜到相关工具！您可以填写提交相关网站想要开发的工具，我们会尽快回复您是否可行',
                                    type: 'warning',
                                    duration:5000
                                });
                            }else{
                                this.resultBoolean=false
                            }
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
            updateTool(){
                this.$api.service.update_tool(this.ruleForm.id,this.ruleForm.name,this.ruleForm.domain+this.ruleForm.domain_hz,this.ruleForm.fileList_js,this.ruleForm.fileList_css,this.ruleForm.desc).then(value => {
                    if(value.data.status==1){
                        this.dialog=true
                        this.$message({
                            message: value.data.msg,
                            type: 'success'
                        });
                    }
                })
            },
            createTool(){
                this.$api.service.create_tool().then(value => {
                    if(value.data.status==1){
                        this.ruleForm.id=value.data.data
                        this.dialog=true
                    }
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs.drawer.closeDrawer()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            beforeUpload(file) {
                file.name.indexOf('.js')>-1?this.ruleForm.fileList_js.push(file.name):file.name.indexOf('.css')>-1?this.ruleForm.fileList_css.push(file.name):null;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file.name);
            },
            handleExceed(files, fileList) {
                console.log(files.name);
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleClose(done) {
                if (this.loading) {
                    return;
                }
                this.$refs['ruleForm'].validate((valid) => {
                    if (!valid) {
                        return ;
                    }else{
                        this.$confirm('确定要提交表单吗？').then(()=> {
                            this.updateTool();
                            this.loading = true;
                            this.timer = setTimeout(() => {
                                done();
                                // 动画关闭需要一定的时间
                                setTimeout(() => {
                                    this.loading = false;
                                }, 400);
                            }, 2000);
                        }).catch(() => {});
                    }
                });
            },
            cancelForm() {
                this.loading = false;
                this.dialog = false;
                clearTimeout(this.timer);
            },
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
            openFullScreen2() {
                return this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            },
            upage(userid){
                this.$router.push('/upage/'+userid) // 跳转到搜索页面
            },
            handleCurrentChange(val){
                this.cur_page=val;
                this.search ()
            },
            search () {
               let loading= this.openFullScreen2()
                if(this.keyword==''){
                    this.$router.push("/") // 跳转到首页
                }
                this.$api.service.tool_box(
                    this.keyword,
                    this.cur_page,
                    10,
                ).then((response)=>{
                    loading.close()
                    if(response.data.status==1){
                        this.total=response.data.total;
                        this.arrays=response.data.data;
                        if(response.data.data.length==0){
                            this.resultBoolean=true
                            this.$message({
                                message: '抱歉未搜到相关工具！您可以填写提交相关网站想要开发的工具，我们会尽快回复您是否可行',
                                type: 'warning',
                                duration:8000
                            });
                        }else{
                            this.resultBoolean=false
                        }
                    }
                }).catch(()=>{
                    let loading= this.openFullScreen2()
                    this.$api.service.tool_box_free(
                        this.keyword,
                        this.cur_page,
                        10,
                    ).then((response)=>{
                        loading.close()
                        if(response.data.status==1){
                            this.total=response.data.total;
                            this.arrays=response.data.data;
                            if(response.data.data.length==0){
                                this.resultBoolean=true
                                this.$message({
                                    message: '抱歉未搜到相关工具！您可以填写提交相关网站想要开发的工具，我们会尽快回复您是否可行',
                                    type: 'warning',
                                    duration:5000
                                });
                            }else{
                                this.resultBoolean=false
                            }
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