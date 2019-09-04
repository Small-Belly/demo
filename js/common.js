// 封装移动页面的通用功能代码
/*定义一个全局变量*/
window.itcast = {};/*存储  我们将要封装的  事件方法*/
/*设置 属性 定义一个  transitionEnd 一个事件绑定方法*/
itcast.transitionEnd  = function(dom,callback){
    /*过渡结束事件的绑定*/
    /*
     * 1.谁需要绑定  transitionEnd
     * 2.需要处理的函数
     * */
    if(dom && typeof dom === 'object'){
        dom.addEventListener('webkitTransitionEnd',function(){
            /* if(callback){
             callback();
             }*/
            callback && callback();
        });
        dom.addEventListener('transitionEnd',function(){
            callback && callback();
        });
    }

};
/*封装tap事件*/
itcast.tap = function(dom,callback){
    /*
    *tap:
     1.响应速度要比click快
     2.不能滑动过
    * */
    if(dom && typeof dom === 'object'){
        /*记录是否滑动过*/
        var isMove = false;
        // 记录刚刚触摸的事件 touchstart的触发事件
        var startTime = 0;
        dom.addEventListener('touchstart',function(e){
            /*new Date().getTime();获取时间戳*/
            startTime = Date.now();  
        });
        /*触摸滑动事件*/
        dom.addEventListener('touchmove',function(e){
            isMove = true;
        });
        /*触摸结束事件*/
        dom.addEventListener('touchend',function(e){
            /*
             *tap:
             1.响应事件的速度要比click快，在150ms以内  click 300ms 
             2.不能滑动过
             * */
            if((Date.now()-startTime) < 150 && !isMove){
                /*在end事件的时候才执行click需要执行的操作  提高的响应*/
                /*onclick = function(e){}*/
                callback && callback(e);
            }

            /*重置*/
            isMove = false;
            startTime = 0;
        })

    }
}

//640是原始设计图大小
var fontSizeAuto = function (){
	var viewportWidth = document.documentElement.clientWidth;
	if(viewportWidth > 640){ viewportWidth = 640; }
	if(viewportWidth < 320){ viewportWidth = 320; }
	document.documentElement.style.fontSize = viewportWidth/6.4 +'px';
}
fontSizeAuto();
