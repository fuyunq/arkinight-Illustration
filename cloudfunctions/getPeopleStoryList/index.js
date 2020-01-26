// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'test1-s9ptf'
})

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    let cn = event.name;
    // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
    let res = await db.collection('handbook_info')
        .where({
            name: cn
        })
        .get();

        return res.data[0].StoryList;
}