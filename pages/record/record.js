Page({
    data: {
        arr: []
    },
    onLoad() {
        let record = wx.getStorageSync('record')
        this.setData({
            arr: record
        })
    },
    clearRecord() {
        wx.removeStorageSync('record')
        this.setData({
            arr: []
        })
    }

})