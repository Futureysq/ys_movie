<template>
  <div class="register">
    <div class="logo-box">
      <div class="logo"></div>
    </div>
    <div class="list">
      <van-cell-group>
        <van-field
          v-model="user.value"
          type="text"
          label="用户名"
          placeholder="请输入用户名"
          :error-message="user.errorMessage"
          @input="validPa(user.value, 'validUsername', {key: 'user', errorMessage: '用户名支持4-8个(字母数字_)组合，必须字母开头'})"
        />
        <van-field
          v-model="passw1.value"
          label="密码"
          :type="passw1.type"
          placeholder="请输入密码"
          :error-message="passw1.errorMessage"
          :right-icon="passw1.icon"
          @click-right-icon="changeEye('passw1')"
          @input="validPa(passw1.value,'validPwd',{key: 'passw1',errorMessage: '密码支持6-16个(字母数字_)组合，必须含有大小写字母'})"
        />
        <van-field
          v-model="passw2.value"
          label="确认密码"
          :type="passw2.type"
          placeholder="请输入确认密码"
          :error-message="passw2.errorMessage"
          :right-icon="passw2.icon"
          @click-right-icon="changeEye('passw2')"
          @input="validEqual(passw1.value,passw2.value)"
        />
      </van-cell-group>
      <van-button
        class="rgister-c-fz"
        block
        :loading="isLoading"
        @click="register"
        :disabled="!isValid"
        type="info"
        loading-text="注册中..."
        text="注册"
      />
      <div class="footer">
        <router-link class="login-text" to="login">已有账号？登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { validForm } from "../tool/validForm";

import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations } = createNamespacedHelpers("registerModule");

export default {
  name: "register",

  //计算属性
  computed: {
    ...mapState(["passw1", "passw2", "isLoading", "isValid", "user"])
  },

  methods: {
    ...mapMutations(["changeEye"]),
    register() {
      let self = this;
      //注册
      this.$store.commit("registerModule/register", true);
      let randomTime = Math.random() * 5 * 1000;

      setTimeout(function() {
        //获取所有用户信息
        let users = localStorage.getItem("users");

        users = users ? JSON.parse(users) : [];

        // console.log("users ==> ", users);

        //判断当前用户是否存在
        for (let i = 0; i < users.length; i++) {
          if (users[i].username == self.user.value) {
            self.$toast({
              duration: 2000,
              message: "该用户已存在"
            });
            self.$store.commit("registerModule/register", false);
            return;
          }
        }

        self.$toast({
          duration: 2000,
          message: "注册成功"
        });

        self.$store.commit("registerModule/register", false);

        let time = new Date().getTime();

        //记录用户信息
        let userInformation = {
          //用户名
          username: self.user.value,

          //密码
          pwd: self.passw1.value,

          //注册时间
          time
        };

        //将当前用户信息推进users
        users.push(userInformation);

        //写入本地存储，模拟数据库
        localStorage.setItem("users", JSON.stringify(users));
      }, randomTime);
    },

    //输入验证表单

    //验证用户名
    validUsername(value) {
      // console.log("value ==> ", value);

      let isValid = validForm.validUsername(value);

      this.$store.commit("registerModule/validUsername", isValid);
    },

    //验证密码
    validPwd(value) {
      let isValid = validForm.validPwd(value);

      this.$store.commit("registerModule/validPwd", isValid);
    },

    //验证两值相等
    validEqual(v1, v2) {

      let isValid = validForm.validEqual(v1, v2);

      this.$store.commit("registerModule/validEqual", isValid);

      this.$store.commit("registerModule/passForm");
    },

    //验证用户名或者密码
    validPa(value, fnName, o) {
      let isValid = validForm[fnName](value);

      // console.log("isValid ==> ", isValid);

      o.isValid = isValid;

      this.$store.commit("registerModule/validPa", o);

      this.$store.commit("registerModule/passForm");
    }
  }
};
</script>

<style lang="less" scoped>
.logo-box {
  height: 200px;
  position: relative;
  background: url("../assets/images/register_bg.png");
  background-size: cover;
  .logo {
    width: 100px;
    height: 100px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background-color: antiquewhite;
    border-radius: 50%;
  }
}
.list {
  padding: 10px;
}
.footer {
  margin-top: 20px;
  color: #ddd;
}
.rgister-c-fz {
  font-size: 18px;
}
.login-text {
  color: #666;
}
</style>