<template>
    <div>
        <div style="float: left;margin-right: 20px;margin-bottom: 5px">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="0" @click="sendActiveIndex('0')">全部</el-menu-item>
                <el-menu-item index="1" @click="sendActiveIndex('1')">未开发票查询</el-menu-item>
                <el-menu-item index="2" @click="sendActiveIndex('2')">已开发票查询</el-menu-item>
                <el-menu-item index="3">
                    <el-input @keyup.enter.native="search" v-model="searchword" placeholder="客户查询"></el-input>
                </el-menu-item>
            </el-menu>
        </div>
        <div style="float: right; margin-right: 20px; margin-bottom: 5px; margin-top: 20px">
            <el-button id="updatemessagebutton" :plain="true" @click="open" v-show="false">打开消息提示</el-button>
            <el-button id="updatenowbutton" type="info" @click="update" :loading="isupdatebutton">{{updatemessage}}</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'MenuBar',
        data() {
            return {
                activeIndex: '0',
                searchword: "",
                isupdatesuccess: true,
                isupdatebutton: false,
                updatemessage: '立即同步'
            }
        },
        computed: {},
        methods: {
            open(){
                if(this.isupdatesuccess == true){
                    this.$message({
                        type: 'success',
                        duration: 0,
                        message: '同步成功，可随时刷新',
                        showClose: true
                    });
                }else{
                    this.$message({
                        type: 'error',
                        duration: 0,
                        message: '同步失败，请检查网络连接后重试',
                        showClose: true
                    });
                }
                this.updatemessage = '立即同步'
                this.isupdatebutton = false;
            },
            sendActiveIndex(val) {
                this.activeIndex = val
                this.$emit("activeIndex", this.activeIndex)
            },
            search() {
                console.log(this.searchword)
                this.$emit("search", this.searchword)
            },
            update(){
                this.$message.info("正在同步，请耐心等待，请勿关闭程序");
                this.updatemessage = "同步中";
                this.isupdatebutton = true;
                this.$axios.get("http://localhost:8080/demotest/message/update.do")
                // this.$axios.get("http://localhost:8080/message/update.do")
                    .then(res => {
                        this.isupdatesuccess = true;
                        document.getElementById("updatemessagebutton").click();
                    }).catch(error => {
                        this.isupdatesuccess = false
                        document.getElementById("updatemessagebutton").click();
                    })
            }
        }
    }

</script>

<style scoped>
    .logo {
        height: 50px;
        width: 50px;
        vertical-align: middle;
        margin-right: 20px;
    }

    .el-col {
        text-align: left;
        vertical-align: middle;
        display: inline-block;
    }

    .title {
        margin-left: 20px;
        margin-right: 20px;
        color: #000000;
    }

    .font_title {
        margin-left: 20px;
        margin-right: 20px;
        color: #000000;
        font-family: "Hiragino Sans GB";
        font-size: 18px;
        font-style: normal;
    }

    .userinfo {
        float: right;
    }
</style>
