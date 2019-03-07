Page({
    data: {
        arr: []
    },
    onLoad() {
        let record = wx.getStorageSync('record')
        this.setData({
            arr: record
        })
    }
})