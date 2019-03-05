Page({
    data: {
        result: '0',
        activeMes: ''
    },
    inputOrder(e) {
        this.setData({
            activeMes: ''
        })
    },
    startOrder(e) {
        this.setData({
            activeMes: e.target.id
        })
    }
})