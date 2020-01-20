// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'test1-s9ptf'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let res = await db.collection('item_drop_stat')
  .field({
    name:true
  })
  .get();
  
  let dropList = res.data;
  let nameList =[];
  for(drop of dropList){
    nameList.push(drop.name);
  }
  
  const _ = db.command
  let itemListRes = await db.collection('item_info')
    .where({
      name: _.in(nameList)
    })
    .get();
  let itemList = itemListRes.data;
  for(item of itemList){
    item.url = 'cloud://test1-s9ptf.7465-test1-s9ptf-1300138191/item_img/' + item.name + '.png';
  }
  return {
    itemList
  }
}