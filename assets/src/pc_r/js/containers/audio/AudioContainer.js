import {Component} from 'react'
import utils from '../../../../common/utils/utils.js'

class AudioContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    static contextTypes = {}

    state = {

    }

    componentDidMount() {
        $('.audio-container').append('<div id="vedio-mount" style="width: 600px;height: 400px;"></div>');
        console.log('试试'+$('.audio-container').html())
        var srcPath =(
        "http://wscn.cdn.wallstreetcn.com/wscn/js/swise-player/sewise.player.min.js?"+
        "server=vod&"+
        "type=m3u8&"+
        "autostart=true"+
        "&starttime=0&"+
        "buffer=5&"+
        "lang=en_US&"+
        "logo=http://onvod.sewise.com/libs/swfplayer/skin/images/logo.png&skin=vodWhite&videourl=http://pili-live-hls.wscn.wallstcn.com/wscn/chat_56_1130103516_rebirth_wallstcn_com.m3u8");
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = srcPath ;
        //用JQ的append方法动态添加脚本会造成脚本被执行两次，所以这里改为原生动态添加脚本的方式。
        $("#vedio-mount").get(0).appendChild(script);
        

        // $('.audio-container').append('<div id="vedio-mount" style="width: 600px;height: 400px;"></div>');
        // $.getScript("http://wscn.cdn.wallstreetcn.com/wscn/js/swise-player/sewise.player.min.js")
        //     .done(function() {
                
        //         $("#vedio-mount").html("<script type='text/javascript'>"
        //                 +SewisePlayer.setup({
        //                     server: "vod",
        //                     type: "m3u8",
        //                     videourl: "http://pili-live-hls.wscn.wallstcn.com/wscn/chat_56_1130103516_rebirth_wallstcn_com.m3u8",
        //                     autostart:"true",
        //                     starttime:"0",
        //                     lang:"zh_CN",
        //                     logo:"http://cv.qiaobutang.com/uploads/social_avatars/2015/9/10/10/55f0e5880cf20c2d88d33a43/large.JPG?v1441850761756",
        //                     skin: "vodWhite",
        //                     title: "Tile 标题",
        //                     buffer:"5",
        //                     claritybutton:"disable"})
        //             +"<\/script>")
        //     })
        //     .fail(function() {
        //         /* 靠，马上执行挽救操作 */
        // });
    }

    render() {
    
        return (
            <div className='audio-container'>
            ape
            </div>
        )
    }

}

export default AudioContainer;