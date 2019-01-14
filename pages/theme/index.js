// pages/theme/index.js
import Model from "./theme-model.js"
const model = new Model()
Page({
  data:{
    show:true,
    root: model.url,
    topimg:"",
    products:[]
  },
  onLoad(options){
    wx.setNavigationBarTitle({
      title: options.title
    })
    model.getthemes(options.id,(res)=>{
      let { topimg, products } = res
      this.setData({ topimg, products ,show:false})
    })
  },
  todetail(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }
})