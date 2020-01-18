// 云函数入口文件
// const cloud = require('wx-server-sdk');
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test1-s9ptf'
})

const db = cloud.database()
exports.main = async(event, context) => {
  let cn = event.name;
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
    let res = await db.collection('character')
    .field({
      'talents': true
    })
    .where({
      name: cn
    })
    .get();
    
  let t = res.data[0].talents;
      let talentList = new Array();
      for (let i = 0; i < t.length; i++) {
        let c = t[i].candidates;
        for(let j=0;j<c.length;j++){
          let item = new Object();
          item.name = c[j].name;
          item.desc = c[j].description.replace('<@ba.talpu>','').replace('</>','');
          let quire ='';
          let level = c[j].unlockCondition.level;
          if (level!=null&&level!=1){
            quire = quire + "等级" + level+' ';
          }
          let phase = c[j].unlockCondition.phase;
          if (phase!=null){
            quire = quire + "精英" + phase + ' ';
          }
          let rank = c[j].requiredPotentialRank;
          if(rank!=null&rank!=0){
            quire = quire + "潜能" + rank;
          }
          item.quire = quire;
          talentList.push(item);
        }
      }
      return {
        talentList,res};

}
