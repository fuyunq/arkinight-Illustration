// miniprogram/pages/peopleDetail/peopleDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseInfoList:[],
    baseInfoState:false,
    baseInfoButton:'展开',
    peopleImageState: false,
    peopleImageButton: '展开',
    peopleDetail: {},
    desc: '',
    stageList: ['初始', '精英1', '精英2'],
    peopleImageList: [],
    icon: '',
    talentList: [],
    talentState: false,
    talentButton: '展开',
    name: '',
    skillState:false,
    skillButton:'展开',
    skillList: [],
    baseSkillLevelUpCostList:[],
    baseSkillLevelUpCostButton: '展开',
    baseSkillLevelUpCostState:false,
    peopleStoryList:[],
    peopleStoryListButton:'展开',
    peopleStoryListState:false,
    buildSkillState:false,
    voiceTextState:false,
      rangeList: [],
      rangeButton: '展开',
      rangeState: false,
      test:{'title':'hahha','showState':true},
      buttonList:[],
      dataTableList:[],
      newPeopleDetail:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // options.name =  '12F';
    var that = this;
    let cn = options.name;

    this.setData({
      name: cn
    })
    let icon = options.icon;
    this.setData({
      icon: icon
    });
    wx.getStorage({
      key: 'currentPeople',
      success(res) {
        res.data.rarity = res.data.rarity+1;
        that.setData({
          peopleDetail:res.data
        })
      }
    });
      wx.getStorage({
          key: 'peopleDetailList',
          success(res) {
              that.setData({
                  dataTableList: res.data
              })
              
              console.log(JSON.stringify(that.data.dataTableList));
          }
      });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
      
      let cn = this.data.name;
      const db = wx.cloud.database({
          env: 'test1-s9ptf'
      });
      db.collection('character')
          .where({
              name: cn
          })
          .limit(1)
          .get().then(res => {
              
              this.setData({
                  desc: res.data[0].itemDesc
              })
          });
      db.collection('character_img').where({
          cn: cn
      }).limit(1)
          .get().then(res => {
              
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
          
      })
      
      wx.cloud.callFunction({
          // 云函数名称
          name: 'getBase',
          // 传给云函数的参数
          data: {
              name: this.data.name
          }
      }).then(res => {

          this.setData({
              skillList: res.result.skillList,
              baseInfoList: res.result.baseInfoList,
            baseSkillLevelUpCostList: res.result.baseSkillUpCostList
          })
      })

      wx.cloud.callFunction({
          // 云函数名称
          name: 'getNewDetail',
          // 传给云函数的参数
          data: {
              name: this.data.name
          }
      }).then(res => {
          
          this.setData({
              newPeopleDetail:res.result[0]
          })
          console.log(this.data.newPeopleDetail);
      })

      wx.cloud.callFunction({
          // 云函数名称
          name: 'getPeopleStoryList',
          // 传给云函数的参数
          data: {
              name: this.data.name
          }
      }).then(res => {
          
          this.setData({
              peopleStoryList: res.result
          })

      })

      wx.cloud.callFunction({
          // 云函数名称
          name: 'getPeopleDetail',
          // 传给云函数的参数
          data: {
              name: this.data.name
          }
      }).then(res => {
          let dataTableList = this.data.dataTableList;
          let peopleDetail = res.result.peopleDetail;
          
          for (let i = 0; i < peopleDetail.length;i++){
              dataTableList[i].tableData = peopleDetail[i];
          }
          
          this.setData({
              dataTableList: dataTableList
          })
          console.log(JSON.stringify(this.data.dataTableList));
      })
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
  touchPeopleImage:function(event){
      wx.previewImage({
          current: this.data.peopleImageList[0],   //当前图片地址
          urls: this.data.peopleImageList       //所有要预览的图片的地址集合 数组形式
      })
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
    if (this.data.baseInfoState) {
      this.setData({
          baseInfoState: !this.data.baseInfoState,
          baseInfoButton: '展开'
      })
    } else {
      this.setData({
          baseInfoState: !this.data.baseInfoState,
        baseInfoButton: '收起'
      })
    }
  },
  touchSkill: function () {
    if (this.data.skillState) {
      this.setData({
        skillState: !this.data.skillState,
        skillButton: '展开'
      })
    } else {
      this.setData({
        skillState: !this.data.skillState,
        skillButton: '收起'
      })
    }
  },
//   touchBaseSkillLevelUpCostButton:function(){
//     if (this.data.baseSkillLevelUpCostState) {
//       this.setData({
//         baseSkillLevelUpCostState: !this.data.baseSkillLevelUpCostState,
//         baseSkillLevelUpCostButton: '展开'
//       })
//     } else {
//       this.setData({
//         baseSkillLevelUpCostState: !this.data.baseSkillLevelUpCostState,
//         baseSkillLevelUpCostButton: '收起'
//       })
//     }
//   },
    touchPeopleStoryButton: function () {
        if (this.data.peopleStoryListState) {
            this.setData({
                peopleStoryListState: !this.data.peopleStoryListState,
                peopleStoryListButton: '展开'
            })
        } else {
            this.setData({
                peopleStoryListState: !this.data.peopleStoryListState,
                peopleStoryListButton: '收起'
            })
        }
    },
    touchBuildSkill:function(){
        this.setData({
            buildSkillState:!this.data.buildSkillState
        })
    },
    touchVoiceText: function () {
        this.setData({
            voiceTextState: !this.data.voiceTextState
        })
    },
    touchButton: function (event){

        let idx = event.currentTarget.dataset.index;
        let ownDataTableList = this.data.dataTableList;
        ownDataTableList[idx].showState = !ownDataTableList[idx].showState;
        this.setData({
            dataTableList: ownDataTableList
        })
    }

})