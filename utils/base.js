import config from './config.js'
class Base{
  constructor(){
    this.url = config.root
  }
  axios(url, type,data){
    return new Promise((resolve,rejecte)=>{
      wx.request({
        url: this.url+url,
        data:data || "",
        method:type || "get",
        success(res) {
          if (res.statusCode===200){
            resolve(res.data)
          }else{
            rejecte(err)
          }
        },
        fail(err){
          rejecte(err)
        }
      })
    })
  }
}
export default Base