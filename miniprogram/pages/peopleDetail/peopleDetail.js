// miniprogram/pages/peopleDetail/peopleDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      peopleDetail:null,
      desc:'',
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let cn = options.name;
    const db = wx.cloud.database({
      env: 'test1-s9ptf'
    });
    db.collection('character')
      .where({
        name: cn
      })
      .limit(1)
      .get().then(res => {
        console.log(res);
        this.setData({
          desc:res.data[0].itemDesc
        })
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})