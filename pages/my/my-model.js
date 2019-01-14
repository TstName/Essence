import Base from "../../utils/base.js"
class My extends Base{
  constructor(){
    super()
  }
  // 获取订单
  getlocation(){
    const orderArr = wx.getStorageSync("OrderForm")  
    const addressInfo = wx.getStorageSync("location")  
    return { orderArr, addressInfo}
  }
}
export default My