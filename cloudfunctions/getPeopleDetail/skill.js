var ski = function (skillInfoList){
    let skillDataInfo = {};
    let tableList = [];
    let skillList = [];

    for (let i = 0; i < skillInfoList.length; i++) {
        let rowList =[];
        rowList.push([{ 'min': 100, 'text': '等级' }, { 'min': 100, 'text': '描述' }, { 'min': 100, 'text': '初始' }, { 'min': 100, 'text': '消耗' }, { 'min': 100, 'text': '持续' }]);
        let skillInfo = [];
        let levels = skillInfoList[i].levels;
        for (let j = 0; j < levels.length; j++) {
            
            let skillLevelInfo = {};
            let level = levels[j];
            if (skillDataInfo.name==null){
                skillDataInfo.name = level.name;
            }
            if (skillDataInfo.skillType==null) {
                if (level.skillType == 1) {
                    skillDataInfo.skillType = '自动触发';
                } else if (level.skillType == 2) {
                    skillDataInfo.skillType = '手动触发';
                } else {

                }
            }
            let spData = level.spData;
            if (skillDataInfo.spType==null) {
                if (spData.spType == 1) {
                    skillDataInfo.spType = '自动回复';
                } else if (spData.spType == 2) {
                    skillDataInfo.spType = '攻击回复';
                } else if (spData.spType == 2) {
                    skillDataInfo.spType = '受击回复';
                }
            }
            let duration = level.duration;
            
            
            skillLevelInfo.initSp = spData.initSp;
            skillLevelInfo.maxChargeTime = spData.maxChargeTime;
            skillLevelInfo.spCost = spData.spCost;
            
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
            let row =[];
            row[0] = { 'min': 100, 'text': i+1};
            row[1] = { 'min': 100, 'text': skillLevelInfo.desc };;
            row[2] = { 'min': 100, 'text': skillLevelInfo.initSp };
            row[3] = { 'min': 100, 'text': skillLevelInfo.spCost };
            row[4] = { 'min': 100, 'text': duration};
            rowList.push(row);
            skillInfo.push(skillLevelInfo);
        }
        
        let tableData= {};
        tableData.list = rowList;
        tableList.push(tableData);
        skillList.push(skillInfo);
    }
    
    skillDataInfo.index = 1;

    return {
        tableList
    };
};
module.exports = {
    getSkillList: ski
}