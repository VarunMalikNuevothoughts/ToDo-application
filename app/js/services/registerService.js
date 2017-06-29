'use strict';

app.service('registerService',['$http',function($http){
	
	var register = function(user1){
		var data = $http.post('http://192.168.1.5:3000/api/userbases',user1);
		return data;
	};
	
	return {
		register: register
	}
}]);