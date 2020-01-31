// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'test1-s9ptf'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
    let rangeId = event.id;
    let res = await db.collection('range_info').where({
        id: rangeId
    }).limit(1).get();
    let nodeList = res.data[0].grids;
    let rowMax = 0;
    let rowMin = 0;
    let colMax = 0;
    let colMin = 0;
    let nodeMap = new Map();

    for (item of nodeList) {
        nodeMap.set('row' + item.row+'col'+item.col,1);
        if (item.row > rowMax) {
            rowMax = item.row;
        }
        if (item.col > colMax) {
            colMax = item.col;
        }
        if (item.row < rowMin) {
            rowMin = item.row;
        }
        if (item.col < colMin) {
            colMin = item.col;
        }
    }

    let rowLength = rowMax - rowMin + 1;
    let colLength = colMax - colMin + 1;
    
    let list =[];
    for(let i=rowMin;i<=rowMax;i++){
        for(let j=colMin;j<=colMax;j++){
            if(i==0&&j==0){
                list.push(0);
                continue;
            }
            let str = 'row' + i + 'col' + j;
            if (nodeMap.get(str)!=null){
                list.push(1);
            }else{
                list.push(-1);
            }
        }
    }
    return {
        'rowMax': rowMax,
        'colMax': colMax,
        'rowMin': rowMin,
        'colMin': colMin,
        'rowLength': rowLength,
        'colLength': colLength,
        'list':list
    }
}