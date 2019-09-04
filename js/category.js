window.onload = function() {
	leftSwipe();
	var domBox = document.querySelectorAll('.hm_category_right');
	for(var i = 0;i < domBox.length;i++){
		itcast.iScroll({
		//swipeDom:document.querySelector('.hm_category_right'), //对象
		swipeDom:domBox[i],
		swipeType:'y', //y轴
		swipeDistance:100
	});
	}
	
}
function leftSwipe() {
	/*获取dom元素*/
	/*父盒子.hm_category_left*/
	var parentBox = document.querySelector('.hm_category_left');
	/*子盒子 ul*/
	var childBox = parentBox.querySelector('ul');
	var parentHeight = parentBox.offsetHeight;
	// console.log("父盒子高度："+parentHeight);
	var childHeight = childBox.offsetHeight;
	// console.log("父盒子高度："+childHeight);
	/*定义区间*/
	var maxPosition = 0;  /*最大的定位区间*/
	var minPosition = parentHeight - childHeight; /*最小的定位区间*/ 
	//console.log("最小的定位区间："+minPosition);、
	/*缓冲的距离*/
	var distance = 150;
	/*滑动区间*/
	var maxSwipe = maxPosition + 150;  /*最大滑动区间*/
	var minSwipe = minPosition - 150;  /*最小滑动区间*/
	/*添加过渡*/
	var addTransition = function() {
		childBox.style.webkitTransition = "all .2s"; /*兼容*/
		childBox.style.transition = "all .2s";
	};
	/*删除过渡*/
	var removeTransition = function() {
		childBox.style.webkitTransition = "none"; /*兼容*/
		childBox.style.transition = "none";
	};
	/*改变位置*/
	var setTranslateY = function(translateY) {
		childBox.style.webkitTransform = "translateY(" + translateY  + "px)";
		childBox.style.transform = "translateY(" + translateY + "px)";
	}; 
	/*1.滑动 touch*/
	/*参数*/
	var startY = 0;
	var moveY= 0;
	var distanceY = 0;
	/*记录当前定位*/
	var currY = 0;
	childBox.addEventListener('touchstart',function(e) {
		startY = e.touches[0].clientY;
	});
	childBox.addEventListener('touchmove',function(e) {
		moveY = e.touches[0].clientY;
		distanceY = moveY - startY;
		/*2.在一定的区间范围内滑动，通过控制滑动定位的区间的实现*/
		/*我们将要去做定位的位置，要在滑动区间范围内*/
		if((currY + distanceY) < maxSwipe && (currY + distanceY) > minSwipe){
			/*删除过渡*/
			removeTransition();
			/*做定位*/
			setTranslateY(currY + distanceY );
			console.log(currY + distanceY);
		}
	});
	/*避免模拟器上的bug问题事件冒泡机制*/
	window.addEventListener('touchend',function(e){
		/*3.在一定的区间内做定位/定位区间*/
		/*将要定位的位置大于/最大定位的时候*/
		if((currY + distanceY) > maxPosition) {
			currY = maxPosition;
			/*加过渡*/
			addTransition();
			/*设置位置*/
			setTranslateY(currY);
		}else if((currY + distanceY) < minPosition){ 
			currY = minPosition;
			/*加过渡*/
			addTransition();
			/*设置位置*/
			setTranslateY(currY);
		}else {
			/*设置当前的定位*/
			currY = currY + distanceY;
		}
		/*重置参数*/
		startY = 0;
		moveY= 0;
		distanceY = 0;
	});
	/*4.点击滑动到顶部改变当前的样式
	当滑动到底部的时候不需要做定位tap*/
	var lis = childBox.querySelectorAll('li');
	var show = document.getElementsByClassName("hm_category_right");
	console.log("show"+show.length);
	/*tap代替click作为点击事件*/
	itcast.tap(childBox,function(e){
		/*清除所有的当前样式*/
		for(var i=0;i<lis.length;i++){
			lis[i].className = " ";
			/*每个li赋予索引值*/
			lis[i].index = i;
		}
		console.log(e.target);
		var li = e.target.parentNode;  /*当前点击的li 触发源*/
		li.className = 'now';
		/*需要知道当前你需要去定位的位置 计算出来*/
		console.log(li.index);
		var translateY = -li.index * 40; /*向上滑动*/
		if(translateY > minPosition){
			currY = translateY;
			/*加过渡*/
			addTransition();
			/*去做定位*/
			setTranslateY(currY);
		}else{
			currY = minPosition;
			/*加过渡*/
			addTransition();
			/*去做定位*/
			setTranslateY(currY);
		}
		/*选项卡切换*/
		for(var i=0;i<show.length;i++){
			show[i].style.display = "none";
		}
		show[li.index].style.display="block";
	});
}