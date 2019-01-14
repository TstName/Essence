import Base from "../../utils/base.js"
class Theme extends Base{
  constructor(){
    super()
  }
  getthemes(id,callback){
    this.axios("/api/getThemeByid","get",{themeid:id}).then((res)=>{
      callback(res.data)
    })
  }

}
export default Theme