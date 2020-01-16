// miniprogram/pages/filterPage/filterPage.js
Page({


    /**
     * 页面的初始数据
     */
    data: {
        chooseGroup1: [{
                name: '挡1',
                value: '1'
            },
            {
                name: '挡2',
                value: '2'
            },
            {
                name: '挡3',
                value: '3'
            },
        ],
        chooseGroup2: [{
                name: '物理',
                value: '1'
            },
            {
                name: '法术',
                value: '2'
            },
        ],
        chooseGroup3: [{
                name: '单体',
                value: '1'
            },
            {
                name: '群体',
                value: '2'
            },
        ],
        chooseGroup4: [{
                name: '挡1',
                value: '1'
            },
            {
                name: '挡2',
                value: '2'
            },
            {
                name: '挡3',
                value: '3'
            },
        ],
        chooseGroup5: [{
                name: '挡1',
                value: '1'
            },
            {
                name: '挡2',
                value: '2'
            },
            {
                name: '挡3',
                value: '3'
            },
        ],

        // classSelect:[],
        // items: [
        //     { name: '重装', value: '重装' },
        //     { name: '狙击', value: '狙击' },
        //     { name: '近卫', value: '近卫' },
        //     { name: '术士', value: '术士' },
        //     { name: '辅助', value: '辅助' },
        //     { name: '特种', value: '特种' },
        // ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
    checkboxChange: function(e) {
        // this.setData({
        //     classSelect: e.detail.value
        // })
        // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    }
})