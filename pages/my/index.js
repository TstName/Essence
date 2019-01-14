// pages/my/index.js
import Model from "./my-model.js"
import Order from "../order/order-model.js"
const model = new Model()
const order = new Order()
Page({

  data: {
    root: model.url,
    loadingHidden:false,
    addressInfo:null,
    userInfo:null,
    orderArr:[]
  },
  onShow(){
    this.getdata()
  },
  onLoad(e){
    console.log(e)
    // 获取地址与订单信息
    this.getdata()
    // 获取个人信息
    this.getuser()
  },
  // 获取地址与订单信息
  getdata(){
    let { orderArr, addressInfo}  = model.getlocation()
    orderArr.map((item)=>{
      let num=0; 
      item.adds.map((item)=>{
        num += Number(item.price) * item.numsum
      })
      item.order = item.adds[0]
      item.addslength = item.adds.length
      item.status = 1
      item.allPrice = num
      return item
    })
    console.log(orderArr)
    this.setData({ addressInfo, orderArr, loadingHidden: true})
  },
  // 获取个人信息
  getuser(){
    wx.getUserInfo({
      success:(res)=> { 
        let {nickName,avatarUrl} = res.userInfo
        this.setData({ userInfo:{ nickName, avatarUrl}})
       
        }
    })
  },
  // 地址设置
  editAddress() {
    order.editAdd((data) => {
      wx.setStorageSync("location", data)
      this.setData({ addressInfo: data })
    })
  },
//  跳转详情页
goOrder(e){
 const Id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/order/order?order=${Id}&id=my`
    })
}

  
})