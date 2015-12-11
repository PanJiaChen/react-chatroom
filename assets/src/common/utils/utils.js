import getApiUrl from './getApiUrl.js'
import ajax from './ajax.js'
import $ from 'jquery'
const Utils = {}

var toString = Object.prototype.toString
Utils.Type={
    isArray(obj){
        return toString.call(obj) == '[object Array]';
    },
    isFunction(obj){
        return typeof obj === 'function'
    }
}

Utils.State={
    setShallow(originState,state){
        var newState =  Object.assign({},state)
        for(var i in originState){
            if( !(i in newState) ){
                newState[i] = originState[i];
            }
        }
        return newState;
    }
}

Utils.Url={
    generate(url,queryObj){
        var ret = [];
        for (var d in queryObj)
            ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(queryObj[d]));
        var str =  ret.join("&");
        if(url.indexOf('?')==-1){
            return url + '?' + str;
        }else{
            return url+str;
        }
    }
}

function _d(i) {
    return i < 10 ? '0' + i : i
}


Utils.getApiUrl=getApiUrl
Utils.ajax=ajax



Utils.Scroll= createScrollMgr()


Utils.formatTime=function(time){
    var time = +time * 1000;
    var d =new Date(time);
    var now = Date.now();

    var diff = (now-d)/1000;

    if(diff < 30) {
        return '刚刚'
    } else if(diff < 3600){ //less 1 hour
        return Math.ceil(diff /60)+'分钟前'
    } else if(diff < 3600*24){
        return Math.ceil(diff/3600)+'小时前'
    } else if(diff < 3600*24*2){
        return '1天前'
    }
    return `${d.getMonth()+1}月${d.getDate()}日${d.getHours()}时`
}

Utils.formatTimeTwo=function(time){
    var time = +time * 1000;
    var d =new Date(time);
    return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日${d.getHours()}:${d.getMinutes()}分`
}

Utils.showLoading=function(target){
    $('#js-loading').attr('class','loading-container show');
    setTimeout(function(){
        $('#js-loading').attr('class','loading-container hide');
    },2000)
}

Utils.hideLoading=function(){
    $('#js-loading').attr('class','loading-container hide')
}

Utils.createLoaidng=function(){
    var $loading = $(
        '<div id="js-loading">'+
            '<div class="la-ball-spin la-2x">' +
                '<div></div>' +
                '<div></div>' +
                '<div></div>' +
                '<div></div>' +
                '<div></div>' +
                '<div></div>' +
                '<div></div>' +
                '<div></div>' +
            '</div>'+
        '</div>'
    );
    $('body').append($loading.clone())

}

Utils.splitUrl=function(href){
    var params = [];
    var url = href;
    var hash = url.slice(url.indexOf("?") + 1).split('&');
    for (var i = 0; i < hash.length; i++) {
       var h = hash[i].split("=");
        params.push(h[0]);
        params[h[0]] = h[1];
    }
    return params;
}
 

function createScrollMgr(){
    var scrollMap={}

    return {
        restoreScroll(key){
            if(!(key in scrollMap)){
                scrollMap[key] = {
                    x:0,
                    y:0
                }
            }
            var _s =  scrollMap[key]
            const x = _s.x,
                y = _s.y;
            setTimeout(function(){
                window.scrollTo(x,y);
            },0)
        },
        setScroll(key){
            scrollMap[key] = {
                x:window.pageXOffset || document.documentElement.scrollLeft,
                y:window.pageYOffset || document.documentElement.scrollTop
            }
        },
        deleteScroll(key){
            delete scrollMap[key];
        }
    }
}

export default Utils