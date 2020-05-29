<template>
    <div class="index">
        <div>
            <keep-alive>
            <router-view></router-view>
            </keep-alive>
        </div>
            <van-tabbar v-model="active" active-color="#EB48AD">
        <van-tabbar-item v-for="(item,index) in tabData" :key="index" :name="item.name" :icon="item.icon" @click="togglePage({name: item.name})">{{item.title}}</van-tabbar-item>
        </van-tabbar>

    </div>
</template>

<script>

import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("indexModule");
    export default {
       name: 'index',
       data() {
           return {
                active: 'home',
           }
       },
       computed: {
           ...mapState(['tabData'])
       },
       methods: {
           togglePage(o){
               this.$router.push(o);
           }
       },
       created() {
           //纠正底部导航的标签
           this.active = this.$route.name;
       }
    }
</script>

<style lang="less" scoped>
</style>