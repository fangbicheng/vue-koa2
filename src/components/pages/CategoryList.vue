<template>
  <div>
    <div class="navbat-bar">
      <van-nav-bar title="类别列表" />
    </div>
    <van-row>
      <van-col :span="6">
        <div id="leftNav">
          <ul>
            <li @click="clickCategory(index,item.ID)" :class="{ categoryActive : categoryIndex === index }" v-for="(item, index) of category" :key="index">
              {{item.MALL_CATEGORY_NAME}}
            </li>
          </ul>
        </div>
      </van-col>
      <van-col :span="18">
        <!-- 子类列表导航栏 -->
        <div id="rightNav">
          <van-tabs v-model="active" @click="onClickCategorySub">
            <van-tab v-for="(item,index) of categorySub" :key="index" :title="item.MALL_SUB_NAME">
            </van-tab>
          </van-tabs>
        </div>
        <!-- 子类列表详细信息 -->
        <div id="listContent">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" @load="onLoad" >
              <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) of goodList" :key="index" >
                <div class="list-item-img">
                  <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                </div>
                <div class="list-item-text">
                  <div>{{item.NAME}}</div>
                  <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-col>
    </van-row>
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
      category: [], // 子类列表导航栏
      categoryIndex: 0,
      categorySub: [], // 子类列表
      active: 0, // 显示第一个字列表内容
      loading: false, //上拉加载使用
      finished: false, //下拉加载是否没有数据了
      isRefresh: false, // 下拉刷新
      page: 1, // 商品列表页数
      goodList: [], // 商品列表信息
      categorySubId: "",// 商品子类别id
      errorImg: 'this.src="'+ require('@/assets/images/error.png')+'"'
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    // 左侧大类导航栏
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "GET"
      })
        .then(res => {
          console.log('左侧导航栏',res);
          if (res.data.code === 200 && res.data.message) {
            this.category = res.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("获取数据失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 根据大类id获取右侧小类列表导航栏
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId: categoryId }
      })
        .then(res => {
          console.log('小类列表导航栏',res.data);
          if (res.data.code == 200 && res.data.message) {
            this.categorySub = res.data.message;
            this.active = 0;
            this.categorySubId = this.categorySub[0].ID // 读取小类别
            this.onLoad()
          } else {
            Toast("数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 左侧大类交互效果制作-反白操作
    clickCategory(index, categoryId) {
      console.log("点击了", categoryId);
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySubByCategoryId(categoryId);
    },
    // 点击子类table获取商品信息
    onClickCategorySub(index,title) {
      this.categorySubId = this.categorySub[index].ID;  // 子类别id
      console.log("categorySubId",this.categorySubId);
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    // 上拉加载
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID;
        this.getGoodsList();
      }, 1000);
    },
    onRefresh() {
      // 这里同onLoad需要一个setTimeout,不然一直执行
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;
        this.onLoad();
      }, 500);
    },
    // 获取分页商品子类详细信息
    getGoodsList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "POST",
        data: {
          categorySubId: this.categorySubId,  // 商品子类别id
          page: this.page
        }
      })
        .then(res => {
          console.log('分类子类详细信息列表',res);
          if (res.data.code === 200 && res.data.message.length) {
            this.page++;
            this.goodList = this.goodList.concat(res.data.message);
          } else {
            // 没有数据 上拉加载禁止
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 去商品详情页
    goGoodsInfo(id) {
      // 编程式导航
      // this.$router.push({name: 'Goods',params: {goodsId: id}})
      this.$router.push({path: '/goods', query: {goodsId: id}})

      /**
       * params和query传参的用法
       * 
       * 1、params传参，路径不能使用path，只能使用name，不然取不到传的数据
       *    this.$router.push({name:'Goods',params:{goodsId:id}})
       *    取数据时：
       *    this.$route.params.goodsId
       * 
       * 2、query传参，用的是path，而不是name,否则也会出错。
       *    this.$router.push({path: '/goods', query: {goodsId: id}})
       *    取数据时: 
       *    this.$route.query.goodsId
       */

    }
  },
  //   通过js，让左侧当行适应页面高度
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 - 50 + "px";
    document.getElementById("listContent").style.height = winHeight - 90 -50 + "px";
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money)
    }
  }
};
</script>

<style scoped>
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}

#listContent {
  overflow: scroll;
}

.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}

.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>