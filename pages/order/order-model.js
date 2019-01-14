import Base from "../../utils/base.js"
class order extends Base{
    constructor(){
      super()
    }
    // 获取本地数据为true的
    getlocaltiontrue(){
      const arr = this.getlocaltion()
      const ary=arr.filter((item)=>{
        if (!item.sel){
             return false
          }else{
            return true
          }
      })
      return ary
    }
    // 获取本地数据
    getlocaltion(){
      return wx.getStorageSync("shopcrat")
    }
    // 设置地址
  editAdd(callback) {
    wx.chooseAddress({
      success: (res) => {
        callback(res)
      }
    })
  }
  // 付款
  payment(){
    
    // 获取本地
   const add =  this.getlocaltiontrue()
   const location = wx.getStorageSync("location")
  //  设置单号
   const time = new Date()
    const year = time.toLocaleDateString().split("/").join("")
    const hours = JSON.stringify(time.getTime()).substr(5)
    const oddnumbers = year + hours
    // 储存本地
        location.adds = add
        location.oddnumber = oddnumbers
    const arr = wx.getStorageSync("OrderForm") || []
    if (arr){
      arr.push(location)
    }else{
      arr.push(location)
    }
    wx.setStorageSync("OrderForm", arr)
    return true
  }
}
export default order