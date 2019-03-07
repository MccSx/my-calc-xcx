Page({
    data: {
        result: '0',
        tempResult: '',
        activeMes: '',
        tempArr: [],
        tempStr: '',
        isCleared: false,
        record: []
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
                this.data.tempResult += '.'
            } else {
                this.data.tempStr += tempNum
                this.data.tempResult += tempNum
            }
            this.setData({
                result: this.data.tempResult
            })
            this.data.isCleared = false
        } else if (eleID === 'plus') {
            //点击的按钮是‘+’
            this.recordOperator('+')
        } else if (eleID === 'reduce') {
            //点击的按钮是‘-’
            this.recordOperator('-')
        } else if (eleID === 'ride') {
            //点击的按钮是‘×’
            this.recordOperator('×')
        } else if (eleID === 'except') {
            //点击的按钮是‘÷’
            this.recordOperator('÷')
        } else if (eleID === 'equal') {
            //点击的按钮是‘=’
            this.data.tempArr.push( parseFloat(this.data.tempStr) )
            let res = this.calculation(this.data.tempArr)

            if(wx.getStorageSync('record')) {
                this.data.record = wx.getStorageSync('record')
            }
            this.data.record.push(this.data.tempResult)
            wx.setStorageSync('record', this.data.record)

            this.setData({
                tempStr: '',
                tempResult: '',
                tempArr: [],
                result: res[0]+'',
                isCleared: false
            })
        } else if (eleID === 'clear') {
            //点击的按钮是‘清除’
            this.setData({
                tempStr: '',
                tempResult: '',
                tempArr: [],
                result: '0',
                isCleared: false
            })
        } else if (eleID === 'back' || eleID === 'i_back') {
            this.setData({
                result: this.data.tempResult.substring(0, this.data.tempResult.length - 1)
            })
            this.data.tempResult = this.data.tempResult.substring(0, this.data.tempResult.length - 1)
            if(this.data.tempStr) {
                this.data.tempStr = this.data.tempStr.substring(0, this.data.tempStr.length - 1)
            } else {
                this.data.tempArr.pop()
                this.data.isCleared = true
            }
        } else if (eleID === 'history' || eleID === 'i_history') {
            wx.navigateTo({
                url: '../result/result',
            })
        }
        // console.log(this.data.tempArr)

    },
    startOrder(e) {
        this.setData({
            activeMes: e.target.id
        })
    },
    recordOperator(op) {
        if (this.data.tempStr || this.data.isCleared) {
            this.data.isCleared || this.data.tempArr.push( parseFloat(this.data.tempStr) )
            this.data.tempArr.push(op)
            this.data.tempResult += op
            this.setData({
                tempStr: '',
                result: this.data.tempResult
            })
            this.data.isCleared = false
        }
    },
    calculation(arr) {
        while (arr.indexOf('÷') >= 0) {
            let i = arr.indexOf('÷')
            let tempRes = arr[i - 1] / arr[i + 1]
            arr.splice(i - 1, 3, tempRes)
        }
        while (arr.indexOf('×') >= 0) {
            let i = arr.indexOf('×')
            let tempRes = arr[i - 1] * arr[i + 1]
            arr.splice(i - 1, 3, tempRes)
        }
        while (arr.indexOf('+') >= 0) {
            let i = arr.indexOf('+')
            let tempRes = arr[i - 1] + arr[i + 1]
            arr.splice(i - 1, 3, tempRes)
        }
        while (arr.indexOf('-') >= 0) {
            let i = arr.indexOf('-')
            let tempRes = arr[i - 1] - arr[i + 1]
            arr.splice(i - 1, 3, tempRes)
        }
        return arr
    }
})