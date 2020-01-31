var test = function (t){
    let rowList = [];
    rowList.push([{ 'min': 100, 'text': '天赋' }, { 'min': 100, 'text': '条件' }, { 'min': 100, 'text': '效果' }])
    for (let i = 0; i < t.length; i++) {
        let c = t[i].candidates;
        for (let j = 0; j < c.length; j++) {
            let item = new Object();
            item.name = c[j].name;
            let test = c[j].description;
            item.desc = test.replace(/<@ba.talpu>/gi, ' ').replace(/<\/>/gi, "");
            item.index = test.indexOf('<@ba.talpu>');
            item.test = test;
            let quire = '';
            let level = c[j].unlockCondition.level;
            if (level != null && level != 1) {
                quire = quire + "等级" + level + ' ';
            }
            let phase = c[j].unlockCondition.phase;
            if (phase != null) {
                quire = quire + "精英" + phase + ' ';
            }
            let rank = c[j].requiredPotentialRank;
            if (rank != null & rank != 0) {
                quire = quire + "潜能" + rank;
            }
            item.quire = quire;
            let col1 = { 'min': 100, 'text': item.name };
            let col2 = { 'min': 100, 'text': item.quire };
            let col3 = { 'min': 100, 'text': item.desc };
            rowList.push([col1, col2, col3]);
        }
    }
    let tableList = [];
    let tableData = {};
    tableData.list = rowList;
    tableList.push(tableData);
    return {
        tableList
    };
};
module.exports={
    getTalentList: test
}