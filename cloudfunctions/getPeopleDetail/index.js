// 云函数入口文件

const cloud = require('wx-server-sdk')

cloud.init({
    env: 'test1-s9ptf'
})

const db = cloud.database();
// const talent = require ('./tanlent.js');
// const skillUtil = require('./skill.js');
const phasetUtil = require('./phase.js');
const skillCostUtil = require('./skillUpCost.js');
// 云函数入口函数
exports.main = async (event, context) => {
    const _ = db.command
    let cn = event.name;
    // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
    let characterRes = await db.collection('character')
        .where({
            name: cn
        })
        .get();
    let t = characterRes.data[0].talents;
    
    let peopleDetail = [];
    //天赋部分
    // let talentdata = talent.getTalentList(t);
    // peopleDetail.push(talentdata);


    //技能信息部分
    let skills = characterRes.data[0].skills;
    let skillIdList =[];
    for(let skill of skills){
        skillIdList.push(skill.skillId);
    }
    let skillRes = await db.collection('skill_info')
        .where({
            skillId: _.in(skillIdList)
        })
        .get();
    let skillInfoList = skillRes.data;
    // let skillInfo = skillUtil.getSkillList(skillInfoList);
    // peopleDetail.push(skillInfo);

    //基础属性部分
    let phases = characterRes.data[0].phases;
    let favorData = null;
    if (characterRes.data[0].favorKeyFrames.length>1){
        favorData = characterRes.data[0].favorKeyFrames[1].data;
        
    }
    let phaseInfo = phasetUtil.getPhaseList(phases, favorData);
    peopleDetail.push(phaseInfo);


    // 技能升级消耗
    let itemIdList = [];
    let allSkillLvlup = characterRes.data[0].allSkillLvlup;
    for (let i = 0; i < allSkillLvlup.length; i++) {
        let lvl = allSkillLvlup[i].lvlUpCost;
        for (let j = 0; j < lvl.length; j++) {
            let item = lvl[j];
            itemIdList.push(item.id);
        }
    }
    
    for (let skill of skills) {
        let levelUpCostCond = skill.levelUpCostCond;
        for (let levelCost of levelUpCostCond ){
            let levelUpCost = levelCost.levelUpCost;
            for (let costIetm of levelUpCost){
                itemIdList.push(costIetm.id);
            }
        }
    }
    let itemRes = await db.collection('item_info')
        .where({
            itemId: _.in(itemIdList)
        })
        .get();
    let itemInfoList = itemRes.data;
    let itemMap = new Map();
    for (let itemInfo of itemInfoList) {
        itemMap.set(itemInfo.itemId, itemInfo);
    }
    let skillUpCost = skillCostUtil.getSkillUpCostList(allSkillLvlup, skills,skillInfoList,itemMap);
    peopleDetail.push(skillUpCost);

    // 背景故事
    let res = await db.collection('handbook_info')
        .where({
            name: cn
        })
        .get();

    return {
        peopleDetail
    };
}

