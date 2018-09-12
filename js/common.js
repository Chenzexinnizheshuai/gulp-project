function EvenListener(event, evenType, fun, isCapture) {
	if (event.addEventListener) {
		event.addEventListener(evenType, fun, isCapture);
	} else {
		event.attachEvent("on" + evenType, fun);
	}
}
//Cookie封装
function setcookie(key, value, expires, path) {
	var date = new Date();
	switch (arguments.length) {
		case 0:
		case 1:
			console.error("你的输入格式是不对的");
			break;
		case 2:
			document.cookie = key + "=" + value;
			break;
		case 3:
			{
				if ((typeof expires) == "number") {
					date.setSeconds(date.getSeconds() + expires);
					document.cookie = key + "=" + value + "; expires=" + date;
					console.log(document.cookie);
				} else if (typeof expires == "string") {
					document.cookie = key + "=" + value + "; path=" + date;
				} else {
					document.cookie = key + "=" + value;
				}
				break;
			}
		case 4:
			{
				document.cookie = key + "=" + value + "; expires=" + (se + expires) + "; path=" + path;
				break;
			}
	}
}

//Cookie获取
function getcookie(key) {
	var cookie = document.cookie;
	var cookieArr = cookie.split("; ");
	var value = null;
	cookieArr.forEach(function (item) {
		var itemArr = item.split("=");
		if (itemArr[0] == key) {
			value = itemArr[1];
		}
	});
	if (value == null) {
		console.error("找不到该cookie");
		return;
	}
	return value;
}

function speed_cut(ele,start,end,fun){//减速运动
	var count = 0;
	var spead = 30;
	ele.Timer = setInterval(function(){
		count+=1;
		clearInterval(ele.Timer);
		ele.style.left =start + spead+count+"px" ;
		// console.log(ele.style.left);
		if(parseInt(ele.style.left)>=end-ele.offsetWidth){
			console.log(55);
			clearInterval(ele.Timer);
			fun?fun():"";
		}
		
	},30);
	
}

//滑动元素节点
function slideNode(ele,cellbackfunction) {
	var father = ele.parentNode || window;
	var www = father.offsetLeft || 0;
	var TTT = father.offsetTop || 0;
	var allleft = ele.offsetLeft;
	// console.log(allleft);
	while (father) { //所有父节点的offsetleft加上自身的offset之和
		if (father.parentNode == null) {
			break;
		}
		allleft += father.offsetLeft;
		father = father.parentNode;
	}
	ele.onmousedown = function (e) {
		document.onmousemove = function (e2) {
			var fatherWidth = ele.parentNode.offsetWidth || window.innerWidth;
			var fatherHeight = ele.parentNode.offsetHeight || window.innerHeight;
			if(parseInt(ele.style.left)>=fatherWidth - ele.offsetWidth){
				cellbackfunction();
			}
			ele.style.left = Math.max(0, Math.min(fatherWidth - ele.offsetWidth, e2.clientX - allleft - e.offsetX)) + "px";
			ele.style.top = Math.max(0, Math.min(fatherHeight - ele.offsetHeight, e2.clientY - TTT - e.offsetY)) + "px";
			if(parseInt(ele.style.left)>=(parseInt(fatherWidth/2)-ele.offsetWidth)){
				// alert(fatherWidth/2);
				
				var start = parseInt(ele.style.left);
				speed_cut(ele,start,parseInt(fatherWidth),function(){
					
					alert(55);
					console.log("father"+fatherWidth);//每次move都会生成这个方法
					console.log(ele.style.left);
					cellbackfunction();
					return 0 ;
				});
				document.onmousemove = null;
			}
		}
	}
	ele.onmouseup = function () {
		document.onmousemove = null;
	}
}

function bind(fn, target) {
	target._chenzexin_zhenshuai = fn;
	return function () {
		target._chenzexin_zhenshuai();
	};
}
//寻找父元素
function findParent(ele) {
	if (ele.parentNode) {
		return findParent(ele.parentNode);
	} else {
		return ele;
	}

}

function getStyle(ele) {
	if (ele.currentStyle) {
		return ele.currentStyle;
	} else {
		return getComputedStyle(ele);
	}
}

