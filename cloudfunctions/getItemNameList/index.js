// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'test1-s9ptf'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    let res = await db.collection('item_drop_stat')
        .field({
            name: true
        })
        .get();

    let dropList = res.data;
    let itemList = [];
    for (drop of dropList) {
        let item ={};
        item.name = drop.name;
        
        item.url = 'cloud://test1-s9ptf.7465-test1-s9ptf-1300138191/item_img/' + item.name + '.png';
        itemList.push(item);
    }
    return itemList;
}