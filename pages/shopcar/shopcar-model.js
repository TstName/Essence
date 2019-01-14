import Base from "../../utils/base.js"
class shopcar extends Base{
  constructor(){
    super()
  }
  addshopcar(productInfo){
    productInfo.sel = true;
    let cart = wx.getStorageSync("shopcrat") || [];
    let data = this.isinClude(productInfo)
    if (data){
      cart.map((item)=>{
          if (item._id === productInfo._id){
            item.numsum += productInfo.numsum
          }
        return item
      })
    }else{
      console.log("不存在")
      cart.push(productInfo)
    }
    wx.setStorageSync('shopcrat', cart)
  }
  // 判断数据是否存在
  isinClude(newid){
    let arr = wx.getStorageSync("shopcrat") || [];
    let state = arr.some((item)=>{
                  if (item._id === newid._id){
                        return true
                      }
                })
    return state
  }
  // 获取购物车总数
  getshopsum(){
    let sum=0;
    let arr = wx.getStorageSync("shopcrat") || [];
    for(let i=0;i<arr.length;i++){
      sum += arr[i].numsum
    }
    return sum
  }
  // 选中或者未选中
  setoption(id,type){
    let arr = wx.getStorageSync("shopcrat")
    arr.filter((item)=>{
      if (item._id === id){
        switch (type){
                case "sel" : item.sel = !item.sel; break;
                case "add": item.numsum = this.addsum(item.numsum); break;
                case "cut": item.numsum = this.reduce(item.numsum); break;
                case "del": arr = this.deletes(id, arr); break;
                default: break;
            }
        }

        return item
    })
    wx.setStorageSync("shopcrat", arr)
  }
  // 购物车库存不足
  addsum(num){
    if(num<20){
      ++num
    }else{
      wx.showToast({
        title: '亲 库存不足！谢谢理解 请见谅~',
        icon: "none"
      })
    }
    return num
  }
  // 购物车别再减啦
  reduce(num){
    if (num>1){
        --num
    }else{
      num = 1
      wx.showToast({
        title: '亲  别再减啦！  要没有咯~',
        icon: "none"
      })
    }
    return num
  }
  // 删除本条商品
  deletes(id,arr){
   const ary = arr.filter((item)=>{
                if (item._id===id){
                  return false;
                }else{
                  return true
                }
              })
   return ary
  }
  // 总价格
  getprice(){
    const arr = wx.getStorageSync("shopcrat")
    let price = 0;
    let sum = 0;
    let allsum = 0;
   arr.filter((item)=>{
      sum++
      if(item.sel){
        allsum++
        price += item.price * item.numsum
      }
     
    })
    return { price,sum, allsum}
  }
  // 全选
  checkall(){
    const arr = wx.getStorageSync("shopcrat")
    arr.filter((item)=>{
        if(!item.sel){
          item.sel = true
        }else{
          item.sel = true
        }
    })
    wx.setStorageSync("shopcrat", arr)
  }
  // 全部sel为false的情况
  allfalse(){
    const arr = wx.getStorageSync("shopcrat")
    let num = 0;
    arr.filter((item) => {
      if (!item.sel) {
        num++
      } else {
        num--
      }
    })
    return num
  }

}
export default shopcar
