<template>
  <div>
    <div class="navbar">
      <van-nav-bar title="购物车"></van-nav-bar>
    </div>
    <div class="cart-title">
      <van-button size="small" type="danger" @click="clearCart" >
        清空购物车
      </van-button>
    </div>
    <!--购物车商品-->
    <div class="cart-list">
      <div class="cart-row" v-for="(item,index) of cartInfo" :key="index">
        <div class="cart-img">
          <img :src="item.image" width="100%" alt="" >
        </div>
        <div class="cart-text">
          <div class="goods-name">{{ item.name }}</div>
          <div class="goods-control">
            <van-stepper v-model="item.count" />
          </div>
        </div>
        <div class="cart-price">
          <div>${{ item.price | moneyFilter }}</div>
          <div>x{{ item.count }}</div>
          <div class="allPrice">
            ${{ item.price * item.count | moneyFilter }}
          </div>
        </div>
      </div>
    </div>
    <!-- 计算总价 -->
    <div class="totalMoney">商品总价: ${{ totalMoney | moneyFilter}}</div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter";
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
    },
    // 清空购物车
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  // 计算属性 计算总价
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count;
      });
      // 当页面刷新时原有的数据会消失，保存之
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return allMoney;
    }
  }
};
</script>

<style scoped>
.cart-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background-color: #fff;
}
.cart-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.cart-img {
  flex: 6;
}
.cart-text {
  flex: 14;
  padding-left: 10px;
}
.goods-control {
  padding-top: 10px;
}
.cart-price {
  flex: 4;
  text-align: right;
}
.allPrice {
  color: red;
}
.totalMoney {
  background-color: #fff;
  text-align: right;
  padding: 5px;
  border-bottom: 1px solid #e4e7ed;
  color: red;
}
</style>