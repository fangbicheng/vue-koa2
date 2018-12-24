<template>
  <div>
    <van-nav-bar
      title="用户登录"
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
        :error-message="passwordErrorMsg"
        required
      />
      <div class="register-button">
        <van-button
          type="primary"
          @click="LoginAction"
          :loading="openLoading"
          size="large"
        >登录</van-button>
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
      openLoading: false, //是否开启用户的Loading
      usernameErrorMsg: "", //当用户名出现错误的时候
      passwordErrorMsg: "" //当密码出现错误的时候
    };
  },
  created() {
    // 判断是否存在localStorage
    if (localStorage.userInfo) {
      Toast.success("您已经登录成功");
      this.$router.push("/");
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    LoginAction() {
      this.checkForm() && this.axiosLoginUser();
    },
    //axios用户登录
    axiosLoginUser() {
      //先把按钮进行loading状态，防止重复提交
      this.openLoading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.username,
          passWord: this.password
        }
      })
        .then(res => {
          console.log("登录", res);
          if (res.data.code === 200 && res.data.message === true) {
            new Promise((resolve, reject) => {
              // 保存用户登录状态
              localStorage.userInfo = {
                userName: this.userName
              };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch(err => {
                Toast.fail("登录状态保存失败");
                console.log(err);
              });
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch(error => {
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
    //客户端验证
    checkForm() {
      let isOk = true;
      if (this.username.length < 1) {
        this.usernameErrorMsg = "用户名不能小于2位";
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