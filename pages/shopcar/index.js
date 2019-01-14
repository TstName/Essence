// pages/shopcar/index.js
import Shopcar from "./shopcar-model.js"
const shopcar = new Shopcar()
Page({
    data:{
        arr:[],
      root: shopcar.url,
      loadingHidden:true,
      price:0,
      sum:0,
      allsum:0
    },
    onLoad(option){
       // 购物车即使刷新
      this.getnumsum()
      this.getlocal()
    },
    getlocal(){
      // 获取本地购物车数据 
       this.setData({ arr: wx.getStorageSync("shopcrat"), loadingHidden:false}) 
    },
    // 获取购物车总价 全选数据
    getnumsum(){
      let { price,sum, allsum } = shopcar.getprice()
      this.setData({ price, sum, allsum })
    },
    onShow(){
       // 购物车即使刷新
      this.getnumsum()
      this.getlocal()
    },
    // 修改选中
  changeProductInfo(vel){
    let { id, type } = vel.currentTarget.dataset
    shopcar.setoption(id,type)
    // 刷新缓存数据
    this.getlocal()
    //  选中总价及时刷新
    this.getnumsum()
  },
  todetail(e){
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  // 全选
  toggleSelectAll(e){
    shopcar.checkall()
    this.getlocal()
    this.getnumsum()
  },
  // 下单
  submitOrder(){
    if (this.data.arr.length === shopcar.allfalse()){
        wx.showToast({
          title: '亲 请选择要支付的商品哟 ~ ',
          icon:"none"
        })
    }else{
      wx.navigateTo({
        url: '/pages/order/order?id=shop'
      })
    }  
  }
})