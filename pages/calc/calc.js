Page({
    data: {
        result: '0',
        activeMes: '',
        tempArr: [],
        tempStr: ''
    },
    inputOrder(e) {
        this.setData({
            activeMes: ''
        })
        let eleID = e.target.id
        let tempNum = e.target.id.slice(3)
        let arr = ['0','1','2','3','4','5','6','7','8','9']
        if (arr.indexOf(tempNum) >= 0 || eleID === 'spot') {
            //点击的按钮是0-9或者是小数点
            if (eleID === 'spot') {
                this.data.tempStr += '.'
            } else {
                this.data.tempStr += tempNum
            }
            this.setData({
                result: this.data.tempStr
            })
        } else if (eleID === 'plus') {
            //点击的按钮是‘+’
            if(this.data.tempStr) {
                this.data.tempArr.push(this.data.tempStr)
                this.data.tempArr.push('+')
                this.setData({
                    tempStr: ''
                })
            }
        }
        // console.log(this.data.tempStr)

    },
    startOrder(e) {
        this.setData({
            activeMes: e.target.id
        })
    }
})