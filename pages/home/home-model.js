import Base from "../../utils/base.js"
class Home extends Base{
  constructor(){
    super()
  }
  getdata(callback){
    const obj = wx.getStorageSync("homepage")
    console.log(obj)
    if (obj){
      callback(obj)
    }else{
      this.getrepetition((data)=>{
        callback(data)
      })
    }
  }
  getrepetition = (callback)=>{
      this.axios("/api/getHome", "get").then((res) => {
        wx.setStorageSync('homepage', res.data)
        callback(res.data)
        
      })
    }
  
}
export default Home