/**
 * Created by jiachenpan on 15/11/11.
 */
<style>
    .analysis-container{
    padding: 20px;
}
    .url-print{
    margin - top: 20px;
    display: block;
}
    input{
    width: 260px;
}
    .btn{
    margin - left: 60px;
}
</style>

< div
class
= 'analysis-container js-analysis-container'
data - timestamp = '<?=$timestamp ?>'
data - appid = '<?=$appid?>'
data - sign = '<?=$sign?>' >
    < input
class
= 'url-input'
placeholder = "请贴入乐视网url"
value = 'http://www.letv.com/ptv/vplay/23916152.html' >
    < button
class
= "btn btn-primary transform-btn" >
    < i
class
= "icon-beaker align-top bigger-125" > < / i >
    transform
    < / button >
    < input
class
= 'url-print' >

    < script
id = "entry-template"
type = "text/x-handlebars-template" >
    {
{#each
    list
}
}

{
    {/
        each
    }
}
</script>
</div>


<script>
    (function(root, factory) {
    if (typeof define === 'function' && define.amd) {
    require(["jquery"], factory);
} else {
    factory(root.jQuery);
}
})(this, function($) {

    var patt = /vplay\/(\d+)\.html/;
    var timestamp=$('.js-analysis-container').attr('data-timestamp');
    var appid=$('.js-analysis-container').attr('data-appid');
    var sign=$('.js-analysis-container').attr('data-sign');

    var apiUrl="http://www.91bee.com/api/wallstreet/v1/"+timestamp+"/"+ appid+"/"+sign+".do";
    getAjax(apiUrl)

    //handlerbar
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);

    function getAjax(apiUrl){
    $.ajax({
    dataType: "JSONP",
    url:apiUrl,
    type: "GET"
}).done(function (resp) {
    console.log(resp)
}).fail(function (resp) {
});
}


    $('.transform-btn').on('click',function(){
    var inputUrl=$('.url-input').val();
    var id=inputUrl.match(patt)
    console.log(id[1])

})



})
</script>


<?= $timestamp ?>
<br/>
<?= $appid ?>
<br/>
<?= $sign ?>
<br/>