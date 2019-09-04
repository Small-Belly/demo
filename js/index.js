window.onload = function() {
	var mySwiper = new Swiper("#swiper1",{
		autoplay: {
			delay: 2500,
			stopOnLastSlide: false,
			disableOnInteraction: false,
			},
        direction:"horizontal",/*横向滑动*/
        loop:true,/*形成环路（即：可以从最后一张图跳转到第一张图*/
		pagination: {
			el: '.swiper-pagination',
			bulletElement : 'li',
		  }
	});
	var mySwiper2 = new Swiper("#swiper2",{
		autoplay: false,
		direction:"horizontal",/*横向滑动*/
		slidesPerView : 3, /*显示的数量 */
		slidesPerGroup : 1,	/*滑动的数量 */
		spaceBetween : 20    /*间隔 */
	});
	downTime();
};

//定义倒计时
function downTime() {
	//操作DOM
	var skTime = document.querySelector(".sk_time");
	//所有的span
	var spans = skTime.querySelectorAll("span");
	//需要倒计时的时间长度
	var time = 5 * 60 * 60;
	var timer = null;
	timer = setInterval(function () {
	  if (time <= 0) {
		clearInterval(timer);
		return false;
	  }
	  time--;
	  //格式化时间
	  var h = Math.floor(time / 3600);
	  var m = Math.floor((time / 60) % 60);
	  var s = time % 60;
  
  
	  spans[0].innerHTML = Math.floor(h / 10);
	  // console.log(Math.floor(h/10));
	  spans[1].innerHTML = h % 10;
	  spans[3].innerHTML = Math.floor(m / 10);
	  spans[4].innerHTML = m % 10;
	  spans[6].innerHTML = Math.floor(s / 10);
	  spans[7].innerHTML = s % 10;
	}, 100);
};
