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
    lastSortId:999,
    type:'all',
    classList: ['all', '近卫', '狙击', '重装', '特种', '医疗', '先锋','术师' ],
    classSelect:'all'
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
    this.setIcon(this.data.classSelect,true);
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
    this.setIcon(this.data.classSelect,false);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  setIcon:function(className,needClean){
    console.log('开始读取');
    console.log(className);
    console.log(needClean);
    let loading = this.data.isLoading;
    if (loading){
      return;
    }
    let lastId = this.data.lastSortId;
    console.log(lastId);
    const db = wx.cloud.database({
      env: 'test1-s9ptf'
    });
    let arrayList = this.data.array;
    const _ = db.command;
    let testDb = null;
    if(className=='all'){
      testDb = db.collection('people_info')
        .where({
          sort_id: _.lt(lastId),
        });
    }else{
      testDb = db.collection('people_info')
        .where({
          sort_id: _.lt(lastId),
          class: className
        });
    }
    
    // db.collection('people_info')
    // .where({
    //   sort_id: _.gt(lastId),
    //   class: '近卫'
    // })
    testDb
      .limit(15)
      .orderBy('sort_id', 'desc')
      .get().then(res => {
        console.log('返回值');
        console.log(res);
        let list = res.data;
        if(list.length>0){
          lastId = list[list.length-1].sort_id;
        }
        if(needClean){
          arrayList = list;
        }else{
          arrayList = arrayList.concat(list);
        }
        
        this.setData({
          array: arrayList,
          lastSortId:lastId
        })
        console.log(arrayList);
      });
  },
  touchPeople:function(event){
      console.log(event);
      let sortId = event.currentTarget.dataset.name;
    let icon = event.currentTarget.dataset.icon;
      wx.navigateTo({
          url: "../../pages/peopleDetail/peopleDetail?name=" + sortId+'&icon='+icon,
      });
  },
  chooseClass:function(event){
    this.setData({
      lastSortId:999
    })
      console.log(event);
      let className = event.currentTarget.dataset.name;
      this.setData({
        classSelect:className
      })
    this.setIcon(className,true);
  }
})