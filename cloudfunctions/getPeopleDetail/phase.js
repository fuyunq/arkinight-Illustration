var phase = function (phases,favorData){
    let baseInfoList = [];
    let rowList =[];
    let tableList =[];
    let row = [{ 'min': 100, 'text': '' }, { 'min': 100, 'text': '生命上限' }, { 'min': 100, 'text': '攻击' }, { 'min': 100, 'text': '防御' }, { 'min': 100, 'text': '法术抗性' }];
    rowList.push(row);
    
    for (let i = 0; i < phases.length; i++) {
        let attributesKeyFrames = phases[i].attributesKeyFrames;
        let row = [];
        for (let j = 0; j < attributesKeyFrames.length; j++) {
            let attributesKeyFrame = attributesKeyFrames[j];

            let data = attributesKeyFrame.data;
            
            let str = '';
            if (i == 0) {
                str = '初始';
            } else if (i == 1) {
                str = '精一';
            } else if (i == 2) {
                str = '精二';
            }
            let level = str + attributesKeyFrame.level + '级';
            row[0] = { 'min': 100, 'text': level };
            row[1] = { 'min': 100, 'text': data.maxHp };
            row[2] = { 'min': 100, 'text': data.atk };
            row[3] = { 'min': 100, 'text': data.def };
            row[4] = { 'min': 100, 'text': data.magicResistance };
            rowList.push(row);
        }
        
    }
    if(favorData!=null){
        let row =[];
        row[0] = { 'min': 100, 'text': '信赖' };
        row[1] = { 'min': 100, 'text': '+'+ favorData.maxHp };
        row[2] = { 'min': 100, 'text': '+' + favorData.atk };
        row[3] = { 'min': 100, 'text': '+' + favorData.def };
        row[4] = { 'min': 100, 'text': '+' + favorData.magicResistance };
        rowList.push(row);
    }
    let tableData = {};
    tableData.list = rowList;
    tableList.push(tableData);
    return {tableList};
}
module.exports = {
    getPhaseList: phase
}