const express=require('express');
//引入body-parser中间件
const bodyParser=require('body-parser');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();

//使用body-parser中间件，将post请求的数据解析为对象
router.use(bodyParser.json());
router.use( bodyParser.urlencoded({
  extended:false
}) );


// 根据uid删除用户
router.post("/del",(req,res)=>{
  var uid=req.body.uid
  console.log(uid)
  pool.query("delete from sn_user where uid=?",[uid],(err,result)=>{
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"})
    }else{
      res.send({code:0,msg:"删除失败"})
    }
  })
})
//查询所有游记
router.get("/seek/travels",(req,res)=>{
  pool.query("select title,himg,uname,icon,tid from sn_travels,sn_user where sn_travels.uid=sn_user.uid",(err,result)=>{
    if(result.length>0){
      res.send(result)
    }else{
      res.send({code:0,msg:"查询失败"})
    }
  })
})
//删除指定游记文章
router.get("/tradel",(req,res)=>{
  var tid=req.query.tid
  console.log(tid)
  pool.query("delete from sn_travels where tid=?",[tid],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"})
    }else{
      res.send({code:0,msg:"删除失败"})
    }
  })
})
//查询所有攻略
router.get("/seek/psp",(req,res)=>{
  pool.query("select title,himg,uname,icon,pid from sn_psp,sn_user where sn_psp.uid=sn_user.uid",(err,result)=>{
    if(result.length>0){
      res.send(result)
    }else{
      res.send({code:0,msg:"查询失败"})
    }
  })
})
//删除指定攻略文章
router.get("/pspdel",(req,res)=>{
  var pid=req.query.pid
  console.log(pid)
  pool.query("delete from sn_psp where pid=?",[pid],(err,result)=>{
    if(err)throw err;
    if(result.affectedRows>0){
      res.send({code:1,msg:"删除成功"})
    }else{
      res.send({code:0,msg:"删除失败"})
    }
  })
})







//导出路由器对象
module.exports=router;