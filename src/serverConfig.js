const baseURL = "https://www.easy-mock.com/mock/5c10feb4be3cc90fa1b170f6/SmileVue/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getshoppingMailInfo: baseURL + 'index', // 商品首页信息
    registerUser: LOCALURL + 'user/register', // 用户注册接口
    login: LOCALURL + 'user/login', // 用户登录接口
    getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo', // 获取商品详情
    getCategoryList: LOCALURL + 'goods/getCategoryList', // 得到大类信息
    getCategorySubList: LOCALURL + 'goods/getCategorySubList', // 根据大类id获取小类列表
    getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID' // 分页获取小类商品信息
}
export default URL