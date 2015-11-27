'use strict'

ghtApp.controller('tubaController', ['$scope', 'tubaFactory', function($scope,tubaFactory){

	//////////////////////////////////////
	var map = new BMap.Map("baidu-map"); // 创建Map实例
	var point = new BMap.Point(116.417773,39.919422);//默认初始化地图中心点（BJ）
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
	/////////////////////////////////////

    var localIcon = new BMap.Icon("img/localmarker.png", new BMap.Size(25, 46), {
		offset : new BMap.Size(10, 25),
		imageOffset : new BMap.Size(0, 0)
	});
    var tubaIcon = new BMap.Icon("img/tubamarker.png", new BMap.Size(25, 46), {
		offset : new BMap.Size(10, 25),
		imageOffset : new BMap.Size(0, 0)
	});

    $scope.baseStationNoObj = {};
    var BMarkerTuba;
	$scope.searchTuba = function () {
		if(BMarkerTuba){
			map.removeOverlay(BMarkerTuba);
		}
		$scope.errorInfoAlert = null;
		$scope.searchBaseStationNo = $scope.baseStationNo;
		var postData = $scope.baseStationNo.split(',');
		if(postData.length === 4){
			$scope.baseStationNoObj.mobileCountryCode = postData[0];
			$scope.baseStationNoObj.mobileNetworkCode = postData[1];
			$scope.baseStationNoObj.locationAreaCode = postData[2];
			$scope.baseStationNoObj.cellId = postData[3];
			tubaFactory.tubaData($scope.baseStationNoObj,function(data, headerFn){
				if(data){
					$scope.tubaData = data.location.lon + ',' + data.location.lat;
					var BPoint =  new BMap.Point(data.location.lon,data.location.lat);
					BMarkerTuba = new BMap.Marker(BPoint, {icon : tubaIcon});
					map.addOverlay(BMarkerTuba);
					map.centerAndZoom(BPoint,12);
				}else{
					$scope.errorInfoAlert = 'NO DATA!'
					$('#tubaErrorAlert').modal('show');
				}
			});

		}else{
			$scope.errorInfoAlert = '请输入正确的基站号！'
			$('#tubaErrorAlert').modal('show');
		}
	}

	var BMarkerLocal;
	$scope.searchLocal = function () {
		if(BMarkerLocal){
			map.removeOverlay(BMarkerLocal);
		}
		$scope.errorInfoAlert = null;
		var postData = $scope.baseStationNo.split(',');
		if(postData.length === 4){
			var baseStationNo = {};
			baseStationNo.mobileCountryCode = postData[0];
			baseStationNo.mobileNetworkCode = postData[1];
			baseStationNo.locationAreaCode = postData[2];
			baseStationNo.cellId = postData[3];
			tubaFactory.localData(baseStationNo,function(data, headerFn){
				if(data){
					$scope.localData = data.location.lon + ',' + data.location.lat;
					var BPoint =  new BMap.Point(data.location.lon,data.location.lat);
					BMarkerLocal = new BMap.Marker(BPoint, {icon : localIcon});
					map.addOverlay(BMarkerLocal);
					map.centerAndZoom(BPoint,12);
				}else{
					$scope.errorInfoAlert = 'NO DATA!'
					$('#tubaErrorAlert').modal('show');
				}

			});

		}else{
			$scope.errorInfoAlert = '请输入正确的基站号！'
			$('#tubaErrorAlert').modal('show');
		}
	}

	/**
	 *图吧覆盖本地数据
	 */
	$scope.updateTuba = function(){
		var tubaData = $scope.tubaData.split(',');
		$scope.baseStationNoObj.lon = tubaData[0];
		$scope.baseStationNoObj.lat = tubaData[1];
		tubaFactory.updateLocalLonAndLat($scope.baseStationNoObj,function(data, headerFn){
			$('#update-tuba').modal('hide');
			$scope.errorInfoAlert = '修改成功！'
			$('#tubaErrorAlert').modal('show');
		},function(error){
			$scope.errorInfoAlert = '操作失败！error:'+error;
			$('#tubaErrorAlert').modal('show');
		});
	}
	/**
	 *手动修改本地数据
	 */
	$scope.updateLocal = function(){
		var tubaData = $scope.tubaData.split(',');
		$scope.baseStationNoObj.lon = $scope.diyLon;
		$scope.baseStationNoObj.lat = $scope.diyLat;
		tubaFactory.updateLocalLonAndLat($scope.baseStationNoObj,function(data, headerFn){
			$('#modify-local').modal('hide');
			$scope.errorInfoAlert = '修改成功！'
			$('#tubaErrorAlert').modal('show');
		},function(error){
			$scope.errorInfoAlert = '操作失败！error:'+error;
			$('#tubaErrorAlert').modal('show');
		});
		$scope.diyLon = null;
		$scope.diyLat = null;
	}
}]);