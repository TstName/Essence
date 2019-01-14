import Base from "../../utils/base.js";
class Detail extends Base{
  constructor(){
    super()
  }
  getdata(id,callback){
    this.axios("/api/getGoodsById/","get",{_id:id}).then((res)=>{
         callback(res.data[0])
    })
  }
}
export default Detail;