var ski = function (allSkillLvlup, skills, skillInfoList, itemMap){
    
    let rowList =[];
    rowList.push([{ 'min': 100, 'text': '等级' }, { 'min': 100, 'text': '消耗' }]);
    let baseSkillCostList = [];
    
    for (let i = 0; i < allSkillLvlup.length; i++) {
        let row =[];
        
        let lvlCost = allSkillLvlup[i].lvlUpCost;
        
        let level = (i + 1) + '→' + (i + 2);
        row.push({ 'min': 100, 'text': level });
        let levelCost = [];
        for (let j = 0; j < lvlCost.length; j++) {
            let itemCost = {};
            
            let singleCost = lvlCost[j];
            let itemInfo = itemMap.get(singleCost.id);
            itemCost.url = 'cloud://test1-s9ptf.7465-test1-s9ptf-1300138191/item_img/' + itemInfo.name + '.png';
            itemCost.name = itemInfo.name;
            itemCost.count = singleCost.count;
            levelCost.push(itemCost);
        }
        row.push({ 'templateType': 1, 'levelCost': levelCost});
        rowList.push(row);
        baseSkillCostList.push(levelCost);
    }
    for (let i = 0; i < skills.length;i++){
        let skill = skills[i];
        let skillInfo = skillInfoList[i];
        let name = skillInfo.levels[0].name;
        let levelUpCostCond = skill.levelUpCostCond;
        for (let j = 0; j < levelUpCostCond.length;j++) {
            let row=[];
            let levelName = '';
            switch (j){
                case 0: levelName = name+'\n专精一';
                break;
                case 1: levelName = name + '\n专精二';
                break;
                case 2: levelName = name + '\n专精三';
                break;
            }
            row.push({ 'min': 100, 'text': levelName });
            let levelCost = levelUpCostCond[j];
            let levelUpCost = levelCost.levelUpCost;
            let cost = [];
            for (let costItem of levelUpCost) {
                let itemInfo = itemMap.get(costItem.id);
                let itemCost = {};
                itemCost.url = 'cloud://test1-s9ptf.7465-test1-s9ptf-1300138191/item_img/' + itemInfo.name + '.png';
                itemCost.name = itemInfo.name;
                itemCost.count = costItem.count;
                cost.push(itemCost);
            }
            row.push({ 'templateType': 1, 'levelCost': cost });
            rowList.push(row);
        }
    }
    let tableList = [];
    let tableData = {};
    tableData.list = rowList;
    tableList.push(tableData);
    return {tableList};
}
module.exports = {
    getSkillUpCostList: ski
}