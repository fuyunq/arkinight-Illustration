// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'test1-s9ptf'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async(event, context) => {
    let itemName = event.name;

    let res = await db.collection('item_drop_stat')
        .where({
            name: itemName
        })
        .orderBy('_id', 'asc')
        .limit(1)
        .get();

    let itemDetail = {}
    let list =[];
    for (it of res.data[0].list){
        if (it.percent != '0.00%' && it.stage_name!='罗德岛物资补给' && it.stage_name!='无限池'){
            list.push(it);    
        }
    }
    itemDetail.dropStatList = list;

    let itemListRes = await db.collection('item_info')
        .where({
            name: itemName
        })
        .limit(1)
        .get();
    let item = itemListRes.data[0];

    item.url = 'cloud://test1-s9ptf.7465-test1-s9ptf-1300138191/item_img/' + item.name + '.png';
    itemDetail.item = item;
    return {
        itemDetail
    }
}