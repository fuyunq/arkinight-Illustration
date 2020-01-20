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

  let skills = res.data[0].skills;

  let skillList = await getSkillList(skills);
  let baseInfoList = await getBaseInfoList(res.data[0]);
  let baseSkillUpCostList = await getBaseSkillUpCostList(res.data[0].allSkillLvlup);
  return {
    skillList,
    res,
    baseInfoList,
    baseSkillUpCostList
  };
}
async function getBaseSkillUpCostList(allSkillLvlup, skills) {
  let baseSkillCostList = [];
  let itemList = [];
  for (let i = 0; i < allSkillLvlup.length; i++) {
    let lvl = allSkillLvlup[i].lvlUpCost;
    for (let j = 0; j < lvl.length; j++) {
      let item = lvl[j];
      itemList.push(item.id);
    }
  }
  for(let skill of skills){
    let levelUpCostCond = skill.levelUpCostCond;
    for (let levelUpCostList of levelUpCostCond){
      let levelUpCost = levelUpCostList.levelUpCost;
      for (let item of levelUpCost){
        itemList.push(item.id);
      }
    }
  }
  let itemInfoList = await getItemList(itemList);
  let itemMap = new Map();
  for (let itemInfo of itemInfoList) {
    itemMap.set(itemInfo.itemId, itemInfo);
  }
  for (let i = 0; i < allSkillLvlup.length; i++) {
    let lvlCost = allSkillLvlup[i].lvlUpCost;
    let levelCost = [];
    for (let j = 0; j < lvlCost.length; j++) {

      let singleCost = lvlCost[j];
      let itemInfo = itemMap.get(singleCost.id);

      let cost = {};
      cost.level = (i + 1) + '→' + (i + 2);
      cost.name = itemInfo.name;
      cost.url = 'cloud://test1-s9ptf.7465-test1-s9ptf-1300138191/item_img/' + itemInfo.name + '.png';
      cost.count = singleCost.count;
      levelCost.push(cost);
    }
    baseSkillCostList.push(levelCost);
  }
  
  return baseSkillCostList;
}

async function getItemList(itemIdList) {
  const _ = db.command
  let res = await db.collection('item_info')
    .where({
      itemId: _.in(itemIdList)
    })
    .get();
  return res.data;
}
async function getBaseInfoList(character) {
  let baseInfoList = [];

  let phases = character.phases;
  for (let i = 0; i < phases.length; i++) {
    let attributesKeyFrames = phases[i].attributesKeyFrames;

    for (let j = 0; j < attributesKeyFrames.length; j++) {
      let attributesKeyFrame = attributesKeyFrames[j];

      let data = attributesKeyFrame.data;
      let baseInfo = data;
      let str = '';
      if (i == 0) {
        str = '初始';
      } else if (i == 1) {
        str = '精一';
      } else if (i == 2) {
        str = '精二';
      }
      baseInfo.level = str + attributesKeyFrame.level + '级';
      baseInfoList.push(baseInfo);
    }

  }
  return baseInfoList;
}
async function getSkillList(skills) {
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
      skillLevelInfo.duration = level.duration;
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
          if (str.indexOf(blackBoard[k].key) != -1) {
            if (str.indexOf('%') != -1) {
              if (str.indexOf('+') != -1) {
                let num = '+' + Math.round(blackBoard[k].value * 100) + '%';
                description = description.replace(str, num);
                break;
              } else if (str.indexOf('-') != -1) {
                let num = '-' + Math.round(blackBoard[k].value * 100) + '%';
                description = description.replace(str, num);
                break;
              } else {
                let num = Math.round(blackBoard[k].value * 100) + '%';
                description = description.replace(str, num);
                break;
              }

            } else {
              let num = Math.round(blackBoard[k].value * 1);
              description = description.replace(str, num);
              break;
            }
          }
        }
      }
      for (let k = 0; k < blackBoard.length; k++) {
        let keyValue = blackBoard[k];
        if (keyValue.key == 'cnt') {
          description = description.replace('{cnt}', Math.round(keyValue.value));
        }
      }
      description = description.replace('<@ba.vup>', '').replace('<@ba.vdown>', '').replace('<@ba.vup>', '').replace('<@ba.rem>', '').replace('</>', '').replace('</>', '');

      skillLevelInfo.desc = description;

      skillInfo.push(skillLevelInfo);
    }
    skillList.push(skillInfo);
  }
  return skillList;
}