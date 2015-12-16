import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './audio.less'

class AudioContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    state = {
        
    }

    componentDidMount() {
        const store = this.props.store;
        store.loadStreamAjax('false')
    }
    render() {
        const store = this.props.store;
        const state = store.getState();
        const hasInit=$('#audio-mount').hasClass('hasInit')
        if(state.results.length>0 && !hasInit){
            const end=state.results[0].disp['end'];
            const now=Date.parse(new Date())/1000;
            if(now>end){
                //重播
                var url=state.results[0].url['playbackHls'].split('?')[0];
                url=url+'%3Fstart=0%26end=0'
            }else{
                //直播
                var url=state.results[0].url['liveHls'];
            }
           var srcPath =(
                "http://wscn.cdn.wallstreetcn.com/wscn/js/swise-player/sewise.player.min.js?"+
                "server==vod&"+
                "type==m3u8&"+
                "autostart==true"+
                "&starttime==10&"+
                "buffer==2&"+
                "title==华尔街见闻&"+
                "lang==en_US&"+
                "claritybutton==disable&"+
                "poster==http://wscn.cdn.wallstreetcn.com/wscn/img/logo&2x.png&"+
                "skin==vodTransparent&"+
                "videourl=="+url
            )
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = srcPath ;
            //用JQ的append方法动态添加脚本会造成脚本被执行两次，所以这里改为原生动态添加脚本的方式。
            $("#audio-mount").addClass('hasInit').get(0).appendChild(script);
        }
        return (
            <div id='audio-mount' className='audio-container'>
                
            </div>
        )
    }

}

export default AudioContainer;