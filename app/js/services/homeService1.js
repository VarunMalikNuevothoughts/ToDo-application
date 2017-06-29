'use strict';

app.service('homeService1',['$http','sessionService',function($http,sessionService){
	
	var myDateFunction = function(address){
		var data = $http.get(address);
		return data;
	};
	
	var init = function(address){
		var data = $http.get(address);
		return data;
	};
	
	var afunction = function(){
		var address = 'http://192.168.1.5:3000/api/userbases/'+sessionService.get('userid')+'?access_token='+sessionService.get('accesstoken');
		var data = $http.get(address);
		return data;
	}
	
	return {
		myDateFunction : myDateFunction,
		init : init,
		afunction : afunction
	}
}]);
