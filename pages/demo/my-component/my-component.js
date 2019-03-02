Component({
    properties: {
        innerText: {
            type: String,
            value: 'default value'
        }
    },
    methods: {
        onTap() {
            this.triggerEvent('myevent')
        }
    }
})