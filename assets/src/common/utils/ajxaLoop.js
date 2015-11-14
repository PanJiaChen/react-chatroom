function noop() {
}

export default class AjaxMgr {

    constructor(options = {}) {
        //this.url = options.url;
        //this.data = options.data;
        //this.dataType = options.dataType || 'jsonp'
        //this.ajaxOptins = options.ajaxOptins;
        this.options = options;

        this.done = options.done;
        this.fail = options.fail || noop;
        this.minInterval = options.minInterval || 5000;
        this.isLoop = options.isLoop || false;
        //this.maxRetryTimes = options.maxRetryTimes || 5;
        //this.retryTimes = 0;
    }

    setLoop(isLoop) {
        this.isLoop = isLoop;
        return this;
    }

    request() {
        this.time = Date.now();
        $.ajax(this.options)
            .done(e=> {
                this.done(e);
                //this.retryTimes = 0;
                if (!this.isLoop)return;
                var now = Date.now();
                var diff = now - this.time;
                var remain = this.minInterval - diff
                if (remain > 0) {
                    setTimeout(()=> {
                        this.request()
                    }, remain)
                } else {
                    this.request()
                }
            }).fail(e=> {
                this.fail(e);
                if (!this.isLoop) {
                    return;
                }

                //if(this.retryTimes > this.maxRetryTimes) return;
                //this.retryTimes++;

                var now = Date.now();
                var diff = now - this.time;
                var remain = this.minInterval - diff
                if (remain > 0) {
                    setTimeout(()=> {
                        this.request()
                    }, remain)
                } else {
                    this.request()
                }
            })

        return this;
    }

}
