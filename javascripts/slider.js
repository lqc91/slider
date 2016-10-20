window.onload = function () {
	var slider = document.getElementById('slider');
	var imgList = document.getElementById('img-list');
	var pointer = document.getElementById('pointer').getElementsByTagName('li');
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');
	var index = 1, moved = false, playInterval = 3000, timer;
	function showPointer () {
		for (var i = 0; i < pointer.length; i++) {
			if (pointer[i].style.backgroundColor = '#b61b1f') {
				// 若为pointer[i].style.backgroundColor == '#b61b1f'则无法匹配
				// 浏览器会将十六进制转换为rgb？
				pointer[i].style.backgroundColor = '#3e3e3e';
				// 执行完if语句跳出for循环语句
				// break语句存在问题
				// break;
			}
			// 或将if语句替换为以下语句
			// pointer[i].style.backgroundColor = '#3e3e3e';
		}
		pointer[index-1].style.backgroundColor = '#b61b1f';
	}
	function move (offset) {
		moved = true;
		var newLeft = parseInt(imgList.style.left) + offset;
		var time = 300, interval = 30;
		// 若speed非整数，则动画效果存在问题，待修复
		var speed = offset/(time/interval);
		var go = function(){
			var currentLeft = parseInt(imgList.style.left);
			// 不可在go函数外将parseInt(imgList.style.left)赋值给新的变量
			// 递归的仅是go函数，若在函数外赋值，则新变量为固定值，无法实现动画
			if ((speed < 0 && currentLeft > newLeft) || (speed > 0 && currentLeft < newLeft)) {
				imgList.style.left = currentLeft + speed + 'px';
				setTimeout(go,interval);
			} else {
				moved = false;
				if (newLeft > -730) {
					imgList.style.left = -4380 + 'px';
				} else if (newLeft < -4380) {
					imgList.style.left = -730 + 'px';
				} else {
					imgList.style.left = newLeft + 'px';
				}
			}	
		}
		go();
	}
	prev.onclick = function () {
		if (index == 1) {
			index = 6;
		} else {
			index -=1;
		}
		showPointer();
		// 判断动画是否正在进行，若是，则点击无效
		if (!moved) {
			move(730);
		}
	}
	next.onclick = function () {
		if (index == 6) {
			index = 1;
		} else {
			index +=1;
		}
		showPointer();
		// 判断动画是否正在进行，若是，则点击无效
		if (!moved) {
			move(-730);
		}
	}
	for (var i = 0; i < pointer.length; i++) {
		pointer[i].onclick = function () {
			// 若点击小圆点为当前显示按钮和图片，则退出for循环语句
			// 下方if语句存在问题，待解决
			// if (this.style.backgroundColor == '#b61b1f') {
			// 	return;
			// }
			var currentIndex = parseInt(this.getAttribute('index'));
			// 计算当前点击小圆点与显示小圆点对应图片的距离
			var offset = -730 * (currentIndex - index);
			move(offset);
			index = currentIndex;
			showPointer();
		}
	}
	function autoPlay () {
		timer = setInterval(function(){
			next.onclick();
		},playInterval);
	}
	function stopPlay(){
		clearInterval(timer);
	}
	// 若写作slider.onmouseover = stopPlay();
	// slider.onmouseout = autoPlay();则发生错误。？
	slider.onmouseover = stopPlay;
	slider.onmouseout = autoPlay;
	autoPlay();
}