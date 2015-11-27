'use strict'

ghtApp.factory('tubaFactory',function($resource){
	return $resource('/', {}, {
		localData: {
			url: 'http://172.28.5.71:29218/LocalData',
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			}
		},
		tubaData: {
			url: 'http://172.28.5.71:29218/tubaData',
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			}
		},
		updateLocalLonAndLat: {
			url: 'http://172.28.5.71:29218/updateLocalLonAndLat',
			method: 'POST',
			header: {
				'Content-Type': 'application/json'
			}
		}
	});
});