function disappear(ele, callback) { //元素消失opacity
	clearInterval(ele.timer);
	ele.timer = setInterval(function () {
		ele.style.opacity = getComputedStyle(ele).opacity;
		if (ele.style.opacity <= 0) {
			clearInterval(ele.timer);
			callback ? callback() : "";
		}
		
		ele.style.opacity = (ele.style.opacity) - 0.1;
	}, 30);
}

function appear(ele, callback) { //元素出现opacity
	clearInterval(ele.timer);
	var c = parseInt(getComputedStyle(ele).opacity);
	ele.timer = setInterval(function () {
		ele.style.opacity = getComputedStyle(ele).opacity;
		if (c >= 1) {
			
			clearInterval(ele.timer);
			callback ? callback() : "";
		}
		c += 0.1;
		ele.style.opacity = c;

	}, 30);
}
//限定一个数字的大小范围
function section(val, min, max) {
	return Math.max(min, Math.min(max, val));
}

(function(){
	if(!document.getElementsByClassName){
		document.getElementsByClassName = function(classname){
			var allEle = document.getElementsByTagName("*");
			var temp = [];
			for(var i=0; i<allEle.length; i++){
				if( allEle[i].className.indexOf(classname) != -1){
					temp.push( allEle[i] );
				}
			}
			return temp;
		}
	}
})();

//随机数
function randomNum(max){
	return parseInt(Math.random()*max);
}

//二元一次方程
function paowuxian(ele,end){//ele:要动的元素end：移动的终点
	//y=axx+bx
	var a = -0.002;
	var eleX = 0;
	var endNode = {
		Y:end.offsetTop,//终点的纵坐标
		X:end.offsetLeft,//终点的纵坐标
	}
	var eleNode = {
		Y:ele.offsetTop,//原点/ele的纵坐标
		X:ele.offsetLeft//原点/ele的横坐标
	}
	
	var b = (-endNode.Y-a*endNode.X*endNode.X)/endNode.X;//y=axx+bx <--b
	setInterval(function(){
		eleX+=5;
		ele.style.left = eleNode.X+eleX+"px";
		ele.style.top = -(a*ele.offsetLeft*ele.offsetLeft+b*ele.offsetLeft)+eleNode.X+"px";
		//因为纵坐标是相反的  所以要乘负一
	},30);
	
}
function paowuxian2(ele,endNode){//ele:要动的元素end：移动的终点
	//y=axx+bx
	var a = -0.002;
	var eleX = 0;

	var eleNode = {
		Y:ele.offsetTop,//原点/ele的纵坐标
		X:ele.offsetLeft//原点/ele的横坐标
	}
	
	var b = (-endNode.Y-a*endNode.X*endNode.X)/endNode.X;//y=axx+bx <--b
	var timer = setInterval(function(){
		eleX+=50*Math.random();
		ele.style.left = eleNode.X+eleX+"px";
		ele.style.top = -(a*ele.offsetLeft*ele.offsetLeft+b*ele.offsetLeft)+eleNode.X+"px";
		console.log(ele.style.top);
		//因为纵坐标是相反的  所以要乘负一
		
	},30);
	
}

//生成随机数
function randomNumber(start,end){
	return (end-start)*Math.random()+start;
	
}
//加速运动
function jiasuyundong(ele,speed,aspeed,end){//jiasuyundong(元素,初速度,加速度,终点位置对象)
	// var endY = end.Y;
	var endX = end.X;
// 	var aspeed = -1;
// 	var speed = 20; 
	var t = 0;
	var timer = setInterval(function(){
		t++;
		ele.style.left = 0.5*aspeed*randomNumber(-5,5)*t*t+speed*t +"px";
		ele.style.top = 0.5*aspeed*randomNumber(-5,5)*t*t+speed*t +"px";
		console.log(ele.style.opacity);
		ele.style.opacity = getStyle(ele).opacity;
		ele.style.opacity -=t*0.01; 
		console.log(ele.style.opacity);
		if(parseInt(getStyle(ele).left)>endX){
			
			clearInterval(timer);
		}
	},30)
	
}

//随机颜色
function randomRGB(){
	return "rgb("+parseInt(randomNumber(0,255))+","+parseInt(randomNumber(0,255))+","+parseInt(randomNumber(0,255))+")";
}



