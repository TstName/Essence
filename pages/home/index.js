// pages/home/index.js
import Home from "./home-model.js"
const home = new Home()
Page({
  data:{
    banners: [],
    products:[],
    themes:[],
    root:home.url,
    hiddenshow:false
  },
  onLoad(){
    home.getdata((res)=>{
      let { banners, products, themes} = res
      this.setData({ banners, products, themes, hiddenshow:true })
    })
  },
  tothemes(e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/theme/index?id=${id}&title=${this.data.themes[id-1].name}`,
    })
  },
  todetail(e){
    console.log(e)
    const id = e.currentTarget.dataset.id 
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  onPullDownRefresh(){
    home.getrepetition((res) => {
      let { banners, products, themes } = res
      this.setData({ banners, products, themes, hiddenshow: true })
      wx.stopPullDownRefresh()
    })
  }
})
