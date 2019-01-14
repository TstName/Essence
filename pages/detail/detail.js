import Detail from "./detail.model.js";
import Cart from "../shopcar/shopcar-model.js";
const cart = new Cart();
const detail = new Detail()
Page({
  data: {
      show:false,
      root :detail.url,
      have:20,
      arr: [1, 2, 3, 4, 5, 6,7,8,9,10],
      name:"",
      imgPath:"",
      price:"56",
      numsum:0,
      shopcart:0,
      _id:"",
      ary:["商品详情","产品参数","售后保障"],
      tabindex:0
  },
  onLoad: function (options) {
    // 数据请求And 购物车数量 显示
    detail.getdata(options.id,(res)=>{
      console.log(res)
      let { name, price, imgPath,_id} = res
      this.setData({ name, price, imgPath, _id, show: true,})
    })
    this.setData({ shopcart: cart.getshopsum()})
  },
  // 改变数量
  bindTimeChange(e){
    this.setData({ numsum: this.data.arr[e.detail.value]})
  },
  // 添加购物车
  changeshopcart(){
    if (this.data.have<=0){
          wx.showToast({
            title: '库存不足',
            icon: "none"
          })
          return false;
      }
    var sum = this.data.have - this.data.numsum
        let num = this.data.numsum + this.data.shopcart
        // 设置购物车数量
        this.setData({ shopcart: num, have: sum })
        // 储存本地
    if (this.data.numsum>0){
      let { name, imgPath, price, numsum, _id} = this.data
      cart.addshopcar({ name, imgPath, price, numsum, _id})
            return false;
          }

  },
  // tab栏
  tabchange(e){
    this.setData({ tabindex: e.currentTarget.dataset.index})
  },
  // 跳转shopcart
  toshopcart(){
    wx.switchTab({
      url: '/pages/shopcar/index'
    })
  }
})