// pages/login/page0.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        connected: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        setTimeout(() => {
            wx.showLoading({
                title: '蓝牙连接中'
            })
            if (this.data.connected) {
                setTimeout(() => {
                    wx.hideLoading()
                    wx.navigateTo({
                        url: '../start/start',
                    })
                }, 1500);
            }
        }, 1800);

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