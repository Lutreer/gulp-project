'use strict'
ghtApp.directive('topBrand',function(){
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'templates/commonTemplates/top-brand.html'
	};
});

ghtApp.directive('baiduMaps',function(){
	return{
		restrict: 'A',
		link: function(scope, element, attrs) {
			var map = new BMap.Map("baidu-maps"); // 创建Map实例
	    	var point = new BMap.Point(39.919422,116.417773);//默认初始化地图中心点（BJ）
	    	map.centerAndZoom(point,12);// 初始化地图,设置中心点坐标和地图级别
	    	map.enableScrollWheelZoom(true);//开启鼠标滚轮缩放
	    	map.enableDragging();//拖拽
	    	var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
	    	var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
	    	map.addControl(top_left_control);        
	    	map.addControl(top_left_navigation);   
	    	function myFun(result){//ip定位初始化城市
	    		var cityName = result.name;
	    		map.setCenter(cityName);
	    	}
	    	var myCity = new BMap.LocalCity();
	    	myCity.get(myFun);


		}
	}
});

