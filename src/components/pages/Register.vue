<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username = ''"
        :error-message="usernameErrorMsg"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button
          type="primary"
          size="large"
          :loading="openLoading"
          @click="registerAction"
        >马上注册</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Toast } from "vant";
import url from "@/serverConfig";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false, // 是否开启用户注册的loading状态
      usernameErrorMsg: "", // 当用户名出现错误的时候
      passwordErrorMsg: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1); // 返回前一页
    },
    axiosRegisterUser() {
      this.openLoading = true;
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.username,
          passWord: this.password
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            Toast.success(res.data.message);
            this.$router.push("/");
          } else {
            this.openLoading = false;
            Toast.fail("注册失败");
          }
        })
        .catch(error => {
          Toast.fail("注册失败");
          this.openLoading = false;
        });
    },
    // 表单验证
    checkForm() {
      let isOk = true;
      if (this.username.length < 1) {
        this.usernameErrorMsg = "用户名不能少于2位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    },
    registerAction() {
      this.checkForm() && this.axiosRegisterUser();
      // checkForm方法为true时才执行axiosRegisterUser()方法
    }
  }
};
</script>
<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>