<template>
  <div class="mine">
    <div class="mine-bg">
      <div class="bg-flower"></div>
      <span class="fr logout" @click="login">{{userInfo.loginText}}</span>
    </div>
    <div class="mine-box">
      <div class="mine-boxing">
        <div class="user-boxing">
          <div class="user-logo">
            <!-- <img class="auto-img" src="" alt=""> -->
          </div>
          <div class="username">{{userInfo.username}}</div>
        </div>
        <div class="user-box">
          <div></div>
          <!-- 头像 -->
          <div class="user-avatar"></div>
        </div>

        <div class="item">
          <van-grid :column-num="column">
            <van-grid-item icon="coupon-o" text="电影票" />
            <van-grid-item @click="viewLikeMovie" icon="like-o" text="我的收藏" />
          </van-grid>
        </div>

        <div>
          <van-cell title="个人信息" icon="contact">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon slot="right-icon" name="arrow" style="line-height: inherit;" />
          </van-cell>
          <van-cell title="设置" icon="setting-o">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <van-icon slot="right-icon" name="arrow" style="line-height: inherit;" />
          </van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("mineModule");

export default {
  name: "mine",

  data() {
    return {
      column: 2
    };
  },

  computed: {
    ...mapState(["userInfo"])
  },

  methods: {
    //退出或者登录
    login() {
      let userStatus = localStorage.getItem("user");

      if (userStatus) {
        let userInfo = JSON.parse(userStatus);

        if (userInfo.isLogin) {
          localStorage.removeItem("user");

          this.$store.commit("mineModule/changeUserInfo", {
            loginText: "登录",
            username: ""
          });
        } else {
          this.$router.push({ name: "login" });
        }
      } else {
        this.$router.push({ name: "login" });
      }
    },

    //查看我的收藏电影
    viewLikeMovie() {
      //验证是否登录
      let userStatus = localStorage.getItem("user");

      if (userStatus) {
        let userInfo = JSON.parse(userStatus);

        //如果登录
        if (userInfo.isLogin) {
          this.$router.push({ name: "likeMovie" });
        } else {
          //如果未登录
          this.$toast("请先登录");
        }
      } else {
        //未登录
        this.$toast("请先登录");
      }
    }
  },

  created() {
    //获取用户信息
    let userStatus = localStorage.getItem("user");

    if (userStatus) {
      let user = JSON.parse(userStatus);

      if (user.isLogin) {
        this.$store.commit("mineModule/changeUserInfo", {
          loginText: "退出",
          username: user.username
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.mine {
  .logout {
    color: #fff;
    font-size: 14px;
    margin-right: 20px;
    margin-top: 20px;
  }
  .item {
    color: #666;
  }
  .mine-bg {
    height: 150px;
    background-color: #eb48ad;
    position: relative;
    .bg-flower {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 120px;
      height: 120px;
      // background: url("../../assets/images/fire.png") no-repeat center center;
      background-size: 120px 120px;
    }
  }
  .mine-box {
    background-color: #fff;
    .mine-boxing {
      border-top: 5px solid #fff;
      position: relative;
    }
    .user-boxing {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 80px;
      background-color: #fff;
      z-index: 2;
      .user-logo {
        position: absolute;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        left: 40px;
        top: -40px;
        background-image: url("../../assets/images/96dda144ad345982baf7b0ed0af431adcbef844b.jpg");
        background-size: cover; 
        overflow: hidden;
      }
    }
    .user-box {
      height: 80px;
      background-color: #ccc;
      position: relative;
      z-index: 1;
      .user-avatar {
        position: absolute;
        left: 40px;
        top: -40px;
        width: 80px;
        height: 80px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0px 0px 0px 5px #fff;
      }
    }
  }
  .username {
    margin-left: 150px;
    font-size: 18px;
    color: #ff9700;
    padding: 10px 0;
  }
}
</style>