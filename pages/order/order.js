// pages/order/order.js
import Base from "./order-model.js"
import Shoupcart from "../shopcar/shopcar-model.js"
const shoupcart = new Shoupcart()
const base = new Base()
Page({
  data:{
      root:base.url,
      orderData:[],
      money: shoupcart.getprice().price,
      addressInfo:null,
      basicInfo:"",
      tiem:null
  },
  onLoad(opction){
    // 地址设置
    
    // 初始数据
    if (opction.id==="my"){
      this.getmydata(opction.id, opction.order)
    }else{
      
      this.setdata()
      this.setData({ money: shoupcart.getprice().price })
      this.getlocation()
    }
    
  },
  // 
  // 数据设置
  setdata(){
    this.setData({ orderData: base.getlocaltiontrue()}) 
  },
  // 地址设置
  getlocation(){
    const obj = wx.getStorageSync("location") || null
    this.setData({ addressInfo: obj})
  },
  editAddress(){
    base.editAdd((data)=>{
      wx.setStorageSync("location", data)
      this.setData({ addressInfo: data})
    })
  },
  // 去付款
  pay(){
    if (!this.data.addressInfo){
        wx.showToast({
          title: '亲 请先设置收货地址哟 ~ ~',
          icon:"none"
        })
    }else{
      if (base.payment()){
          wx.switchTab({
            url: '/pages/my/index'
          })
      }else{
        wx.showToast({
          title: '亲 请求失败 请重新付款咯 ~ ~',
          icon: "none"
        })
      }
    }
  },
  // 从my页面过来的
  getmydata(id,order){
      const arr = wx.getStorageSync("OrderForm")
     const ary = arr.filter((item)=>{
        if (item.oddnumber === order ){
              return true
          }else{
            return false
          }
      })
      let num = 0;
      ary[0].adds.filter((item)=>{
        num += Number(item.price) *item.numsum
      })
    this.setData({ orderData: ary[0].adds, addressInfo: ary[0], basicInfo: id, tiem: { orderTime: ary[0].oddnumber, orderNo: ary[0].oddnumber }, money: num})
    console.log(ary)
  }
})