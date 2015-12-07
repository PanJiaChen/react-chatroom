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
        if(state.results.length>0){
            var url=state.results[0].url['liveHls'];
            
            console.log('试试'+$('.video-container').html())
                var srcPath =(
                    "http://wscn.cdn.wallstreetcn.com/wscn/js/swise-player/sewise.player.min.js?"+
                    "server=vod&"+
                    "type=m3u8&"+
                    "autostart=true"+
                    "&starttime=0&"+
                    "buffer=2&"+
                    "lang=en_US&"+
                    "logo=http://onvod.sewise.com/libs/swfplayer/skin/images/logo.png&"+
                    "skin=vodTransparent&"+
                    "videourl="+url
                )
                var script = document.createElement('script');
                script.type = "text/javascript";
                script.src = srcPath ;
                //用JQ的append方法动态添加脚本会造成脚本被执行两次，所以这里改为原生动态添加脚本的方式。
                $("#video-mount").get(0).appendChild(script);
        }
        return (
            <div id='video-mount' className='video-container'>
                
            </div>
        )
    }

}

export default VideoContainer;