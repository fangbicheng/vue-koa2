<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="topimage-div">
      <img
        :src="goodsInfo.IMAGE1"
        width="100%"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import url from "@/serverConfig";
import { Toast } from "vant";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {} // 商品信息详情
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId; // 接收传递过来的goodsId
    console.log(this.goodsId);
    this.getInfo();
  },
  methods: {
    getInfo() {
      axios({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(res => {
          if (res.data.code === 200 && res.data.message) {
            this.goodsInfo = res.data.message;
          } else {
            Toast("服务器错误，数据取得失败");
          }
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
</style>