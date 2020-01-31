// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    return [{ 'title': '属性', 'showState': false, 'index': 0 }, { 'title': '技能升级消耗', 'showState': false, 'index': 1 }]
}