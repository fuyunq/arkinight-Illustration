// miniprogram/pages/firstPage/firstPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    buttonList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let arrayList = new Array();
      for(let i =0;i<20;i++){
          let o = new Object;
          o.url = "cloud://test1-0woef.7465-test1-0woef-1300017080/img/chafen_yule.jpg";
          o.text = "1234";
          arrayList.push(o);
      }
      console.log(arrayList);
      this.setData({
          array: arrayList
      })
    // const db = wx.cloud.database({
    //   env:'test1-0woef'
    // });
    // db.collection('picture')
    //   .where({
    //     type: 1
    //   })
    //   .limit(10)
    //   .get().then(res=>{
    //     this.setData({
    //       array:res.data
    //     })
    //     console.log(res);
    //   });
    // db.collection('button_list')
    //   .orderBy('weight', 'asc')
    //   .limit(10)
    //   .get().then(res=>{
    //     this.setData({
    //       buttonList: res.data
    //     })
    //   });
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
      let list = this.data.array;
      for (let i = 0; i < 10; i++) {
          let o = new Object;
          o.url = "cloud://test1-0woef.7465-test1-0woef-1300017080/img/chafen_yule.jpg";
          o.text = "1234";
          list.push(o);
      }
      this.setData({
          array: list
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})