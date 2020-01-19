// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test1-s9ptf'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  let cn = event.name;
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
  let res = await db.collection('character')
    .where({
      name: cn
    }).limit(1)
    .get();

  let skillList = [];
  let skills = res.data[0].skills;
  skillList = await getSkillList(skills);
  
  return {
    skillList,
    
  };
}
async function getBaseInfo(character){
  let baseInfoList =[];
  let phases = character.phases;
  for(let i=0;i<phases;i++){
    let phase = phases[i];
    for (let k = 0; k < phase[k];k++){
      let baseInfo ={};
      
    }
  }
}
async function getSkillList(skills){
  let skillList = [];
  for (let i = 0; i < skills.length; i++) {
    let id = skills[i].skillId;
    let skilldata = await db.collection('skill_info')
      .where({
        skillId: id
      }).limit(1)
      .get();

    let skillInfo = [];
    let levels = skilldata.data[0].levels;
    for (let j = 0; j < levels.length; j++) {
      let skillLevelInfo = {};
      let level = levels[j];
      skillLevelInfo.name = level.name;
      if (level.skillType == 1) {
        skillLevelInfo.skillType = '自动触发';
      } else if (level.skillType == 2) {
        skillLevelInfo.skillType = '手动触发';
      } else {

      }
      let spData = level.spData;
      skillLevelInfo.initSp = spData.initSp;
      skillLevelInfo.maxChargeTime = spData.maxChargeTime;
      skillLevelInfo.spCost = spData.spCost;
      if (spData.spType == 1) {
        skillLevelInfo.spType = '自动回复';
      } else if (spData.spType == 2) {
        skillLevelInfo.spType = '攻击回复';
      } else if (spData.spType == 2) {
        skillLevelInfo.spType = '受击回复';
      }
      let blackBoard = level.blackboard;
      let map = new Map();
      let description = level.description;
      let list = description.match(/<@ba.vup>.*?<\/>/gi);
      for (let f = 0; f < list.length; f++) {
        let str = list[f];

        for (let k = 0; k < blackBoard.length; k++) {
          if (str.indexOf(blackBoard[k].key) != 1) {

            if (str.indexOf('%') != -1) {
              let num = blackBoard[k].value * 100 + '%';
              description = description.replace(str, num);

              break;
            } else {
              let num = blackBoard[k].value * 1;
              description = description.replace(str, num);
              break;

            }
          }

        }
      }
      skillLevelInfo.desc = description;
      skillInfo.push(skillLevelInfo);
    }
    skillList.push(skillInfo);
  }
  return skillList;
}