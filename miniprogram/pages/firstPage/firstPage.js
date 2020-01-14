// miniprogram/pages/firstPage/firstPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:[],
    buttonList:[],
    currentPage:0,
    isLoading:false,
    lastSortId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.cloud.callFunction({
          // 云函数名称
          name: 'add',
          // 传给云函数的参数
          data: {
              a: 1,
              b: 2,
          },
          success: function (res) {
              console.log(res);
              console.log(res.result.sum) // 3
          },
          fail: console.error
      })
      // let arrayList = new Array();
      // for(let i =0;i<20;i++){
      //     let o = new Object;
      //     o.url = "cloud://test1-0woef.7465-test1-0woef-1300017080/img/chafen_yule.jpg";
      //     o.text = "1234";
      //     arrayList.push(o);
      // }
      // console.log(arrayList);
      // this.setData({
      //     array: arrayList
      // })
    // const db = wx.cloud.database({
    //   env:'test1-s9ptf'
    // });
    // db.collection('people_info')
    //   .limit(21)
    //   .orderBy('sort_id','asc')
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
    this.setIcon();
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
    this.setIcon();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  setIcon:function(){
    let loading = this.data.isLoading;
    if (loading){
      return;
    }
    let lastId = this.data.lastSortId;
    const db = wx.cloud.database({
      env: 'test1-s9ptf'
    });
    let arrayList = this.data.array;
    const _ = db.command
    db.collection('people_info')
    .where({
      sort_id: _.gt(lastId)
    })
      .limit(15)
      .orderBy('sort_id', 'asc')
      .get().then(res => {
        let list = res.data;
        if(list.length>0){
          lastId = list[list.length-1].sort_id;
        }
        arrayList = arrayList.concat(list);
        this.setData({
          array: arrayList,
          lastSortId:lastId
        })
        console.log(arrayList);
      });
  },
  touchPeople:function(event){
      console.log(event);
      let sortId = event.currentTarget.dataset.sort_id;
      wx.navigateTo({
          url: "../../pages/peopleDetail/peopleDetail?sortId=" + sortId,
      });
  }
})