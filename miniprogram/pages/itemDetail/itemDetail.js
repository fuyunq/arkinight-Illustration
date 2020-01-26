// miniprogram/pages/itemDetail/itemDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dropButton:'展开',
        dropStat:[],
        dropState:false,
        itemDetail:{},
        dropStatList:[],
        name:'',
        url:'',
        desc:'加载中...',
        usage:'加载中...'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        let name = options.name;
        let url = options.url;

        this.setData({
            name:name,
            url:url
        })
        var that = this;
        wx.cloud.callFunction({
            // 云函数名称
            name: 'getItemDetail',
            // 传给云函数的参数
            data: {
                name:name
            },
            success: function (res) {
                console.log(res);
                that.setData({
                    desc: res.result.itemDetail.item.description,
                    usage: res.result.itemDetail.item.usage,
                    dropStatList: res.result.itemDetail.dropStatList
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
    touchDropStat:function(){
        if (this.data.dropState) {
            this.setData({
                dropState: !this.data.dropState,
                dropButton: '展开'
            })
        } else {
            this.setData({
                dropState: !this.data.dropState,
                dropButton: '收起'
            })
        }
    }
})