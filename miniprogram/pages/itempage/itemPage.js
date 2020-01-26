// miniprogram/pages/itempage/itemPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      itemList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getItemNameList',
      // 传给云函数的参数
      data: {
      },
      success: function (res) {
        console.log(res);
        that.setData({
            itemList: res.result
        })
      },
      fail: console.error
    })
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

  },
  touchItem:function(event){
      let name =event.currentTarget.dataset.name;
      let url = event.currentTarget.dataset.url;
      console.log(event);
      wx.navigateTo({
          url: "../../pages/itemDetail/itemDetail?name=" + name + '&url=' + url,
      });
  }
})