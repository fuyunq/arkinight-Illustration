// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'test1-s9ptf'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    let cn = event.name;
    let res = await db.collection('people_detail_info')
        .where({
            name:cn
        })
        .get();
        return res.data
}