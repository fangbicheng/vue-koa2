<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" width="100%" />
    </div>
    <div class="goods-name">{{ goodsInfo.NAME }}</div>
    <div class="goods-price">价格:${{ goodsInfo.PRESENT_PRICE | moneyFilter }}</div>
    <div>
      <van-tabs swipeable sticky>
        <!-- swipeable 滑动切换 -->
        <!-- sticky 吸顶效果 -->
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL" ></div>
        </van-tab>
        <van-tab title="评论">
          评论
        </van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger" >直接购买</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import url from "@/serverConfig";
import { toMoney } from "@/filter/moneyFilter";
import { Toast } from "vant";
export default {
  data() {
    return {
      goodsId: "",
      goodsInfo: {} // 商品信息详情
    };
  },
  created() {
    // 接收传递过来的goodsId
    this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId : this.$route.params.goodsId;
    console.log(this.goodsId);
    this.getInfo();
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
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
    },
    // 添加商品到购物车
    addGoodsToCart() {
      // 取出本地购物车中的商品并查重
      let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
      let isHaveGoods = cartInfo.find(cart => cart.goodsId == this.goodsId)
      console.log('isHaveGoods',isHaveGoods)
      if(!isHaveGoods) {
        // 购物车中所属的商品信息
        let newGoods = {
          goodsId: this.goodsInfo.ID,
          Name: this.goodsInfo.Name,
          price:this.goodsInfo.PRESENT_PRICE,
          image:this.goodsInfo.IMAGE1,
          count:1
        }
        cartInfo.push(newGoods)
        localStorage.cartInfo = JSON.stringify(cartInfo)  // localStorage本为字符串，要对数据进行处理
        Toast.success('添加成功')
      } else {
        Toast.success('已有此商品')
      }

      this.$router.push({name:'Cart'})  //进行跳转
    }
  }
};
</script>
<style scoped>
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
}
.detail {
  font-size: 0;
}
.goods-bottom {
  position: fixed;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #fff;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
</style>