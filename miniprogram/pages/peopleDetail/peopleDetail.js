// miniprogram/pages/peopleDetail/peopleDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseInfo: {},
    peopleImageState: false,
    peopleImageButton: '展开',
    peopleDetail: null,
    desc: '',
    stageList: ['初始', '精英1', '精英2'],
    peopleImageList: [],
    icon: '',
    talentList: [],
    talentState: false,
    talentButton: '展开',
    name: '',
    skillList: []
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // options.name =  '12F';
    let cn = options.name;
    this.setData({
      name: cn
    })
    let icon = options.icon;
    this.setData({
      icon: icon
    })
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
          desc: res.data[0].itemDesc,
          peopleDetail: res.data[0]
        })
      });
    db.collection('character_img').where({
        cn: cn
      }).limit(1)
      .get().then(res => {
        console.log(res);
        let imgList = new Array();
        if (res.data[0].stage0) {
          imgList.push(res.data[0].stage0)
        }
        if (res.data[0].stage1) {
          imgList.push(res.data[0].stage1)
        }
        if (res.data[0].stage2) {
          imgList.push(res.data[0].stage2)
        }
        console.log(imgList);
        this.setData({
          peopleImageList: imgList,
          name: cn
        })
      })
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getTalentList',
      // 传给云函数的参数
      data: {
        name: this.data.name
      }
    }).then(res => {
      this.setData({
        talentList: res.result.talentList
      })
      console.log(res);
    })
    console.log(this.data.name);
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getBase',
      // 传给云函数的参数
      data: {
        name: this.data.name
      }
    }).then(res => {
      this.setData({
        skillList: res.result.skillList
      })
      console.log(res);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  touchTalentImage: function() {
    if (this.data.talentState) {
      this.setData({
        talentState: !this.data.talentState,
        talentButton: '展开'
      })
    } else {
      this.setData({
        talentState: !this.data.talentState,
        talentButton: '收起'
      })
    }

  },
  touchBaseInfo:function(){
    if (this.data.talentState) {
      this.setData({
        talentState: !this.data.talentState,
        talentButton: '展开'
      })
    } else {
      this.setData({
        talentState: !this.data.talentState,
        talentButton: '收起'
      })
    }
  }
})