<template>
  <div>
    <div class="navbar">
      <van-nav-bar title="购物车"></van-nav-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartInfo: [], // 购物车信息
      isEmpty: false
    };
  },
  created() {
    this.getCartInfo();
  },
  methods: {
    // 判断localStorage里是否有购物车数据
    getCartInfo() {
      if (localStorage.cartInfo) {
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      console.log("cartInfo:", JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    }
  }
};
</script>

<style scoped>
</style>