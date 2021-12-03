let baseUrl = "https://mall.api.sanyue.kim/api/";
// let baseUrl = "/api/";
let api = {
  //关于用户
  login: baseUrl + "user/login",
  user: baseUrl + "user", //添加，修改
  updatePassword: baseUrl + "user/password",
  getUser: baseUrl + "user/whoami",

  //图片
  imgOptions: baseUrl + "img",
  // getImg: baseUrl + '/img/', //+图片名

  //地址
  addressOptions: baseUrl + "address", //+地址

  //商品
  goodsOptions: baseUrl + "goods",

  //购物车
  cartOptions: baseUrl + "cart",

  //商品目录
  category: baseUrl + "category",
  //订单
  order: baseUrl + "order",

  //支付接口
  pay: baseUrl + "order/pay/",
};
export default api;
