import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'
import './video.less'

class VideoContainer extends Component {
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
        var content
        if(state.results.length>0 && !hasInit){
            const end=state.results[0].disp['end'];
            const now=Date.parse(new Date())/1000;
            const start=state.results[0].disp['start'];
            if(now>end){
                //直播播=结束
               return content=(<div className='not-start'>视频已结束~~</div>)
            }else if(now<end && now>start){
                //直播
                var url=state.results[0].url['liveHls'];
            }else if(start>now){
                //直播未开始
                return content=(<div className='not-start'>直播尚未开始请耐心等待~</div>)
            }
            var srcPath =(
                "http://wscn.cdn.wallstreetcn.com/wscn/js/swise-player/sewise.player.min.js?"+
                "server==vod&"+
                "type==m3u8&"+
                "autostart==true"+
                "&starttime==0&"+
                "buffer==2&"+
                "title==华尔街见闻&"+
                "lang==en_US&"+
                "claritybutton==disable&"+
                "poster==http://wscn.cdn.wallstreetcn.com/wscn/img/logo@2x.png&"+
                "skin==vodTransparent&"+
                "videourl=="+url
            )
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = srcPath ;
            //用JQ的append方法动态添加脚本会造成脚本被执行两次，所以这里改为原生动态添加脚本的方式。
            $("#video-mount").addClass('hasInit').get(0).appendChild(script);
        }
        return (
            <div id='video-mount' className='video-container'>
                {content}
            </div>
        )
    }
}

export default VideoContainer;