<template>
  <div>
    <!--搜索栏-->
    <div class="search-bar">
      <van-row>
        <van-col :span="3">
          <img
            :src="locationIcon"
            alt=""
            class="location-icon"
          >
        </van-col>
        <van-col :span="16">
          <input
            type="text"
            class="search-input"
          >
        </van-col>
        <van-col :span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!--轮播图-->
    <div class="swipe-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item
          v-for="(item,index) of bannerPicArray"
          :key="index"
        >
          <img
            v-lazy="item.image"
            width="100%"
            height="150px"
            alt=""
          >
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--type bar-->
    <div class="type-bar">
      <div
        v-for="(cate,index) of category"
        :key="index"
      >
        <img
          v-lazy="cate.image"
          width="90%"
          alt=""
        >
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--adBanner area-->
    <div>
      <img
        v-lazy="adBanner"
        width="100%"
        alt=""
      >
    </div>
    <!--商品推荐-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide
            v-for="(item, index) of recommendGoods"
            :key="index"
          >
            <div class="recommend-item">
              <img
                :src="item.image"
                width="80%"
                alt=""
              >
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- <swiper-default />  -->
    <!--楼层-->
    <floor-component
      :floorData="floor1"
      :floorTitle="floorName.floor1"
    />
    <floor-component
      :floorData="floor2"
      :floorTitle="floorName.floor2"
    />
    <floor-component
      :floorData="floor3"
      :floorTitle="floorName.floor3"
    />
    <!--热卖模块-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col
              :span="12"
              v-for="(item,index) of hotGoods"
              :key="index"
            >
              <goods-info
                :goodsImage="item.image"
                :goodsName="item.name"
                :goodsPrice="item.price"
              ></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serverConfig";
// 引入轮播插件
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { toMoney } from "../filter/moneyFilter";
import floorComponent from "../components/component/floorComponent";
import goodsInfo from "../components/component/goodsInfoComponent";
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 3 // 每一行展示三项
      },
      locationIcon: require("../assets/images/location.png"), // 引入图片
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: []
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  created() {
    axios({
      url: url.getshoppingMailInfo,
      method: "GET"
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.category = res.data.data.category;
          this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
          this.bannerPicArray = res.data.data.slides;
          this.recommendGoods = res.data.data.recommend;
          this.floor1 = res.data.data.floor1;
          this.floor2 = res.data.data.floor2;
          this.floor3 = res.data.data.floor3;
          this.floorName = res.data.data.floorName;
          this.hotGoods = res.data.data.hotGoods;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  /* 1rem=16px */
  background-color: #e5017d;
  line-height: 2.2rem;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
  width: 80%;
}
.swipe-area {
  clear: both;
  max-height: 15rem;
  overflow: hidden;
}
.type-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  background-color: #fff;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>