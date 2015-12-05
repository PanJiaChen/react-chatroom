import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'

class VideoContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {}

    state = {

    }

    componentDidMount() {
        $('.video-container').append('<div id="video-mount" style="width: 600px;height: 400px;"></div>');
            console.log('试试'+$('.audio-container').html())
            var srcPath =(
            "http://wscn.cdn.wallstreetcn.com/wscn/js/swise-player/sewise.player.min.js?"+
            "server=vod&"+
            "type=m3u8&"+
            "autostart=true"+
            "&starttime=0&"+
            "buffer=5&"+
            "lang=en_US&"+
            "logo=http://onvod.sewise.com/libs/swfplayer/skin/images/logo.png&"+
            "skin=vodWhite&"+
            "videourl=http://pili-live-hls.wscn.wallstcn.com/wscn/chat_58_1201025545_rebirth_wallstcn_com.m3u8");
            var script = document.createElement('script');
            script.type = "text/javascript";
            script.src = srcPath ;
            //用JQ的append方法动态添加脚本会造成脚本被执行两次，所以这里改为原生动态添加脚本的方式。
            $("#video-mount").get(0).appendChild(script);
        }

    render() {
        return (
            <div className='video-container'>
                'video'
            </div>
        )
    }

}

export default VideoContainer;